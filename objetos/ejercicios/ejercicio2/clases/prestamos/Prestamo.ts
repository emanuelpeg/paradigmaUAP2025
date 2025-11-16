import { Libro } from "../Libro";

export abstract class Prestamo {
    constructor(private _libro: Libro, private _fechaPresta: Date) {}

    abstract calcularVencimiento();

    abstract calcularMulta();


    extenderFechaPresta(fecha: Date) { this._fechaPresta = fecha };

    
    get fechaPresta() { return this._fechaPresta };
    get libro() { return this._libro };
}

export class PrestamoRegular extends Prestamo {
    private duracion = 14;

    calcularVencimiento(): Date {
        const fecha = new Date(this.fechaPresta);
        fecha.setDate(fecha.getDate() + this.duracion);
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
    private duracion = 7;

    calcularVencimiento() {
        const fecha = new Date(this.fechaPresta);
        fecha.setDate(fecha.getDate() + this.duracion);
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
    static crearPrestamo(tipo: TipoPrestamo, libro: Libro, fecha: Date): Prestamo {
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