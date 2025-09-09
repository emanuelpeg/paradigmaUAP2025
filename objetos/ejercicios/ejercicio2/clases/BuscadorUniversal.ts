import { IBuscable } from "./IBuscable";

export class BuscadorUniversal {
    static buscar<T>(sistema: IBuscable<T>, criterio: (item: T) => boolean): T[] {
        return sistema.buscarPor(criterio);
    }
    static filtrar<T>(sistema: IBuscable<T>, condicion: (item: T) => boolean): T[] {
        return sistema.filtrar(condicion);
    }
}