import { IBuscable } from "./IBuscable";

export class BuscadorUniversal<T> {
  private sistema: IBuscable<T>;

  constructor(sistema: IBuscable<T>) {
    this.sistema = sistema;
  }

  buscar(criterio: (item: T) => boolean): T[] {
    return this.sistema.buscarPor(criterio);
  }

  filtrar(condicion: (item: T) => boolean): T[] {
    return this.sistema.filtrar(condicion);
  }
}