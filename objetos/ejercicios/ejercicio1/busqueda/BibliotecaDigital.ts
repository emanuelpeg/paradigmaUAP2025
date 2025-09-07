import { IBuscable } from "./IBuscable";

export class BibliotecaDigital implements IBuscable<string> {
  constructor(private recursos: string[]) {}

  buscarPor(criterio: string): string[] {
    return this.recursos.filter(r => r.includes(criterio));
  }

  filtrar(condicion: (item: string) => boolean): string[] {
    return this.recursos.filter(condicion);
  }
}
