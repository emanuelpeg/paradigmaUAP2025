// Tarea 4: Interfaz y polimorfismo para sistemas de búsqueda

export interface IBuscable<T> {
  buscarPor(criterio: (item: T) => boolean): T[];
  filtrar(condicion: (item: T) => boolean): T[];
}

// Implementaciones
import { Libro } from "./Libro";

export class CatalogoBiblioteca implements IBuscable<Libro> {
  constructor(private libros: Libro[]) {}
  buscarPor(criterio: (item: Libro) => boolean): Libro[] {
    return this.libros.filter(criterio);
  }
  filtrar(condicion: (item: Libro) => boolean): Libro[] {
    return this.libros.filter(condicion);
  }
}

export class BibliotecaDigital implements IBuscable<string> {
  constructor(private recursos: string[]) {}
  buscarPor(criterio: (item: string) => boolean): string[] {
    return this.recursos.filter(criterio);
  }
  filtrar(condicion: (item: string) => boolean): string[] {
    return this.recursos.filter(condicion);
  }
}

export class ArchivoHistorico implements IBuscable<string> {
  constructor(private documentos: string[]) {}
  buscarPor(criterio: (item: string) => boolean): string[] {
    return this.documentos.filter(criterio);
  }
  filtrar(condicion: (item: string) => boolean): string[] {
    return this.documentos.filter(condicion);
  }
}
