import { IBuscable } from "../interfaces/IBuscable";

export class BuscadorUniversal {
  static buscar<T>(sistema: IBuscable<T>, criterio: string): T[] {
    return sistema.buscarPor(criterio);
  }

  static filtrar<T>(sistema: IBuscable<T>, condicion: (item: T) => boolean): T[] {
    return sistema.filtrar(condicion);
  }
}