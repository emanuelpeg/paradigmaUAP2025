import { IBuscable } from "./IBuscable";
import { Libro } from "../modelos/Libro";

export class CatalogoBiblioteca implements IBuscable<Libro> {
  constructor(private libros: Libro[]) {}

  buscarPor(criterio: string): Libro[] {
    return this.libros.filter(l => 
      l.titulo.includes(criterio) || l.autor.nombre.includes(criterio)
    );
  }

  filtrar(condicion: (item: Libro) => boolean): Libro[] {
    return this.libros.filter(condicion);
  }
}
