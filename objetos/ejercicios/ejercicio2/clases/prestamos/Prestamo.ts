import { Libro } from "../Libro";

export abstract class Prestamo {
    constructor(public _libro: Libro, public _fechaPresta: Date) { }

    abstract calcularVencimiento();

    abstract calcularMulta();

}

export class PrestamoRegular extends Prestamo {
    calcularVencimiento(): Date {
        const fecha = new Date(this._fechaPresta);
        fecha.setDate(fecha.getDate() + 14);
        return fecha;
    }

    calcularMulta(): number {
        const fechaVencimiento: Date = this.calcularVencimiento();
        const ahora = new Date();

        if (ahora > fechaVencimiento) {
            const diffDays = Math.ceil((ahora.getTime() - fechaVencimiento.getTime()) / (1000 * 60 * 60 * 24));
            return diffDays * 50; // 50 -> cantidad de multa
        }
        return 0;
    }
}

export class PrestamoCorto extends Prestamo {
    calcularVencimiento() {
        const fecha = new Date(this._fechaPresta);
        fecha.setDate(fecha.getDate() + 7);
        return fecha;
    }

    calcularMulta() {
        const fechaVencimiento: Date = this.calcularVencimiento();
        const ahora = new Date();

        if (ahora > fechaVencimiento) {
            const diffDays = Math.ceil((ahora.getTime() - fechaVencimiento.getTime()) / (1000 * 60 * 60 * 24));
            return diffDays * 50 * 2; // 50 -> cantidad de multa
        }
        return 0;
    }
}

export class PrestamoReferencia extends Prestamo {
    calcularVencimiento() {
        return null;
    }

    calcularMulta() {
        return 0;
    }
}

export class PrestamoDigital extends Prestamo {
    calcularVencimiento() {
        return null;
    }

    calcularMulta() {
        return 0;
    }
}

export enum TipoPrestamo {
    REGULAR = "regular",
    CORTO = "corto",
    REFERENCIA = "referencia",
    DIGITAL = "digital",
}

export class PrestamoFactory {
    static crearPrestamo(tipo: TipoPrestamo, libro: Libro, fecha: Date) {
        switch (tipo) {
            case TipoPrestamo.REGULAR:
                return new PrestamoRegular(libro, fecha);
            case TipoPrestamo.CORTO:
                return new PrestamoCorto(libro, fecha);
            case TipoPrestamo.REFERENCIA:
                return new PrestamoReferencia(libro, fecha);
            case TipoPrestamo.DIGITAL:
                return new PrestamoDigital(libro, fecha);
            default:
                throw new Error("No hay tip de prestamo");
        }
    }
}