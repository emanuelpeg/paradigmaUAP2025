export interface IBuscable<T> {
  buscarPor(criterio: (item: T) => boolean): T[];
  filtrar(condicion: (item: T) => boolean): T[];
}