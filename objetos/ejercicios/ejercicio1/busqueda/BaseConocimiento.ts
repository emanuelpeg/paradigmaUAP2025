import { IBuscable } from "./IBuscable";

export class BaseConocimiento implements IBuscable<string> {
  constructor(private articulos: string[]) {}

  buscarPor(criterio: string): string[] {
    return this.articulos.filter(a => a.includes(criterio));
  }

  filtrar(condicion: (item: string) => boolean): string[] {
    return this.articulos.filter(condicion);
  }
}
