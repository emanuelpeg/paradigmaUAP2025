import { buscar, filtrarLibros } from "../helpers";
import { biblioteca } from "./Biblioteca";
import { IBuscable } from "./IBuscable";
import { Libro, TipoLibro } from "./Libro";

export class BuscadorUniversal implements IBuscable {
    constructor(private _libros: Libro[]) { }

    buscarPorCriterio(criterio: Partial<Libro>): Libro[] {
        return buscar(criterio, this._libros)

    }

    filtrar(condicion: string): Libro[] {
        return filtrarLibros(condicion, this._libros)
    }
}