import { IBuscable } from "./IBuscable";
import { Libro } from "./Libro";

export class CatalogoBiblioteca implements IBuscable<Libro> {
  private libros: Libro[];

  constructor(libros: Libro[]) {
    this.libros = libros;
  }

  buscarPor(criterio: (libro: Libro) => boolean): Libro[] {
    return this.libros.filter(criterio);
  }

  filtrar(condicion: (libro: Libro) => boolean): Libro[] {
    return this.libros.filter(condicion);
  }
}