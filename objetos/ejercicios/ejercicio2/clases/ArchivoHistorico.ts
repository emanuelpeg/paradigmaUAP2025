import { IBuscable } from "./IBuscable";

export type DocumentoHistorico = { titulo: string; fecha: string; descripcion: string };

export class ArchivoHistorico implements IBuscable<DocumentoHistorico> {
    private documentos: DocumentoHistorico[];

    constructor(documentos: DocumentoHistorico[]) {
        this.documentos = documentos;
    }

    buscarPor(criterio: (doc: DocumentoHistorico) => boolean): DocumentoHistorico[] {
        return this.documentos.filter(criterio);
    }

    filtrar(condicion: (doc: DocumentoHistorico) => boolean): DocumentoHistorico[] {
        return this.documentos.filter(condicion);
    }
}