import { IBuscable } from "../Interface/IBuscable";

export class BusquedaAcademica implements IBuscable {
    private articulos: any[] = []; // Array de BusquedaAcademica

    constructor(articulos: any[] = []) {
        this.articulos = articulos;
    }

    buscarPor(criterio: string): any[] {
        const criterioLower = criterio.toLowerCase();
        return this.articulos.filter(articulo => 
            articulo.titulo?.toLowerCase().includes(criterioLower) ||
            articulo.autor?.toLowerCase().includes(criterioLower) ||
            articulo.resumen?.toLowerCase().includes(criterioLower) ||
            articulo.palabrasClave?.some((palabra: string) => 
                palabra.toLowerCase().includes(criterioLower)
            )
        );
    }

    filtrar(condicion: (articulo: any) => boolean): any[] {
        return this.articulos.filter(condicion);
    }

    // Métodos específicos para artículos académicos
    buscarPorPalabraClave(palabra: string): any[] {
        return this.filtrar(articulo => 
            articulo.palabrasClave?.includes(palabra.toLowerCase())
        );
    }

    buscarPorDOI(doi: string): any[] {
        return this.filtrar(articulo => articulo.doi === doi);
    }
}