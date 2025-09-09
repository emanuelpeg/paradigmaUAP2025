export interface IBuscable<T = any> {
  buscarPor(criterio: string): T[];
  filtrar(condicion: (item: T) => boolean): T[]; //Esto permite filtrar los resultados de búsqueda
}

export class CatalogoBiblioteca implements IBuscable<string> {
  constructor(private titulos: string[]) {}
  buscarPor(criterio: string): string[] {
    const c = criterio.toLowerCase();
    return this.titulos.filter(t => t.toLowerCase().includes(c));
  }
  filtrar(condicion: (item: string) => boolean): string[] {
    return this.titulos.filter(condicion);
  }
}

export class BibliotecaDigital implements IBuscable<string> {
  constructor(private recursos: string[]) {}
  buscarPor(criterio: string): string[] {
    const c = criterio.toLowerCase();
    return this.recursos.filter(r => r.toLowerCase().includes(c));
  }
  filtrar(condicion: (item: string) => boolean): string[] {
    return this.recursos.filter(condicion);
  }
}

export class ArchivoHistorico implements IBuscable<string> {
  constructor(private documentos: string[]) {}
  buscarPor(criterio: string): string[] {
    const c = criterio.toLowerCase();
    return this.documentos.filter(d => d.toLowerCase().includes(c));
  }
  filtrar(condicion: (item: string) => boolean): string[] {
    return this.documentos.filter(condicion);
  }
}

export class BaseConocimiento implements IBuscable<string> {
  constructor(private articulos: string[]) {}
  buscarPor(criterio: string): string[] {
    const c = criterio.toLowerCase();
    return this.articulos.filter(a => a.toLowerCase().includes(c));
  }
  filtrar(condicion: (item: string) => boolean): string[] {
    return this.articulos.filter(condicion);
  }
}
