// BaseConocimiento.ts
import { IBuscable } from "./IBuscable";
export interface ArticuloAcademico {
  titulo: string;
  autores: string[];
  revista: string;
  año: number;
  palabrasClave: string[];
}

export class BaseConocimiento implements IBuscable<ArticuloAcademico> {
  constructor(private articulos: ArticuloAcademico[]) {}

  buscarPor(criterio: string): ArticuloAcademico[] {
    const lower = criterio.toLowerCase();
    return this.articulos.filter(art =>
      art.titulo.toLowerCase().includes(lower) ||
      art.autores.some(a => a.toLowerCase().includes(lower)) ||
      art.palabrasClave.some(p => p.toLowerCase().includes(lower))
    );
  }

  filtrar(condicion: (art: ArticuloAcademico) => boolean): ArticuloAcademico[] {
    return this.articulos.filter(condicion);
  }
}