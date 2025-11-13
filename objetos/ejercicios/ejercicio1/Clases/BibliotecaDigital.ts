import { IBuscable, Criterio } from "./Busquedas";

export type RecursoDigital = { titulo: string; url: string; autor?: string };

export class BibliotecaDigital implements IBuscable<RecursoDigital> {
  constructor(private recursos: RecursoDigital[]) {}

  buscarPor(c: Criterio): RecursoDigital[] {
    const t = c.titulo?.toLowerCase();
    const a = c.autor?.toLowerCase();
    return this.recursos.filter(r =>
      (t ? r.titulo.toLowerCase().includes(t) : true) &&
      (a ? (r.autor ?? "").toLowerCase().includes(a) : true)
    );
  }

  filtrar(cond: (r: RecursoDigital) => boolean): RecursoDigital[] {
    return this.recursos.filter(cond);
  }
}
