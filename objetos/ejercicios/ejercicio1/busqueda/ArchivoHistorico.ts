import { IBuscable } from "./IBuscable";

export class ArchivoHistorico implements IBuscable<string> {
  constructor(private documentos: string[]) {}

  buscarPor(criterio: string): string[] {
    return this.documentos.filter(d => d.includes(criterio));
  }

  filtrar(condicion: (item: string) => boolean): string[] {
    return this.documentos.filter(condicion);
  }
}
