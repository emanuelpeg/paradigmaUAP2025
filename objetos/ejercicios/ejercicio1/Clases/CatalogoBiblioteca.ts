import { Libro } from "./Libro";
import { IBuscable, Criterio } from "./Busquedas";

export class CatalogoBiblioteca implements IBuscable<Libro> {
  constructor(private libros: Libro[]) {}

  buscarPor(c: Criterio): Libro[] {
    const t = c.titulo?.toLowerCase();
    const a = c.autor?.toLowerCase();
    const i = c.isbn?.toLowerCase();
    return this.libros.filter(l =>
      (t ? l.titulo.toLowerCase().includes(t) : true) &&
      (a ? l.autor.toLowerCase().includes(a) : true) &&
      (i ? l.isbn.toLowerCase().includes(i) : true)
    );
  }

  filtrar(cond: (l: Libro) => boolean): Libro[] {
    return this.libros.filter(cond);
  }
}
