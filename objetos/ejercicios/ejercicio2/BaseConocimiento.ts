import { IBuscable } from "./IBuscable";

export class BaseConocimiento implements IBuscable<string> {
  private articulos: string[] = [];

  constructor(articulos: string[] = []) {
    this.articulos = articulos;
  }

  agregarArticulo(art: string) {
    this.articulos.push(art);
  }

  buscarPor(criterio: (art: string) => boolean): string[] {
    return this.articulos.filter(criterio);
  }

  filtrar(condicion: (art: string) => boolean): string[] {
    return this.articulos.filter(condicion);
  }
}
