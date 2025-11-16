import { IBuscable } from "../interface/Ibuscable";

export class BibliotecaDigital implements IBuscable<string> {
  constructor(private recursos: string[] = []) {}

  buscarPor(criterio: (recurso: string) => boolean): string[] {
    return this.recursos.filter(criterio);
  }

  filtrar(condicion: (recurso: string) => boolean): string[] {
    return this.recursos.filter(condicion);
  }

  agregarRecurso(recurso: string) {
    this.recursos.push(recurso);
  }
}