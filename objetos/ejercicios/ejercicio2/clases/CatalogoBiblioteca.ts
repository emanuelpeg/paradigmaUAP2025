// CatalogoBiblioteca.ts
import { Libro } from "./Libro";
import { IBuscable } from "./IBuscable";

export class CatalogoBiblioteca implements IBuscable<Libro> {
  constructor(private libros: Libro[]) {}

  buscarPor(criterio: string): Libro[] {
    const lower = criterio.toLowerCase();
    return this.libros.filter(libro =>
      libro.titulo.toLowerCase().includes(lower) ||
      libro.autor.toLowerCase().includes(lower)
    );
  }

  filtrar(condicion: (libro: Libro) => boolean): Libro[] {
    return this.libros.filter(condicion);
  }
}