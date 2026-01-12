import { IBuscable } from "./IBuscable";

export class ArchivoHistorico implements IBuscable<string> {
  private documentos: string[];

  constructor(documentos: string[]) {
    this.documentos = documentos;
  }

  buscarPor(criterio: (doc: string) => boolean): string[] {
    return this.documentos.filter(criterio);
  }

  filtrar(condicion: (doc: string) => boolean): string[] {
    return this.documentos.filter(condicion);
  }
}