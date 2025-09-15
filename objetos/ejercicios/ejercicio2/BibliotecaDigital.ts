import { IBuscable } from "./IBuscable";

export class BibliotecaDigital implements IBuscable<string> {
  private recursos: string[];

  constructor(recursos: string[]) {
    this.recursos = recursos;
  }

  buscarPor(criterio: (recurso: string) => boolean): string[] {
    return this.recursos.filter(criterio);
  }

  filtrar(condicion: (recurso: string) => boolean): string[] {
    return this.recursos.filter(condicion);
  }
}