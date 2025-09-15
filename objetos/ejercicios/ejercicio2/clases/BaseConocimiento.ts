import { IBuscable } from "./IBuscable";

export type ArticuloAcademico = { titulo: string; autor: string; revista: string };

export class BaseConocimiento implements IBuscable<ArticuloAcademico> {
    private articulos: ArticuloAcademico[];

    constructor(articulos: ArticuloAcademico[]) {
        this.articulos = articulos;
    }

    buscarPor(criterio: (art: ArticuloAcademico) => boolean): ArticuloAcademico[] {
        return this.articulos.filter(criterio);
    }

    filtrar(condicion: (art: ArticuloAcademico) => boolean): ArticuloAcademico[] {
        return this.articulos.filter(condicion);
    }
}