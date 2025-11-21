// BuscadorUniversal.ts
import { IBuscable } from "./IBuscable";

export class BuscadorUniversal {
  static buscarEn<T>(sistema: IBuscable<T>, criterio: string): T[] {
    return sistema.buscarPor(criterio);
  }

  static filtrarEn<T>(sistema: IBuscable<T>, condicion: (item: T) => boolean): T[] {
    return sistema.filtrar(condicion);
  }
}