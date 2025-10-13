import { Libro, TipoLibro } from "./Libro";

export interface IBuscable {
    buscarPorCriterio(criterio: Partial<Libro>): Libro[];

    filtrar(condicion: string): Libro[]
}