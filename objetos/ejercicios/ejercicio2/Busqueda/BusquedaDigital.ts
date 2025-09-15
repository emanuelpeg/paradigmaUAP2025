import { IBuscable } from "../Interface/IBuscable";

export class BusquedaDigital implements IBuscable {
    private recursos: any[] = []; // Podría ser array de RecursosDigitales

    constructor(recursos: any[] = []) {
        this.recursos = recursos;
    }

    buscarPor(criterio: string): any[] {
        const criterioLower = criterio.toLowerCase();
        return this.recursos.filter(recurso => 
            recurso.titulo?.toLowerCase().includes(criterioLower) ||
            recurso.autor?.toLowerCase().includes(criterioLower) ||
            recurso.url?.toLowerCase().includes(criterioLower) ||
            recurso.descripcion?.toLowerCase().includes(criterioLower)
        );
    }

    filtrar(condicion: (recurso: any) => boolean): any[] {
        return this.recursos.filter(condicion);
    }

    // Métodos específicos para recursos digitales
    buscarPorFormato(formato: string): any[] {
        return this.filtrar(recurso => recurso.formato === formato);
    }
}