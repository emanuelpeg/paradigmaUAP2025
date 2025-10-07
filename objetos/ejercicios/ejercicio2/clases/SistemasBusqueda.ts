// Interfaz
export interface IBuscable {
  buscarPor(criterio: string): any[];
  filtrar(condicion: (item: any) => boolean): any[];
}

// Implementaciones de la interfaz

export class CatalogoBiblioteca implements IBuscable {
  private libros = [
    { titulo: "Clean Code", autor: "Robert C. Martin" },
    { titulo: "Refactoring", autor: "Martin Fowler" }
  ];

  buscarPor(criterio: string) {
    return this.libros.filter(l => l.titulo.includes(criterio) || l.autor.includes(criterio));
  }

  filtrar(condicion: (item: any) => boolean) {
    return this.libros.filter(condicion);
  }
}

export class BibliotecaDigital implements IBuscable {
  private recursos = [
    { titulo: "Curso TypeScript", descripcion: "Manual oficial de TS" },
    { titulo: "Mongo NoSQL", descripcion: "Guía práctica de bases de datos" }
    ];

  buscarPor(criterio: string) {
    return this.recursos.filter(r => r.titulo.includes(criterio));
  }

  filtrar(condicion: (item: any) => boolean) {
    return this.recursos.filter(condicion);
  }
}

export class ArchivoHistorico implements IBuscable {
  private documentos = [
    { titulo: "Acta fundacional", anio: 1810 },
    { titulo: "Constitución 1853", anio: 1853 }
  ];

  buscarPor(criterio: string) {
    return this.documentos.filter(d => d.titulo.includes(criterio) || d.anio.toString() === criterio);
  }

  filtrar(condicion: (item: any) => boolean) {
    return this.documentos.filter(condicion);
  }
}

export class BaseConocimiento implements IBuscable {
  private articulos = [
    { titulo: "Machine Learning", revista: "AI Journal" },
    { titulo: "Redes Neuronales", revista: "DeepMind" }
  ];

  buscarPor(criterio: string) {
    return this.articulos.filter(a => a.titulo.includes(criterio) || a.revista.includes(criterio));
  }

  filtrar(condicion: (item: any) => boolean) {
    return this.articulos.filter(condicion);
  }
}
