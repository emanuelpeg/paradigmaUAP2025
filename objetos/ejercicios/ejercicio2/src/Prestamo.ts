export abstract class Prestamo {
    constructor(
        protected fecha: Date,
        protected idLibro: string
    ) {}

    abstract calcularVencimiento(): Date;
    abstract calcularMulta(fechaDevolucion: Date): number;
}

export class PrestamoRegular extends Prestamo {
    calcularVencimiento(): Date {
        const fecha = new Date(this.fecha);
        fecha.setDate(fecha.getDate() + 14);
        return fecha;
    }

    calcularMulta(fechaDevolucion: Date): number {
        const diasRetraso = Math.max(
            0,
            Math.ceil((fechaDevolucion.getTime() - this.calcularVencimiento().getTime()) / (1000 * 60 * 60 * 24))
        );
        return diasRetraso * 100; // Multa estándar: $100 por día
    }
}

export class PrestamoCorto extends Prestamo {
    calcularVencimiento(): Date {
        const fecha = new Date(this.fecha);
        fecha.setDate(fecha.getDate() + 7);
        return fecha;
    }

    calcularMulta(fechaDevolucion: Date): number {
        const diasRetraso = Math.max(
            0,
            Math.ceil((fechaDevolucion.getTime() - this.calcularVencimiento().getTime()) / (1000 * 60 * 60 * 24))
        );
        return diasRetraso * 200; // Multa doble: $200 por día
    }
}

export class PrestamoReferencia extends Prestamo {
    calcularVencimiento(): Date {
        return new Date(this.fecha);
    }

    calcularMulta(fechaDevolucion: Date): number {
        return 0; // Solo consulta en biblioteca
    }
}

export class PrestamoDigital extends Prestamo {
    calcularVencimiento(): Date {
        const fecha = new Date(8640000000000000); // Fecha máxima en JavaScript
        return fecha;
    }

    calcularMulta(fechaDevolucion: Date): number {
        return 0; // Sin multa para préstamos digitales
    }
}
