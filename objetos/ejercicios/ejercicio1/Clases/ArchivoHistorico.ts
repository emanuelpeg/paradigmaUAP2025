import { IBuscable, Criterio } from "./Busquedas";

export type DocumentoAntiguo = { titulo: string; anio: number; descripcion: string };

export class ArchivoHistorico implements IBuscable<DocumentoAntiguo> {
  constructor(private docs: DocumentoAntiguo[]) {}

  buscarPor(c: Criterio): DocumentoAntiguo[] {
    const t = c.titulo?.toLowerCase();
    return this.docs.filter(d => (t ? d.titulo.toLowerCase().includes(t) : true));
  }

  filtrar(cond: (d: DocumentoAntiguo) => boolean): DocumentoAntiguo[] {
    return this.docs.filter(cond);
  }
}
