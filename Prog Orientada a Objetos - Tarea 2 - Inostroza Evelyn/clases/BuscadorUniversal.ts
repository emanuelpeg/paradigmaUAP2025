import { IBuscable } from "../interface/Ibuscable";

export class BuscadorUniversal<T> {
  private sistemas: IBuscable<T>[] = [];

  agregarSistema(sistema: IBuscable<T>) {
    this.sistemas.push(sistema);
  }

  buscarPor(criterio: any): T[] {
    return this.sistemas.flatMap(s => s.buscarPor(criterio));
  }

  filtrar(condicion: (item: T) => boolean): T[] {
    return this.sistemas.flatMap(s => s.filtrar(condicion));
  }
}
