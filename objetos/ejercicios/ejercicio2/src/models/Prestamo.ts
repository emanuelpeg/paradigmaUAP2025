abstract class Prestamo {
    constructor(
        protected fechaPrestamo: Date = new Date(),
        protected usuario: string,
        protected libro: string
    ) {}

    abstract calcularVencimiento(): Date;
    abstract calcularMulta(fechaDevolucion: Date): number;

    getUsuarioId(): string {
        return this.usuario;
    }

    getLibroId(): string {
        return this.libro;
    }
}

class PrestamoRegular extends Prestamo {
    calcularVencimiento(): Date {
        const fecha = new Date(this.fechaPrestamo);
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

class PrestamoCorto extends Prestamo {
    calcularVencimiento(): Date {
        const fecha = new Date(this.fechaPrestamo);
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

class PrestamoReferencia extends Prestamo {
    calcularVencimiento(): Date {
        return this.fechaPrestamo; // Mismo día
    }

    calcularMulta(fechaDevolucion: Date): number {
        return 0; // No hay multa, solo consulta en biblioteca
    }
}

class PrestamoDigital extends Prestamo {
    calcularVencimiento(): Date {
        const fecha = new Date(8640000000000000); // Fecha máxima en JavaScript
        return fecha;
    }

    calcularMulta(fechaDevolucion: Date): number {
        return 0; // Sin multa
    }
}

export { Prestamo, PrestamoRegular, PrestamoCorto, PrestamoReferencia, PrestamoDigital };
