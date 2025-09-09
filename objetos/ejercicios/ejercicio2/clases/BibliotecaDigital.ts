import { buscar, filtrarLibros } from "../helpers";
import { biblioteca } from "./Biblioteca";
import { IBuscable } from "./IBuscable";
import { Libro, TipoLibro } from "./Libro";

export class BibliotecaDigital implements IBuscable {
    constructor(private _libros: Libro[]) { }

    buscarPorCriterio(criterio: Partial<Libro>): Libro[] {
        return buscar(criterio, this._libros, TipoLibro.RECURSO)

    }

    filtrar(condicion: string): Libro[] {
        return filtrarLibros(condicion, this._libros, TipoLibro.RECURSO)
    }
}