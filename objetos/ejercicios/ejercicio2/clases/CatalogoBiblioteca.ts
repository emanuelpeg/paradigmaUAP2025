import { IBuscable } from "./IBuscable";
import { Libro } from "./Libro";

export class CatalogoBiblioteca implements IBuscable<Libro> {
  private libros: Libro[] = [];

  agregarLibro(libro: Libro) {
        this.libros.push(libro);



  }

  buscarPor(criterio: (item: Libro) => boolean): Libro[] {
    return this.libros.filter(criterio);

  }

  filtrar(condicion: (item: Libro) => boolean): Libro[] {
    return this.libros.filter(condicion);


  }
}