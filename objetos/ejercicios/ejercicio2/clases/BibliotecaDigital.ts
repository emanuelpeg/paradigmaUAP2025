import { IBuscable } from "./IBuscable";

export type RecursoDigital = { titulo: string; url: string; tipo: string };

export class BibliotecaDigital implements IBuscable<RecursoDigital> {
    private recursos: RecursoDigital[];

    constructor(recursos: RecursoDigital[]) {
        this.recursos = recursos;
    }

    buscarPor(criterio: (recurso: RecursoDigital) => boolean): RecursoDigital[] {
        return this.recursos.filter(criterio);
    }

    filtrar(condicion: (recurso: RecursoDigital) => boolean): RecursoDigital[] {
        return this.recursos.filter(condicion);
    }
}