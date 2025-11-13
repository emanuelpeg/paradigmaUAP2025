import type { IBuscable, Criterio } from "./Busquedas";

export class BuscadorUniversal {
  constructor(private sistemas: IBuscable<any>[]) {}

  agregar(s: IBuscable<any>) { this.sistemas.push(s); }

  buscarEnTodos<T = any>(criterio: Criterio): T[] {
    const res: T[] = [];
    for (const s of this.sistemas) {
      res.push(...s.buscarPor(criterio));
    }
    return res;
  }
}
