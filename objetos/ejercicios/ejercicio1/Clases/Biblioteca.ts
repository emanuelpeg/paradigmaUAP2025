// objetos/ejercicios/ejercicio1/Clases/Biblioteca.ts
import { Libro } from "./Libro";
import { Socio, type TipoSocio } from "./Socio";
import { PoliticaFlexible, type PoliticaPrestamo } from "./Politicas";

type ModoPrestamo = "regular" | "referencia";

export class Biblioteca {
  private libros = new Map<string, Libro>();
  private disponibilidad = new Map<string, boolean>();
  private socios = new Map<number, Socio>();
  private espera = new Map<string, number[]>();
  private politica: PoliticaPrestamo = new PoliticaFlexible();

  agregarLibro(titulo: string, autor: string, isbn: string, esReferencia: boolean = false): void {
    const lib = new Libro(titulo, autor, isbn, esReferencia);
    this.libros.set(isbn, lib);
    if (!this.disponibilidad.has(isbn)) this.disponibilidad.set(isbn, true);
    if (!this.espera.has(isbn)) this.espera.set(isbn, []);
  }

  registrarSocio(tipo: TipoSocio, id: number, nombre: string, apellido: string): Socio {
    const s = new Socio(id, nombre, apellido, tipo);
    this.socios.set(id, s);
    return s;
  }

  setPolitica(p: PoliticaPrestamo): void {
    this.politica = p;
  }

  prestarLibro(socioId: number, isbn: string, modo: ModoPrestamo): string {
    const socio = this.socios.get(socioId);
    const libro = this.libros.get(isbn);
    if (!socio) return `Error: socio ${socioId} inexistente`;
    if (!libro) return `Error: libro ${isbn} inexistente`;

    if (libro.esReferencia || modo === "referencia") {
      if (!this.politica.permiteReferencia(socio.tipo)) {
        return `Rechazado: solo empleados pueden llevar material de referencia`;
      }
      const disp = this.disponibilidad.get(isbn) ?? true;
      if (!disp) return `No disponible (referencia)`;
      this.disponibilidad.set(isbn, false);
      return `Prestado (referencia) a ${socio.nombre}`;
    }

    const disp = this.disponibilidad.get(isbn) ?? true;
    if (disp) {
      this.disponibilidad.set(isbn, false);
      return `Prestado a ${socio.nombre}`;
    } else {
      const cola = this.espera.get(isbn)!;
      if (!cola.includes(socioId)) cola.push(socioId);
      return `En espera (#${cola.length}) para ${socio.nombre}`;
    }
  }

  devolverLibro(_socioId: number, isbn: string): string {
    const libro = this.libros.get(isbn);
    if (!libro) return `Error: libro ${isbn} inexistente`;

    const cola = this.espera.get(isbn) ?? [];
    if (cola.length > 0) {
      const siguienteId = cola.shift()!;
      const siguiente = this.socios.get(siguienteId);
      this.espera.set(isbn, cola);
      this.disponibilidad.set(isbn, false);
      return `Devuelto y asignado a ${siguiente?.nombre ?? "siguiente en cola"}`;
    } else {
      this.disponibilidad.set(isbn, true);
      return `Devuelto y disponible`;
    }
  }

  buscarEnSistemas(criteria: { titulo?: string; autor?: string; isbn?: string }): Libro[] {
    const t = criteria.titulo?.toLowerCase();
    const a = criteria.autor?.toLowerCase();
    const i = criteria.isbn?.toLowerCase();
    const res: Libro[] = [];
    for (const libro of this.libros.values()) {
      const okT = t ? libro.titulo.toLowerCase().includes(t) : true;
      const okA = a ? libro.autor.toLowerCase().includes(a) : true;
      const okI = i ? libro.isbn.toLowerCase().includes(i) : true;
      if (okT && okA && okI) res.push(libro);
    }
    return res;
  }

  listarLibros(): Libro[] {
    return [...this.libros.values()];
  }

  disponible(isbn: string): boolean {
    return this.disponibilidad.get(isbn) ?? true;
  }
}

export const biblioteca = new Biblioteca();
export type { TipoSocio, Libro, Socio };
