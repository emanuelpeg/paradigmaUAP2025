export interface IBuscable<T> {
  buscarPor(criterio: string): T[];
  filtrar(condicion: (item: T) => boolean): T[];
}