import { Libro } from "./Libro";
import { Autor } from "./Autor";
import { EventoBiblioteca } from "./EventoBiblioteca";
import { Socio, SocioRegular, SocioVIP, Empleado, Visitante } from "./Socio";
import { Prestamo, crearPrestamo, TipoPrestamo } from "./Prestamo";
import { PoliticaPrestamo, PoliticaEstricta } from "./Politicas";
import { BuscadorUniversal, CatalogoBiblioteca, BibliotecaDigital, ArchivoHistorico, BaseConocimiento } from "./Busquedas";

export class Biblioteca {
  private inventario: Libro[] = [];
  private socios: Map<number, Socio> = new Map();
  private autores: Autor[] = [];
  private reservas: Map<string, Socio[]> = new Map(); // ISBN -> cola
  private politica: PoliticaPrestamo = new PoliticaEstricta();
  private buscador: BuscadorUniversal = new BuscadorUniversal([]);

  setPolitica(p: PoliticaPrestamo) { this.politica = p; }
  getPolitica() { return this.politica; }

  // Libros / Autores
  agregarLibro(titulo: string, autorNombre: string, isbn: string, esReferencia = false): Libro {
    const autor = this.ensureAutor(autorNombre);
    const libro = new Libro(titulo, autor, isbn, esReferencia);
    this.inventario.push(libro);
    // refrescar fuentes del buscador
    this.buscador = new BuscadorUniversal([
      new CatalogoBiblioteca(this.inventario),
      new BibliotecaDigital(this.inventario),
      new ArchivoHistorico(this.inventario),
      new BaseConocimiento(this.inventario)
    ]);
    return libro;
  }
  private ensureAutor(nombre: string): Autor {
    const ex = this.autores.find(a => a.nombre.toLowerCase() === nombre.toLowerCase());
    if (ex) return ex;
    const nuevo = new Autor(nombre); this.autores.push(nuevo); return nuevo;
  }
  buscarLibro(isbn: string) { return this.inventario.find(l => l.isbn === isbn); }
  buscarLibrosPorAutorNombre(nombre: string) {
    return this.inventario.filter(l => l.autor.nombre.toLowerCase() === nombre.toLowerCase());
  }

  // Socios
  registrarSocio(tipo: "regular"|"vip"|"empleado"|"visitante", id: number, nombre: string, apellido: string): Socio {
    if (this.socios.has(id)) return this.socios.get(id)!;
    let socio: Socio;
    switch (tipo) {
      case "vip": socio = new SocioVIP(id, nombre, apellido); break;
      case "empleado": socio = new Empleado(id, nombre, apellido); break;
      case "visitante": socio = new Visitante(id, nombre, apellido); break;
      default: socio = new SocioRegular(id, nombre, apellido);
    }
    this.socios.set(id, socio);
    return socio;
  }
  buscarSocio(id: number) { return this.socios.get(id); }

  // Buscador universal
  buscarEnSistemas(criterio: Partial<{ titulo: string; autor: string; isbn: string }>) {
    return this.buscador.buscar(criterio);
  }

  // ---- Préstamos polimórficos ----
  prestarLibro(socioId: number, isbn: string, tipo: TipoPrestamo = "regular", fecha: Date = new Date()) {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(isbn);
    if (!socio || !libro) throw new Error("Socio o libro no encontrado.");

    if (socio instanceof Visitante) throw new Error("El visitante no puede pedir prestado.");
    if (!socio.puedeTomarOtro()) throw new Error("Cupo de préstamos alcanzado.");
    if (libro.esReferencia && !(socio instanceof Empleado)) tipo = "referencia";

    const veredicto = this.politica.puedePrestar(socio);
    if (!veredicto.permitido) throw new Error(`Préstamo denegado por política: ${veredicto.motivo}`);

    const prestado = Array.from(this.socios.values())
      .some(s => s.prestamos.some(p => p.libro.isbn === isbn));
    if (prestado && tipo !== "referencia") {
      this.reservarLibro(socio, isbn);
      return { reservado: true as const };
    }

    const p: Prestamo = crearPrestamo(tipo, libro, fecha);

    // ajuste según política (si aplica) para préstamos con vencimiento
    const v = p.calcularVencimiento();
    if (v && veredicto.diasExtra) {
      v.setDate(v.getDate() + veredicto.diasExtra);
      const base = (tipo === "corto") ? 7 : 14;
      const nuevoInicio = new Date(v); nuevoInicio.setDate(nuevoInicio.getDate() - base);
      (p as any).fechaInicio = nuevoInicio;
    }

    socio.agregarPrestamo(p);
    EventoBiblioteca.notificarPrestamo(socio.nombreCompleto, libro.titulo, v ?? new Date());
    return { reservado: false as const, vencimiento: v ?? null, tipo };
  }

  devolverLibro(socioId: number, isbn: string, fecha: Date = new Date()) {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(isbn);
    if (!socio || !libro) throw new Error("Socio o libro no encontrado.");

    const multa = socio.registrarDevolucion(isbn, fecha);
    EventoBiblioteca.notificarDevolucion(socio.nombreCompleto, libro.titulo, multa);

    const cola = this.reservas.get(isbn) ?? [];
    if (cola.length > 0) {
      const sig = cola.shift()!;
      this.reservas.set(isbn, cola);
      this.prestarLibro(sig.id, isbn, libro.esReferencia ? "referencia" : "regular", fecha);
      EventoBiblioteca.notificarReserva(sig.nombreCompleto, libro.titulo);
    }
  }

  private reservarLibro(socio: Socio, isbn: string) {
    const cola = this.reservas.get(isbn) ?? [];
    if (!cola.some(s => s.id === socio.id)) { cola.push(socio); this.reservas.set(isbn, cola); }
  }

  recomendarLibros(socioId: number): Libro[] {
    const socio = this.buscarSocio(socioId); if (!socio) return [];
    const autoresLeidos = new Set(socio.historialLectura.map(l => l.autor.nombre.toLowerCase()));
    const yaLeidos = new Set(socio.historialLectura.map(l => l.isbn));
    const prestados = new Set(
      Array.from(this.socios.values()).flatMap(s => s.prestamos.map(p => p.libro.isbn))
    );
    const cand = this.inventario.filter(l =>
      autoresLeidos.has(l.autor.nombre.toLowerCase()) && !yaLeidos.has(l.isbn) && !prestados.has(l.isbn)
    );
    return cand.length ? cand : this.inventario.filter(l => !yaLeidos.has(l.isbn) && !prestados.has(l.isbn));
  }
}

export const biblioteca = new Biblioteca();
export default biblioteca;
