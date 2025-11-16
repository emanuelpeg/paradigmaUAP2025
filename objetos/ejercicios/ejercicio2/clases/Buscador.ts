interface IBuscable {
  buscarPor(criterio: string): any[];
  filtrar(condicion: (item: any) => boolean): any[];
}

class CatalogoBiblioteca implements IBuscable {
  private libros: string[] = ["Don Quijote", "Cien años de soledad"];

  buscarPor(criterio: string): any[] {
    return this.libros.filter(libro => libro.includes(criterio));
  }

  filtrar(condicion: (item: any) => boolean): any[] {
    return this.libros.filter(condicion);
  }
}

class BibliotecaDigital implements IBuscable {
  private recursos: string[] = ["Ebook1", "Ebook2"];

  buscarPor(criterio: string): any[] {
    return this.recursos.filter(r => r.includes(criterio));
  }

  filtrar(condicion: (item: any) => boolean): any[] {
    return this.recursos.filter(condicion);
  }
}

class ArchivoHistorico implements IBuscable {
  private documentos: string[] = ["Acta 1800", "Carta San Martín"];

  buscarPor(criterio: string): any[] {
    return this.documentos.filter(d => d.includes(criterio));
  }

  filtrar(condicion: (item: any) => boolean): any[] {
    return this.documentos.filter(condicion);
  }
}

class BaseConocimiento implements IBuscable {
  private articulos: string[] = ["Paper IA", "Paper Matemáticas"];

  buscarPor(criterio: string): any[] {
    return this.articulos.filter(a => a.includes(criterio));
  }

  filtrar(condicion: (item: any) => boolean): any[] {
    return this.articulos.filter(condicion);
  }
}

class BuscadorUniversal {
  private sistemas: IBuscable[];

  constructor(...sistemas: IBuscable[]) {
    this.sistemas = sistemas;
  }

  buscarEnTodos(criterio: string): any[] {
    return this.sistemas.flatMap(s => s.buscarPor(criterio));
  }
}

export { IBuscable, CatalogoBiblioteca, BibliotecaDigital, ArchivoHistorico, BaseConocimiento, BuscadorUniversal };

