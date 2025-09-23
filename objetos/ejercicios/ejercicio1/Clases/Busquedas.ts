export type Criterio = { titulo?: string; autor?: string; isbn?: string };

export interface IBuscable<T> {
  buscarPor(criterio: Criterio): T[];
  filtrar(cond: (t: T) => boolean): T[];
}
