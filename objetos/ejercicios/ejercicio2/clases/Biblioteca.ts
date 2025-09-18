import { Libro } from "./Libro";
import { Socio, SocioFactory, TipoSocio } from "./Socio";
import { PoliticaPrestamo, PoliticaEstricta } from "./PoliticaPrestamo";

class Biblioteca {
  private inventario: Libro[] = [];
  private socios: Socio[] = [];
  private politicaPrestamo: PoliticaPrestamo = new PoliticaEstricta();

  setPoliticaPrestamo(politica: PoliticaPrestamo) {
    this.politicaPrestamo = politica;
  }

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

  retirarLibro(socioId: number, libroISBN: string): void {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);

    if (!socio || !libro) {
      throw new Error("No se encontro");
    }
    for (const socio of this.socios) {
      if (socio.tienePrestadoLibro(libro)) {
        throw new Error("Libro no esta disponible");
      }
    }
    // Aplica la política de préstamo
    if (!this.politicaPrestamo.puedePrestar(socio, libro)) {
      throw new Error("No cumple la política de préstamo");
    }
    const duracion = this.politicaPrestamo.calcularDuracionPrestamo(socio);
    socio.retirar(libro, duracion);
  }

  devolverLibro(socioId: number, libroISBN: string) {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);

    if (!socio || !libro) {
      throw new Error("No se encontro");
    }

    socio.devolver(libro);
  }
}

export const biblioteca = new Biblioteca();
export type { Biblioteca };
