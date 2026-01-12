import { IBuscable } from "./IBuscable";

export class BuscadorUniversal {
  constructor(private sistemas: IBuscable<any>[]) {}

  buscarGlobal(criterio: string): any[] {
    return this.sistemas.flatMap(s => s.buscarPor(criterio));
  }
}
