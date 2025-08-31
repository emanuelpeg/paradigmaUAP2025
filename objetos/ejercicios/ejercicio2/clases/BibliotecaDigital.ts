// BibliotecaDigital.ts
import { IBuscable } from "./IBuscable";
export interface RecursoDigital {
  titulo: string;
  autor: string;
  formato: string;
  url: string;
}

export class BibliotecaDigital implements IBuscable<RecursoDigital> {
  constructor(private recursos: RecursoDigital[]) {}

  buscarPor(criterio: string): RecursoDigital[] {
    const lower = criterio.toLowerCase();
    return this.recursos.filter(recurso =>
      recurso.titulo.toLowerCase().includes(lower) ||
      recurso.autor.toLowerCase().includes(lower)
    );
  }
//arreglado
  filtrar(condicion: (recurso: RecursoDigital) => boolean): RecursoDigital[] {
    return this.recursos.filter(condicion);
  }
}