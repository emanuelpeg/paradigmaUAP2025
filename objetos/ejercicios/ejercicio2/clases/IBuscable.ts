export interface IBuscable {
  buscarPor(criterio: string): string[];
  filtrarPor(condicion: (item: string) => boolean): string[];
}

export class CatalogoBiblioteca implements IBuscable {
  private libros: string[] = [];

  constructor(){
    this.libros = [
      "El quijote", 
      "Cien años de soledad", 
      "1984", 
      "La Odisea", 
      "Harry Popotter"];
  }

  buscarPor(criterio: string): string[] {
    return this.libros.filter(libro => libro.toLowerCase().includes(criterio.toLowerCase()));
  }
  filtrarPor(condicion: (item: string) => boolean): string[] {
    return this.libros.filter(condicion);
  }
}

export class BibliotecaDigital implements IBuscable {
  private recursos: string[] = [];

  constructor(){
    this.recursos = ["El quijote.epub", 
      "Cien años de soledad.pdf", 
      "1984.mobi", 
      "La Odisea.pdf", 
      "Harry Popotter.pdf"];
  }
  buscarPor(criterio: string): string[] {
    return this.recursos.filter(recurso => recurso.toLowerCase().includes(criterio.toLowerCase()));
  }
  filtrarPor(condicion: (item: string) => boolean): string[] {
    return this.recursos.filter(condicion);
  }
}

export class ArchivoHistorico implements IBuscable {
  private documentos: string[];

  constructor() {
    this.documentos = [
      "Acta de la Independencia",
      "Tratado de Versalles",
      "Constitución de 1853",
    ];
  }
  buscarPor(criterio: string): string[] {
    return this.documentos.filter(doc => doc.toLowerCase().includes(criterio.toLowerCase()));
  }
  filtrarPor(condicion: (item: string) => boolean): string[] {
    return this.documentos.filter(condicion);
  }
}

export class BaseConocimiento implements IBuscable {
  private articulos: string[] = [];

  constructor() {
    this.articulos = [
      "Inteligencia Artificial en Medicina",
      "Sistemas Distribuidos",
      "Seguridad Informática",
    ];
  }

  buscarPor(criterio: string): string[] {
    return this.articulos.filter(articulo => articulo.toLowerCase().includes(criterio.toLowerCase()));
  }
  filtrarPor(condicion: (item: string) => boolean): string[] {
    return this.articulos.filter(condicion);
  }
}

export class BuscadorUniversal {
  private sistemas: IBuscable[] = [];

  constructor() {
    this.sistemas = [];
  }

  agregarSistema(sistema: IBuscable): void {
    this.sistemas.push(sistema);
  }
  buscarGlobal(criterio: string): string[] {
    let resultados: string[] = [];
    for (const sistema of this.sistemas) {
      resultados = resultados.concat(sistema.buscarPor(criterio));
    }
    return resultados;
  }
}