// ---------------------------
// Interfaz de búsqueda
// ---------------------------
export interface IBuscable<T> {
  buscarPor(criterio: string): T[];
  filtrar(condicion: (item: T) => boolean): T[];
}

// ---------------------------
// Implementaciones concretas
// ---------------------------
import { Libro } from "./Libro";

export class CatalogoBiblioteca implements IBuscable<Libro> {
  constructor(private libros: Libro[]) {}

  buscarPor(criterio: string): Libro[] {
    return this.libros.filter(
      (libro) =>
        libro.titulo.toLowerCase().includes(criterio.toLowerCase()) ||
        libro.autor.toLowerCase().includes(criterio.toLowerCase()) ||
        libro.isbn.includes(criterio)
    );
  }

  filtrar(condicion: (item: Libro) => boolean): Libro[] {
    return this.libros.filter(condicion);
  }
}

// Simulación de recursos digitales
export class BibliotecaDigital implements IBuscable<string> {
  constructor(private recursos: string[]) {}

  buscarPor(criterio: string): string[] {
    return this.recursos.filter((r) =>
      r.toLowerCase().includes(criterio.toLowerCase())
    );
  }

  filtrar(condicion: (item: string) => boolean): string[] {
    return this.recursos.filter(condicion);
  }
}

// Simulación de documentos históricos
export class ArchivoHistorico implements IBuscable<string> {
  constructor(private documentos: string[]) {}

  buscarPor(criterio: string): string[] {
    return this.documentos.filter((doc) =>
      doc.toLowerCase().includes(criterio.toLowerCase())
    );
  }

  filtrar(condicion: (item: string) => boolean): string[] {
    return this.documentos.filter(condicion);
  }
}

// Simulación de artículos académicos
export class BaseConocimiento implements IBuscable<string> {
  constructor(private articulos: string[]) {}

  buscarPor(criterio: string): string[] {
    return this.articulos.filter((art) =>
      art.toLowerCase().includes(criterio.toLowerCase())
    );
  }

  filtrar(condicion: (item: string) => boolean): string[] {
    return this.articulos.filter(condicion);
  }
}

// ---------------------------
// Buscador Universal
// ---------------------------
export class BuscadorUniversal {
  constructor(private sistemas: IBuscable<any>[]) {}

  buscarPor(criterio: string): any[] {
    return this.sistemas.flatMap((s) => s.buscarPor(criterio));
  }

  filtrar(condicion: (item: any) => boolean): any[] {
    return this.sistemas.flatMap((s) => s.filtrar(condicion));
  }
}
