import { Libro } from "./Libro";
import { Socio } from "./Socio";

export class Biblioteca {
  private inventario: Libro[] = [];
  private socios: Socio[] = [];
  private DURACION = 0;

  agregarLibro(titulo: string, autor: string, isbn: string) {
    const libroCreado = new Libro(titulo, autor, isbn);
    this.inventario.push(libroCreado);
    return libroCreado;
  }

  buscarLibro(isbn: string): Libro | null {
    // return this.inventario.find(libro => libro.isbn === isb);
    const libroEncontrado = this.inventario.find(libro => libro.isbn === isbn);
    if (libroEncontrado) {
      return libroEncontrado;
    }
    return null;
  }


  registrarSocio(id: number, nombre: string, apellido: string) {
    const socioCreado = new Socio(id, nombre, apellido);
    this.socios.push(socioCreado);
    return socioCreado;
  }

  buscarSocio(id: number): Socio | null {
    return this.socios.find(socio => socio.id === id) ?? null
  }

  retirarLibro(socioId: number, libroISBN: string): void {

    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN)

    if (!socio || !libro) {
      throw new Error("No se encontró")
    }//fijarse si esta disponible
    for (const socio of this.socios) {
      if (socio.tienesPrestadoLibro(libro)) {
        throw new Error("Libro no está disponible");
      }


      //terminar
    }


  }
}

export const biblioteca = new Biblioteca();
// export type biblioteca2 = new Biblioteca();