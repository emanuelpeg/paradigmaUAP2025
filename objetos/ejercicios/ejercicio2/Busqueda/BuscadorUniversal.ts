import { IBuscable } from "../Interface/IBuscable";
import { BusquedaAcademica } from "./BusquedaAcademica";
import { BusquedaDigital } from "./BusquedaDigital";
import { BusquedaHistorica } from "./BusquedaHistorica";
import { Biblioteca } from "../clases/Biblioteca";
import { Libro } from "../clases/Libro";

export class BuscadorUniversal {
    private sistemasBusqueda: IBuscable[] = [];

    constructor(sistemas: IBuscable[] = []) {
        this.sistemasBusqueda = sistemas;
    }


    quitarSistema(sistema: IBuscable): void {
        const index = this.sistemasBusqueda.indexOf(sistema);
        if (index > -1) {
            this.sistemasBusqueda.splice(index, 1);
        }
    }

    buscarEnTodos(criterio: string): any[] {
        const resultados: any[] = [];
        
        this.sistemasBusqueda.forEach(sistema => {
            const resultadosSistema = sistema.buscarPor(criterio);
            resultados.push(...resultadosSistema);
        });

        return resultados;
    }

    filtrarEnTodos(condicion: (item: any) => boolean): any[] {
        const resultados: any[] = [];
        
        this.sistemasBusqueda.forEach(sistema => {
            const resultadosSistema = sistema.filtrar(condicion);
            resultados.push(...resultadosSistema);
        });

        return resultados;
    }

    
    // Método para obtener estadísticas de búsqueda
    obtenerEstadisticas(): { [key: string]: number } {
        const stats: { [key: string]: number } = {};
        
        this.sistemasBusqueda.forEach(sistema => {
            const nombreSistema = sistema.constructor.name;
            const cantidadItems = sistema.filtrar(() => true).length;
            stats[nombreSistema] = cantidadItems;
        });

        return stats;
    }
}