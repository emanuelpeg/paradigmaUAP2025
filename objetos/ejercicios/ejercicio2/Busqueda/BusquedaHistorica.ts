import { IBuscable } from "../Interface/IBuscable";

export class BusquedaHistorica implements IBuscable {
    private documentos: any[] = []; // Array de BusquedaHistorica disponibles

    constructor(documentos: any[] = []) {
        this.documentos = documentos;
    }

    buscarPor(criterio: string): any[] {
        const criterioLower = criterio.toLowerCase();
        return this.documentos.filter(documento => 
            documento.titulo?.toLowerCase().includes(criterioLower) ||
            documento.autor?.toLowerCase().includes(criterioLower) ||
            documento.fecha?.includes(criterio) ||
            documento.epoca?.toLowerCase().includes(criterioLower)
        );
    }

    filtrar(condicion: (documento: any) => boolean): any[] {
        return this.documentos.filter(condicion);
    }

    // Métodos específicos para archivos históricos
    buscarPorEpoca(epoca: string): any[] {
        return this.filtrar(documento => documento.epoca === epoca);
    }

    buscarPorRangoFechas(anioInicio: number, anioFin: number): any[] {
        return this.filtrar(documento => {
            const anioDocumento = documento.anio;
            return anioDocumento >= anioInicio && anioDocumento <= anioFin;
        });
    }
}