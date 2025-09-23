import { Libro } from "./Libro";
import {
  Socio, TipoSocio, SocioRegular, SocioVIP, Empleado, Visitante
} from "./Socio";
import {
  Prestamo, PrestamoRegular, PrestamoCorto, PrestamoReferencia, PrestamoDigital
} from "./Prestamo";
import {
  PoliticaPrestamo, PoliticaFlexible
} from "./Politicas";
import { CatalogoBiblioteca } from "./CatalogoBiblioteca";
import { BibliotecaDigital, type RecursoDigital } from "./BibliotecaDigital";
import { ArchivoHistorico, type DocumentoAntiguo } from "./ArchivoHistorico";
import { BaseConocimiento, type Articulo } from "./BaseConocimiento";
import { BuscadorUniversal } from "./BuscadorUniversal";

type ModoPrestamo = "regular" | "corto" | "referencia" | "digital";

export class Biblioteca {
  private libros = new Map<string, Libro>();                    // isbn -> Libro
  private disponibles = new Map<string, boolean>();             // isbn -> disponible?
  private socios = new Map<number, Socio>();                    // id -> Socio
  private prestamos = new Map<string, Prestamo>();              // isbn -> Prestamo activo
  private espera = new Map<string, number[]>();                 // isbn -> cola
  private politica: PoliticaPrestamo = new PoliticaFlexible();

  // Sistemas de búsqueda
  private catalogo = new CatalogoBiblioteca([]);
  private digital = new BibliotecaDigital([]);
  private archivo = new ArchivoHistorico([]);
  private baseConocimiento = new BaseConocimiento([]);
  private buscador = new BuscadorUniversal([
    this.catalogo, this.digital, this.archivo, this.baseConocimiento
  ]);

  // ======== API ========

  setPolitica(p: PoliticaPrestamo) { this.politica = p; }

  agregarLibro(titulo: string, autor: string, isbn: string, esReferencia = false) {
    const libro = new Libro(titulo, autor, isbn, esReferencia);
    this.libros.set(isbn, libro);
    this.disponibles.set(isbn, true);
    this.espera.set(isbn, []);
    // catalogable
    (this.catalogo as any).constructor === CatalogoBiblioteca && (this.catalogo as CatalogoBiblioteca);
    (this.catalogo as any).libros
      ? (this.catalogo as any).libros.push(libro)
      : Object.assign(this.catalogo, new CatalogoBiblioteca([libro]));
  }

  registrarSocio(tipo: TipoSocio, id: number, nombre: string, apellido: string): Socio {
    let s: Socio;
    switch (tipo) {
      case "regular": s = new SocioRegular(id, nombre, apellido); break;
      case "vip": s = new SocioVIP(id, nombre, apellido); break;
      case "empleado": s = new Empleado(id, nombre, apellido); break;
      case "visitante": s = new Visitante(id, nombre, apellido); break;
      default: s = new SocioRegular(id, nombre, apellido);
    }
    this.socios.set(id, s);
    return s;
  }

  /** ¿el socio tiene al menos un préstamo vencido? */
  private tieneVencidos(socio: Socio): boolean {
    for (const p of this.prestamos.values()) {
      if (p.socio.id === socio.id && p.estaVencido()) return true;
    }
    return false;
  }

  prestarLibro(socioId: number, isbn: string, modo: ModoPrestamo): string {
    const socio = this.socios.get(socioId);
    const libro = this.libros.get(isbn);
    if (!socio) return `Error: socio ${socioId} inexistente`;
    if (!libro) return `Error: libro ${isbn} inexistente`;
    if (!socio.puedePedir()) return `El tipo ${socio.tipo} no puede pedir prestado`;

    // referencia solo para empleados
    if ((libro.esReferencia || modo === "referencia") && !socio.puedeReferencia()) {
      return `Rechazado: solo empleados pueden llevar referencia`;
    }

    // política + límites
    const vencidos = this.tieneVencidos(socio);
    if (!this.politica.puedePrestar(socio, vencidos)) {
      return `Rechazado por política de préstamo`;
    }

    const disp = this.disponibles.get(isbn) ?? true;
    const limite = socio.limite();
    if (!disp) {
      const cola = this.espera.get(isbn)!;
      if (!cola.includes(socioId)) cola.push(socioId);
      return `En espera (#${cola.length})`;
    }
    if (limite !== "ilimitado" && socio.prestamosActivos >= limite) {
      return `Límite alcanzado (${limite})`;
    }

    // instanciar préstamo polimórfico
    const prestamo = this.crearPrestamo(modo, socio, libro, socio.diasPrestamo());
    this.prestamos.set(isbn, prestamo);
    this.disponibles.set(isbn, false);
    socio.prestamosActivos++;
    return `Prestado (${modo}) a ${socio.nombre}, vence ${prestamo.vencimiento.toDateString()}`;
  }

  private crearPrestamo(modo: ModoPrestamo, socio: Socio, libro: Libro, baseDias: number): Prestamo {
    // ajustar días por política
    const dias = this.politica.ajustarDiasBase(baseDias);

    switch (modo) {
      case "corto": return new PrestamoCorto(socio, libro);
      case "referencia": return new PrestamoReferencia(socio, libro);
      case "digital": return new PrestamoDigital(socio, libro);
      case "regular":
      default:
        // “simular” días distintos: desplazamos fecha en el objeto (opcional)
        const p = new PrestamoRegular(socio, libro);
        // no cambiamos el tipo, solo dejamos el default de la subclase
        return p;
    }
  }

  devolverLibro(socioId: number, isbn: string): string {
    const socio = this.socios.get(socioId);
    const p = this.prestamos.get(isbn);
    if (!socio) return `Error: socio ${socioId} inexistente`;
    if (!p) { this.disponibles.set(isbn, true); return `No había préstamo activo`; }

    // calcular multa (si corresponde y si el socio paga multa)
    const multa = p.socio.pagaMulta() ? p.calcularMulta() : 0;

    // liberar
    this.prestamos.delete(isbn);
    this.disponibles.set(isbn, true);
    p.socio.prestamosActivos = Math.max(0, p.socio.prestamosActivos - 1);

    // asignar a siguiente en cola
    const cola = this.espera.get(isbn) ?? [];
    if (cola.length > 0) {
      const nextId = cola.shift()!;
      this.espera.set(isbn, cola);
      return `Devuelto. Multa: $${multa}. Siguiente: ${this.socios.get(nextId)?.nombre ?? nextId}`;
    }
    return `Devuelto. Multa: $${multa}. Ahora disponible`;
  }

  // ===== Buscadores internos (componen el BuscadorUniversal) =====
  agregarRecursoDigital(r: RecursoDigital) { (this.digital as any).recursos?.push?.(r); }
  agregarDocumentoAntiguo(d: DocumentoAntiguo) { (this.archivo as any).docs?.push?.(d); }
  agregarArticulo(a: Articulo) { (this.baseConocimiento as any).articulos?.push?.(a); }

  buscarEnSistemas(criterio: { titulo?: string; autor?: string; isbn?: string }): any[] {
    return this.buscador.buscarEnTodos(criterio);
  }

  listarLibros(): Libro[] { return [...this.libros.values()]; }
  disponible(isbn: string): boolean { return this.disponibles.get(isbn) ?? true; }
}

export const biblioteca = new Biblioteca();
export type { TipoSocio, Socio, Libro };
