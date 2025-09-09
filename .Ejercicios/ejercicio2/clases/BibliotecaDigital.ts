import { IBuscable } from "../interfaces/IBuscable";

export class BibliotecaDigital implements IBuscable<string> {
  private recursos: string[];

  constructor(recursos: string[]) {
    this.recursos = recursos;
  }

  buscarPor(criterio: string): string[] {
    return this.recursos.filter((r) => r.includes(criterio));
  }

  filtrar(condicion: (r: string) => boolean): string[] {
    return this.recursos.filter(condicion);
  }
  agregarRecurso(recurso: string): void {
    this.recursos.push(recurso);
  }
  buscar(condicion: (r: string) => boolean): string | null {
    return this.recursos.find(condicion) ?? null;
  }
}