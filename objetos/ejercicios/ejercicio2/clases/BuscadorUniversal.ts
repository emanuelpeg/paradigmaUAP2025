import { IBuscable } from "./IBuscable";

export class BuscadorUniversal {
    private sistemas: IBuscable<any>[];

    constructor(sistemas: IBuscable<any>[]) {
        this.sistemas = sistemas;
    }

    buscarEnTodos(criterio: (item: any) => boolean): any[] {
        let resultados: any[] = [];
        for (const sistema of this.sistemas) {
            resultados = resultados.concat(sistema.buscarPor(criterio));
        }
        return resultados;
    }

    filtrarEnTodos(condicion: (item: any) => boolean): any[] {
        let resultados: any[] = [];
        for (const sistema of this.sistemas) {
            resultados = resultados.concat(sistema.filtrar(condicion));
        }
        return resultados;
    }
}