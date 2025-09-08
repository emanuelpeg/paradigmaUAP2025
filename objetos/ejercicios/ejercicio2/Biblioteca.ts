import { Libro } from "./Libro";
import { Socio, SocioFactory, TipoSocio } from "./Socio";

class Biblioteca {
  private inventario: Libro[] = [];
  private socios: Socio[] = [];

  // Funciones de libros
  agregarLibro(titulo: string, autor: string, isbn: string): Libro {
    const libroCreado = new Libro(titulo, autor, isbn);
    this.inventario.push(libroCreado);
    return libroCreado;
  }

  buscarLibro(isbn: string): Libro | null {
    // return this.inventario.find(libro => libro.isbn === isbn) ?? null;
    const libroEncontrado = this.inventario.find(
      (libro) => libro.isbn === isbn
    );
    if (libroEncontrado) {
      return libroEncontrado;
    }
    return null;
  }

  // Funciones de socios
  registrarSocio(tipo: TipoSocio, id: number, nombre: string, apellido: string): Socio {
    const socioCreado = SocioFactory.crearSocio(tipo, id, nombre, apellido);
    this.socios.push(socioCreado);
    return socioCreado;
  }

  buscarSocio(id: number): Socio | null {
    return this.socios.find((socio) => socio.id === id) ?? null;
  }

  /**
   * Retira un libro para un socio, permitiendo especificar el tipo de préstamo.
   * @param socioId ID del socio
   * @param libroISBN ISBN del libro
   * @param tipoPrestamo Tipo de préstamo: "regular", "corto", "referencia", "digital"
   */
  retirarLibro(socioId: number, libroISBN: string, tipoPrestamo?: "regular" | "corto" | "referencia" | "digital"): void {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);
    if (!socio || !libro) {
      throw new Error("No se encontro");
    }
    // fijarse si esta disponible
    for (const s of this.socios) {
      if (s.tienePrestadoLibro(libro)) {
        throw new Error("Libro no esta disponible");
      }
    }
    socio.retirar(libro, tipoPrestamo);
  }

  /**
   * Devuelve un libro y retorna la multa calculada (si corresponde).
   * @param socioId ID del socio
   * @param libroISBN ISBN del libro
   * @param fechaDevolucion Fecha de devolución (opcional, por defecto hoy)
   * @returns Multa calculada
   */
  devolverLibro(socioId: number, libroISBN: string, fechaDevolucion?: Date) {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);
    if (!socio || !libro) {
      throw new Error("No se encontro");
    }
    const { multa } = socio.devolver(libro, fechaDevolucion);
    return multa;
  }
}

export const biblioteca = new Biblioteca();
export type { Biblioteca };