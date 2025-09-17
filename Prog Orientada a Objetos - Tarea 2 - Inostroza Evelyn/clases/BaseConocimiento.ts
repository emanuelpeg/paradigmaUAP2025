import { IBuscable } from "../interface/Ibuscable";

export class BaseConocimiento implements IBuscable<string> {
  constructor(private articulos: string[] = []) {}

  buscarPor(criterio: (art: string) => boolean): string[] {
    return this.articulos.filter(criterio);
  }

  filtrar(condicion: (art: string) => boolean): string[] {
    return this.articulos.filter(condicion);
  }

  agregarArticulo(articulo: string) {
    this.articulos.push(articulo);
  }
}
