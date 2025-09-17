export interface IBuscable<T> {
  buscarPor(criterio: any): T[];
  filtrar(condicion: (item: T) => boolean): T[];
}
