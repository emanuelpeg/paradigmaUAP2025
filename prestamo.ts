import { Libro } from "./Libro";

export abstract class Prestamo {
    constructor(public libro: Libro, public fechaPrestamo: Date) { }

    public abstract calcularVencimiento(): Date;
    public abstract calcularMulta(): number;
    public abstract puedeLlevar(): boolean;
}

export class PrestamoRegular extends Prestamo {
    calcularVencimiento(): Date {
        const vencimiento = new Date(this.fechaPrestamo);
        vencimiento.setDate(vencimiento.getDate() + 14);
        return vencimiento;
    }

    calcularMulta(): number {
        const hoy = new Date();
        const vencimiento = this.calcularVencimiento();
        const diasVencidos = Math.floor((hoy.getTime() - vencimiento.getTime()) / (1000 * 60 * 60 * 24));
        return diasVencidos > 0 ? diasVencidos * 10 : 0; // Multa de 10 por día
    }

    puedeLlevar(): boolean {
        return true;
    }
}

export class PrestamoCorto extends Prestamo {
    calcularVencimiento(): Date {
        const vencimiento = new Date(this.fechaPrestamo);
        vencimiento.setDate(vencimiento.getDate() + 7);
        return vencimiento;
    }

    calcularMulta(): number {
        const hoy = new Date();
        const vencimiento = this.calcularVencimiento();
        const diasVencidos = Math.floor((hoy.getTime() - vencimiento.getTime()) / (1000 * 60 * 60 * 24));
        return diasVencidos > 0 ? diasVencidos * 20 : 0; // Multa doble
    }

    puedeLlevar(): boolean {
        return true;
    }
}

export class PrestamoReferencia extends Prestamo {
    calcularVencimiento(): Date {
        return this.fechaPrestamo;
    }

    calcularMulta(): number {
        return 0; // Sin multa
    }

    puedeLlevar(): boolean {
        return false; // Solo consulta en biblioteca
    }
}

export class PrestamoDigital extends Prestamo {
    calcularVencimiento(): Date {
        return new Date("9999-12-31"); // Sin límite de tiempo
    }

    calcularMulta(): number {
        return 0; // Sin multa
    }

    puedeLlevar(): boolean {
        return true;
    }
}