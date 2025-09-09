import { IBuscable } from "./IBuscable";
import { Libro } from "./Libro";

export class CatalogoBiblioteca implements IBuscable<Libro> {
    constructor(private libros: Libro[]) {}

    buscarPor(criterio: (libro: Libro) => boolean): Libro[] {
        return this.libros.filter(criterio);
    }

    filtrar(condicion: (libro: Libro) => boolean): Libro[] {
        return this.libros.filter(condicion);
    }
}

// BibliotecaDigital.ts
export class BibliotecaDigital implements IBuscable<string> {
    constructor(private recursos: string[]) {}
    buscarPor(criterio: (r: string) => boolean): string[] { return this.recursos.filter(criterio); }
    filtrar(condicion: (r: string) => boolean): string[] { return this.recursos.filter(condicion); }
}

// ArchivoHistorico.ts
export class ArchivoHistorico implements IBuscable<string> {
    constructor(private documentos: string[]) {}
    buscarPor(criterio: (d: string) => boolean): string[] { return this.documentos.filter(criterio); }
    filtrar(condicion: (d: string) => boolean): string[] { return this.documentos.filter(condicion); }
}

// BaseConocimiento.ts
export class BaseConocimiento implements IBuscable<string> {
    constructor(private articulos: string[]) {}
    buscarPor(criterio: (a: string) => boolean): string[] { return this.articulos.filter(criterio); }
    filtrar(condicion: (a: string) => boolean): string[] { return this.articulos.filter(condicion); }
}