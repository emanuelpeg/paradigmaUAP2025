import { IBuscable, Criterio } from "./Busquedas";

export type Articulo = { titulo: string; area: string; autores: string[] };

export class BaseConocimiento implements IBuscable<Articulo> {
  constructor(private articulos: Articulo[]) {}

  buscarPor(c: Criterio): Articulo[] {
    const t = c.titulo?.toLowerCase();
    const a = c.autor?.toLowerCase();
    return this.articulos.filter(x =>
      (t ? x.titulo.toLowerCase().includes(t) : true) &&
      (a ? x.autores.some(y => y.toLowerCase().includes(a)) : true)
    );
  }

  filtrar(cond: (a: Articulo) => boolean): Articulo[] {
    return this.articulos.filter(cond);
  }
}
