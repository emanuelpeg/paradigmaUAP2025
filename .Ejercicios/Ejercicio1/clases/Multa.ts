export class Multa {
    private static DiaMulta: number = 50; // Monto fijo por día de retraso
    constructor(
        private id: number,
        private descripcion: string,
        private monto: number){}

    get getDescripcion(): string { return this.descripcion; }
    get getMonto(): number { return this.monto; }

    set setDescripcion(descripcion: string) { this.descripcion = descripcion; }
    set setMonto(monto: number) { this.monto = monto; }
    static calcularMulta(diasRetraso: number): number {
        return diasRetraso * Multa.DiaMulta;
    }
}