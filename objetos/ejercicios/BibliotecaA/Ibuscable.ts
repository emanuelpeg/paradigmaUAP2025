import { Libro } from "./LibroA";

export interface IBuscable<T> {
  buscarPor(criterio: (item: T) => boolean): T[];
  filtrar(condicion: (item: T) => boolean): T[];
}

export class CatalogoBiblioteca implements IBuscable<Libro> {
  constructor(private libros: Libro[]) {}
  buscarPor(criterio: (libro: Libro) => boolean): Libro[] {
    return this.libros.filter(criterio);
  }
  filtrar(condicion: (libro: Libro) => boolean): Libro[] {
    return this.libros.filter(condicion);
  }
}

export class BibliotecaDigital implements IBuscable<Libro> {
  constructor(private recursos: Libro[]) {}
  buscarPor(criterio: (libro: Libro) => boolean): Libro[] {
    return this.recursos.filter(criterio);
  }
  filtrar(condicion: (libro: Libro) => boolean): Libro[] {
    return this.recursos.filter(condicion);
  }
}

export class ArchivoHistorico implements IBuscable<Libro> {
  constructor(private documentos: Libro[]) {}
  buscarPor(criterio: (libro: Libro) => boolean): Libro[] {
    return this.documentos.filter(criterio);
  }
  filtrar(condicion: (libro: Libro) => boolean): Libro[] {
    return this.documentos.filter(condicion);
  }
}

export class BaseConocimiento implements IBuscable<Libro> {
  constructor(private articulos: Libro[]) {}
  buscarPor(criterio: (libro: Libro) => boolean): Libro[] {
    return this.articulos.filter(criterio);
  }
  filtrar(condicion: (libro: Libro) => boolean): Libro[] {
    return this.articulos.filter(condicion);
  }
}

export class BuscadorUniversal {
  constructor(private sistemas: IBuscable<Libro>[]) {}
  buscar(criterio: (libro: Libro) => boolean): Libro[] {
    return this.sistemas.flatMap(s => s.buscarPor(criterio));
  }
}