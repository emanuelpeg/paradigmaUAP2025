// Prestamo.ts
import { Libro } from "./Libro";

// Clase base abstracta para préstamos
export abstract class Prestamo {
    constructor(
        public libro: Libro,
        public fechaInicio: Date = new Date()
    ) {}

  // Métodos abstractos que deben ser implementados por las subclases
    abstract calcularVencimiento(): Date;
    abstract calcularMulta(fechaDevolucion: Date): number;
    abstract puedeLlevarse(): boolean;

  // Método concreto que puede ser usado por todas las subclases
    estaVencido(fechaConsulta: Date = new Date()): boolean {
        return fechaConsulta > this.calcularVencimiento();
    }
}

// PrestamoRegular: 14 días, multa estándar
export class PrestamoRegular extends Prestamo {
    calcularVencimiento(): Date {
        const vencimiento = new Date(this.fechaInicio);
        vencimiento.setDate(vencimiento.getDate() + 14);
        return vencimiento;
    }

    calcularMulta(fechaDevolucion: Date): number {
        const vencimiento = this.calcularVencimiento();
        if (fechaDevolucion <= vencimiento) return 0;
        
        const diasAtraso = Math.ceil((fechaDevolucion.getTime() - vencimiento.getTime()) / (1000 * 60 * 60 * 24));
        return diasAtraso * 2; // Multa estándar de $2 por día
    }

    puedeLlevarse(): boolean {
        return true;
    }
}

// PrestamoCorto: 7 días, multa doble
export class PrestamoCorto extends Prestamo {
    calcularVencimiento(): Date {
        const vencimiento = new Date(this.fechaInicio);
        vencimiento.setDate(vencimiento.getDate() + 7);
        return vencimiento;
    }

    calcularMulta(fechaDevolucion: Date): number {
        const vencimiento = this.calcularVencimiento();
        if (fechaDevolucion <= vencimiento) return 0;
        
        const diasAtraso = Math.ceil((fechaDevolucion.getTime() - vencimiento.getTime()) / (1000 * 60 * 60 * 24));
        return diasAtraso * 4; // Multa doble de $4 por día
    }

    puedeLlevarse(): boolean {
        return true;
    }
}

// PrestamoReferencia: Solo consulta en biblioteca, sin llevar
export class PrestamoReferencia extends Prestamo {
    calcularVencimiento(): Date {
        // No hay vencimiento para préstamos de referencia
        return new Date(this.fechaInicio);
    }

    calcularMulta(fechaDevolucion: Date): number {
        // No hay multa para préstamos de referencia
        return 0;
    }

    puedeLlevarse(): boolean {
        return false; // No se puede llevar fuera de la biblioteca
    }
}

// PrestamoDigital: Sin límite de tiempo, sin multa
export class PrestamoDigital extends Prestamo {
    calcularVencimiento(): Date {
        // No hay vencimiento para préstamos digitales
        const sinVencimiento = new Date(this.fechaInicio);
        sinVencimiento.setFullYear(sinVencimiento.getFullYear() + 100); // Fecha muy futura
        return sinVencimiento;
    }

    calcularMulta(fechaDevolucion: Date): number {
        // No hay multa para préstamos digitales
        return 0;
    }

    puedeLlevarse(): boolean {
        return true;
    }
}

// Tipo para los diferentes tipos de préstamo
export type TipoPrestamo = 
    | 'regular' 
    | 'corto' 
    | 'referencia' 
    | 'digital';