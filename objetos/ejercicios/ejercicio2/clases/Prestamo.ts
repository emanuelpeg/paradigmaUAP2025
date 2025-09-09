import { Libro } from "./Libro";

// Clase base abstracta
export abstract class Prestamo {
    constructor(public libro: Libro, public fechaInicio: Date = new Date()) {}

    abstract calcularVencimiento(): Date | null;
    abstract calcularMulta(fechaDevolucion: Date): number;
}

// Préstamo regular: 14 días, multa estándar
export class PrestamoRegular extends Prestamo {
    calcularVencimiento(): Date {
        const vencimiento = new Date(this.fechaInicio);
        vencimiento.setDate(vencimiento.getDate() + 14);
        return vencimiento;
    }
    calcularMulta(fechaDevolucion: Date): number {
        const vencimiento = this.calcularVencimiento();
        const diasRetraso = Math.max(0, Math.ceil((fechaDevolucion.getTime() - vencimiento.getTime()) / (1000 * 60 * 60 * 24)));
        return diasRetraso * 50; // Multa estándar: $50 por día
    }
}

// Préstamo corto: 7 días, multa doble
export class PrestamoCorto extends Prestamo {
    calcularVencimiento(): Date {
        const vencimiento = new Date(this.fechaInicio);
        vencimiento.setDate(vencimiento.getDate() + 7);
        return vencimiento;
    }
    calcularMulta(fechaDevolucion: Date): number {
        const vencimiento = this.calcularVencimiento();
        const diasRetraso = Math.max(0, Math.ceil((fechaDevolucion.getTime() - vencimiento.getTime()) / (1000 * 60 * 60 * 24)));
        return diasRetraso * 100; // Multa doble: $100 por día
    }
}

// Préstamo de referencia: solo consulta en biblioteca, sin llevar
export class PrestamoReferencia extends Prestamo {
    calcularVencimiento(): null {
        return null; // No hay vencimiento
    }
    calcularMulta(_fechaDevolucion: Date): number {
        return 0; // Sin multa
    }
}

// Préstamo digital: sin límite de tiempo, sin multa
export class PrestamoDigital extends Prestamo {
    calcularVencimiento(): null {
        return null; // Sin vencimiento
    }
    calcularMulta(_fechaDevolucion: Date): number {
        return 0; // Sin multa
    }
}
// Clase de fábrica para crear préstamos
export class PrestamoFactory {
    static selectTipo (tipo: string): string {
        switch (tipo) {
            case "regular":
                return "regular";
            case "corto":
                return "corto";
            case "referencia":
                return "referencia";
            case "digital":
                return "digital";
            default:
                throw new Error("Tipo de préstamo no válido");
        }
    }
    static crearPrestamo(tipo: string, libro: Libro): Prestamo {
        switch (tipo) {
            case "regular":
                return new PrestamoRegular(libro);
            case "corto":
                return new PrestamoCorto(libro);
            case "referencia":
                return new PrestamoReferencia(libro);
            case "digital":
                return new PrestamoDigital(libro);
            default:
                throw new Error("Tipo de préstamo no válido");
        }
    }
}