
export interface IBuscable {
    buscarPor(criterio: string): any[];
    filtrar(condicion: (item: any) => boolean): any[];
}