import { Libro } from "./Libro";

export interface IBuscable<T> {
  buscarPor(criterio: Partial<{ titulo: string; autor: string; isbn: string }>): T[];
  filtrar(condicion: (item: T) => boolean): T[];
}

export class CatalogoBiblioteca implements IBuscable<Libro> {
  constructor(private data: Libro[]) {}
  buscarPor(c: Partial<{ titulo: string; autor: string; isbn: string }>): Libro[] {
    return this.data.filter(l =>
      (c.titulo ? l.titulo.toLowerCase().includes(c.titulo.toLowerCase()) : true) &&
      (c.autor  ? l.autor.nombre.toLowerCase().includes(c.autor.toLowerCase())   : true) &&
      (c.isbn   ? l.isbn === c.isbn : true)
    );
  }
  filtrar(fn: (l: Libro)=>boolean) { return this.data.filter(fn); }
}
export class BibliotecaDigital implements IBuscable<Libro> {
  constructor(private data: Libro[]) {}
  buscarPor(c: Partial<{ titulo: string; autor: string; isbn: string }>) { return new CatalogoBiblioteca(this.data).buscarPor(c); }
  filtrar(fn: (l: Libro)=>boolean) { return this.data.filter(fn); }
}
export class ArchivoHistorico implements IBuscable<Libro> {
  constructor(private data: Libro[]) {}
  buscarPor(c: Partial<{ titulo: string; autor: string; isbn: string }>) { return new CatalogoBiblioteca(this.data).buscarPor(c); }
  filtrar(fn: (l: Libro)=>boolean) { return this.data.filter(fn); }
}
export class BaseConocimiento implements IBuscable<Libro> {
  constructor(private data: Libro[]) {}
  buscarPor(c: Partial<{ titulo: string; autor: string; isbn: string }>) { return new CatalogoBiblioteca(this.data).buscarPor(c); }
  filtrar(fn: (l: Libro)=>boolean) { return this.data.filter(fn); }
}

export class BuscadorUniversal {
  constructor(private fuentes: IBuscable<any>[]) {}
  agregarFuente(f: IBuscable<any>) { this.fuentes.push(f); }
  buscar(criterio: any): any[] { return this.fuentes.flatMap(f => f.buscarPor(criterio)); }
  filtrar(condicion: (x:any)=>boolean): any[] { return this.fuentes.flatMap(f => f.filtrar(condicion)); }
}
