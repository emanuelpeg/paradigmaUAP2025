import { IBuscable } from "../interfaces/IBuscable";
import { Libro } from "./Libro";

export class CatalogoBiblioteca implements IBuscable<Libro> {
  private libros: Libro[];

  constructor(libros: Libro[]) {
    this.libros = libros;
  }

  buscarPor(criterio: string): Libro[] {
    return this.libros.filter(
      (libro) =>
        libro.titulo.includes(criterio) ||
        libro.autor.includes(criterio)
    );
  }

  filtrar(condicion: (libro: Libro) => boolean): Libro[] {
    return this.libros.filter(condicion);
  }
    agregar(libro: Libro): void {
    this.libros.push(libro);
  }
    buscar(condicion: (isbn: string) => boolean): Libro | null {
    return this.libros.find((libro) => condicion(libro.isbn)) ?? null;
  }
}
