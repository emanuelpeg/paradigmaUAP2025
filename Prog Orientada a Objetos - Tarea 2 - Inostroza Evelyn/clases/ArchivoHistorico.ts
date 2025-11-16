import { IBuscable } from "../interface/Ibuscable";

export class ArchivoHistorico implements IBuscable<string> {
  constructor(private documentos: string[] = []) {}

  buscarPor(criterio: (doc: string) => boolean): string[] {
    return this.documentos.filter(criterio);
  }

  filtrar(condicion: (doc: string) => boolean): string[] {
    return this.documentos.filter(condicion);
  }

  agregarDocumento(doc: string) {
    this.documentos.push(doc);
  }
}