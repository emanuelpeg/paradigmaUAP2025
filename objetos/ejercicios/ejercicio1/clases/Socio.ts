import { Libro } from "./Libro";

export class Socio {
    private prestamos: Map<Libro, Date> = new Map();
    private historial: Libro[] = [];
    private deuda: number = 0;

    constructor(
        public id: number,
        public nombre: string
    ) {}

    puedePedirPrestamo(): boolean {
        return this.deuda == 0;
    }

    tomarPrestado(libro: Libro, fechaPrestamo: Date): void {
        this.prestamos.set(libro, fechaPrestamo);
        this.historial.push(libro);
    }

    devolverLibro(libro: Libro, fechaDevolucion: Date, multaPorDia: number): number {
        const fechaPrestamo = this.prestamos.get(libro);
        if (!fechaPrestamo) return 0;

        const diasPrestamo = Math.floor((fechaDevolucion.getTime() - fechaPrestamo.getTime()) / (1000 * 60 * 60 * 24));
        const diasPermitidos = 7; // 7 dias de prestamo
        let multa = 0;

        if (diasPrestamo > diasPermitidos) {
            multa = (diasPrestamo - diasPermitidos) * multaPorDia;
            this.deuda += multa;
        }

        this.prestamos.delete(libro);
        return multa;
    }

    pagarDeuda(monto: number): void {
        this.deuda = Math.max(0, this.deuda - monto);
    }

    getHistorial(): Libro[] {
        return [...this.historial];
    }

    getDeuda(): number {
        return this.deuda;
    }
}