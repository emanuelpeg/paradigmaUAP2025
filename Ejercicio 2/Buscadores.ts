
import { Libro } from "./Libro";

export interface IBuscable<T> {
  buscarPor(criterio: Partial<Record<keyof T, unknown>>): T[];
  filtrar(condicion: (item: T) => boolean): T[];
}

export type RecursoDigital = { id: string; titulo: string; autor: string; url: string; palabrasClave: string[] };
export type DocumentoHistorico = { id: string; titulo: string; anio: number; descripcion: string };
export type ArticuloAcademico = { id: string; titulo: string; autores: string[]; revista: string; anio: number };

export class CatalogoBiblioteca implements IBuscable<Libro> {
  constructor(private readonly libros: Libro[]) {}
  buscarPor(criterio: Partial<Record<keyof Libro, unknown>>): Libro[] {
    return this.libros.filter(l => Object.entries(criterio).every(([k, v]) => (l as any)[k] === v));
  }
  filtrar(condicion: (item: Libro) => boolean): Libro[] {
    return this.libros.filter(condicion);
  }
}

export class BibliotecaDigital implements IBuscable<RecursoDigital> {
  constructor(private readonly recursos: RecursoDigital[]) {}
  buscarPor(criterio: Partial<Record<keyof RecursoDigital, unknown>>): RecursoDigital[] {
    return this.recursos.filter(r => Object.entries(criterio).every(([k, v]) => (r as any)[k] === v));
  }
  filtrar(condicion: (item: RecursoDigital) => boolean): RecursoDigital[] {
    return this.recursos.filter(condicion);
  }
}

export class ArchivoHistorico implements IBuscable<DocumentoHistorico> {
  constructor(private readonly docs: DocumentoHistorico[]) {}
  buscarPor(criterio: Partial<Record<keyof DocumentoHistorico, unknown>>): DocumentoHistorico[] {
    return this.docs.filter(d => Object.entries(criterio).every(([k, v]) => (d as any)[k] === v));
  }
  filtrar(condicion: (item: DocumentoHistorico) => boolean): DocumentoHistorico[] {
    return this.docs.filter(condicion);
  }
}

export class BaseConocimiento implements IBuscable<ArticuloAcademico> {
  constructor(private readonly articulos: ArticuloAcademico[]) {}
  buscarPor(criterio: Partial<Record<keyof ArticuloAcademico, unknown>>): ArticuloAcademico[] {
    return this.articulos.filter(a => Object.entries(criterio).every(([k, v]) => (a as any)[k] === v));
  }
  filtrar(condicion: (item: ArticuloAcademico) => boolean): ArticuloAcademico[] {
    return this.articulos.filter(condicion);
  }
}

export class BuscadorUniversal {
  constructor(private fuentes: Array<IBuscable<any>>) {}
  agregarFuente(f: IBuscable<any>) { this.fuentes.push(f); }
  buscarPor(criterio: Record<string, unknown>): unknown[] {
    return this.fuentes.flatMap(f => f.buscarPor(criterio as any));
  }
  filtrar(cond: (item: unknown) => boolean): unknown[] {
    return this.fuentes.flatMap(f => f.filtrar(cond as any));
  }
}
