import { IBuscable } from "../interfaces/IBuscable";

export class Documento {
  constructor(
    public titulo: string,
    public fecha: number, // año, por ejemplo 1920
    public descripcion: string
  ) {}
}


export class ArchivoHistorico implements IBuscable<Documento> {
  private documentos: Documento[];

  constructor(documentos: Documento[]) {
    this.documentos = documentos;
  }

  buscarPor(criterio: string): Documento[] {
    return this.documentos.filter(
      (doc) =>
        doc.titulo.includes(criterio) ||
        doc.descripcion.includes(criterio)
    );
  }

  filtrar(condicion: (doc: Documento) => boolean): Documento[] {
    return this.documentos.filter(condicion);
  }
  agregarDocumento(doc: Documento): void {
    this.documentos.push(doc);
  }
}
