import { IBuscable } from "../interface/Ibuscable";
import { Libro } from "./Libro";

export class CatalogoBiblioteca implements IBuscable<Libro> {
  constructor(private libros: Libro[] = []) {}

  buscarPor(criterio: (libro: Libro) => boolean): Libro[] {
    return this.libros.filter(criterio);
  }

  filtrar(condicion: (libro: Libro) => boolean): Libro[] {
    return this.libros.filter(condicion);
  }

  agregarLibro(libro: Libro) {
    this.libros.push(libro);
  }
}