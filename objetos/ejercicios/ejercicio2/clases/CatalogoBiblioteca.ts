import { Libro } from "./Libro";
import { IBuscable } from "./IBuscable";

export class CatalogoBiblioteca implements IBuscable<Libro> {
  constructor(private libros: Libro[]) {}

  buscarPor(criterio: (libro: Libro) => boolean): Libro[] {
    return this.libros.filter(criterio);
  }

  filtrar(condicion: (libro: Libro) => boolean): Libro[] {
    return this.libros.filter(condicion);
  }
}