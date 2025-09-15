// Definimos la interfaz IBuscable
export interface IBuscable {
  buscarPor(criterio: string): string[];
  filtrar(condicion: (item: string) => boolean): string[];
}

// Clase 1: Catálogo de Biblioteca (libros físicos)
export class CatalogoBiblioteca implements IBuscable {
  private libros: string[];

  constructor(libros: string[]) {
    this.libros = libros;
  }

  buscarPor(criterio: string): string[] {
    return this.libros.filter(libro => libro.toLowerCase().includes(criterio.toLowerCase()));
  }

  filtrar(condicion: (item: string) => boolean): string[] {
    return this.libros.filter(condicion);
  }
}

// Clase 2: Biblioteca Digital (recursos online)
export class BibliotecaDigital implements IBuscable {
  private recursos: string[];

  constructor(recursos: string[]) {
    this.recursos = recursos;
  }

  buscarPor(criterio: string): string[] {
    return this.recursos.filter(r => r.toLowerCase().includes(criterio.toLowerCase()));
  }

  filtrar(condicion: (item: string) => boolean): string[] {
    return this.recursos.filter(condicion);
  }
}

// Clase 3: Archivo Histórico (documentos antiguos)
export class ArchivoHistorico implements IBuscable {
  private documentos: string[];

  constructor(documentos: string[]) {
    this.documentos = documentos;
  }

  buscarPor(criterio: string): string[] {
    return this.documentos.filter(d => d.toLowerCase().includes(criterio.toLowerCase()));
  }

  filtrar(condicion: (item: string) => boolean): string[] {
    return this.documentos.filter(condicion);
  }
}

// Clase 4: Base de Conocimiento (artículos académicos)
export class BaseConocimiento implements IBuscable {
  private articulos: string[];

  constructor(articulos: string[]) {
    this.articulos = articulos;
  }

  buscarPor(criterio: string): string[] {
    return this.articulos.filter(a => a.toLowerCase().includes(criterio.toLowerCase()));
  }

  filtrar(condicion: (item: string) => boolean): string[] {
    return this.articulos.filter(condicion);
  }
}
