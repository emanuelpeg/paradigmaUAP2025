import { IBuscable } from "../interfaces/IBuscable";

export class Articulo {
  constructor(
    public titulo: string,
    public autor: string,
    public texto: string
  ) {}
}


export class BaseConocimiento implements IBuscable<Articulo> {
  private articulos: Articulo[];

  constructor(articulos: Articulo[]) {
    this.articulos = articulos;
  }

  buscarPor(criterio: string): Articulo[] {
    return this.articulos.filter(
      (art) =>
        art.titulo.includes(criterio) ||
        art.autor.includes(criterio)
    );
  }

  filtrar(condicion: (art: Articulo) => boolean): Articulo[] {
    return this.articulos.filter(condicion);
  }
  agregarArticulo(articulo: Articulo): void {
    this.articulos.push(articulo);
  }
}
