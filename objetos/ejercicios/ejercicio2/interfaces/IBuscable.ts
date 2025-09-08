
export interface IBuscable<T> {
  buscarPor(criterio: (item: T) => boolean): T[];
  filtrar(condicion: (item: T) => boolean): T[];
}

export class CatalogoBiblioteca<T> implements IBuscable<T> {
  private items: T[] = [];

  buscarPor(criterio: (item: T) => boolean): T[] {
    return this.items.filter(criterio);
  }
  filtrar(condicion: (item: T) => boolean): T[] {
    return this.items.filter(condicion);
  }
}

export class BibliotecaDigital<T> extends CatalogoBiblioteca<T> {}
export class ArchivoHistorico<T> extends CatalogoBiblioteca<T> {}
export class BaseConocimiento<T> extends CatalogoBiblioteca<T> {}

export class BuscadorUniversal<T> {
  private sistema: IBuscable<T>;
  constructor(sistema: IBuscable<T>) {
    this.sistema = sistema;
  }
  setSistema(sistema: IBuscable<T>) {
    this.sistema = sistema;
  }
  buscarPor(criterio: (item: T) => boolean): T[] {
    return this.sistema.buscarPor(criterio);
  }
  filtrar(condicion: (item: T) => boolean): T[] {
    return this.sistema.filtrar(condicion);
  }
}