import { Libro } from "./Libro";

export abstract class Transaccion {
    constructor(public libro: Libro, public fechaInicio: Date) { }

    public abstract calcularFechaDevolucion(): Date;
    public abstract calcularMontoRetraso(): number;
    public abstract esPrestable(): boolean;
}

export class TransaccionEstandar extends Transaccion {
    calcularFechaDevolucion(): Date {
        const fechaDevolucion = new Date(this.fechaInicio);
        fechaDevolucion.setDate(fechaDevolucion.getDate() + 14);
        return fechaDevolucion;
    }

    calcularMontoRetraso(): number {
        const hoy = new Date();
        const fechaLimite = this.calcularFechaDevolucion();
        const diasExcedidos = Math.floor((hoy.getTime() - fechaLimite.getTime()) / (1000 * 60 * 60 * 24));
        return diasExcedidos > 0 ? diasExcedidos * 10 : 0;
    }

    esPrestable(): boolean {
        return true;
    }
}

export class TransaccionCorta extends Transaccion {
    calcularFechaDevolucion(): Date {
        const fechaDevolucion = new Date(this.fechaInicio);
        fechaDevolucion.setDate(fechaDevolucion.getDate() + 7);
        return fechaDevolucion;
    }

    calcularMontoRetraso(): number {
        const hoy = new Date();
        const fechaLimite = this.calcularFechaDevolucion();
        const diasExcedidos = Math.floor((hoy.getTime() - fechaLimite.getTime()) / (1000 * 60 * 60 * 24));
        return diasExcedidos > 0 ? diasExcedidos * 20 : 0;
    }

    esPrestable(): boolean {
        return true;
    }
}

export class TransaccionConsulta extends Transaccion {
    calcularFechaDevolucion(): Date {
        return this.fechaInicio;
    }

    calcularMontoRetraso(): number {
        return 0;
    }

    esPrestable(): boolean {
        return false;
    }
}

export class TransaccionDigital extends Transaccion {
    calcularFechaDevolucion(): Date {
        return new Date("9999-12-31");
    }

    calcularMontoRetraso(): number {
        return 0;
    }

    esPrestable(): boolean {
        return true;
    }
}