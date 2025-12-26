import { Libro } from "./Libro";
type Duracion = number; 

export abstract class Prestamo {
    constructor(public libro: Libro, public vencimiento: Date) {}

    getDuracion(): Duracion {
        const hoy = new Date();
        const diferencia = this.vencimiento.getTime() - hoy.getTime();
        return Math.ceil(diferencia / (1000 * 3600 * 24));
    }

    public abstract calcularVencimiento(duracion: Duracion): Date;

    public abstract calcularMulta(diaDevolucion: Date, multaPorDia: number): number;


    
}

export class PrestamoRegular extends Prestamo {
     private duracion: Duracion = 14;
    private multaPorDia: number = 5;

     calcularVencimiento(): Date {
        const vencimiento = new Date();
        vencimiento.setDate(vencimiento.getDate() + this.duracion);
        return vencimiento;
    }

     calcularMulta(diaDevolucion: Date): number {
        const diasAtraso = Math.ceil((diaDevolucion.getTime() - this.vencimiento.getTime()) / (1000 * 3600 * 24));
        return diasAtraso > 0 ? diasAtraso * this.multaPorDia : 0;
    }
}

export class PrestamoCorto extends Prestamo {
    private duracion: Duracion = 7; 
    private multaPorDia: number = 10;

    calcularVencimiento(): Date {
        const vencimiento = new Date();
        vencimiento.setDate(vencimiento.getDate() + this.duracion);
        return vencimiento;
    }

    calcularMulta(diaDevolucion: Date): number {
        const diasAtraso = Math.ceil((diaDevolucion.getTime() - this.vencimiento.getTime()) / (1000 * 3600 * 24));
        return diasAtraso > 0 ? diasAtraso * this.multaPorDia : 0;
    }
}

export class PrestamoReferencia extends Prestamo {
    private duracion: Duracion = 1; 
    private multaPorDia: number = 20; 

      calcularVencimiento(): Date {
        const vencimiento = new Date();
        vencimiento.setDate(vencimiento.getDate() + this.duracion);
        return vencimiento;
    }

     calcularMulta(diaDevolucion: Date): number {
        const diasAtraso = Math.ceil((diaDevolucion.getTime() - this.vencimiento.getTime()) / (1000 * 3600 * 24));
        return diasAtraso > 0 ? diasAtraso * this.multaPorDia : 0;
    }
}

export class PrestamoDigital extends Prestamo {
    private duracion: Duracion = 21; 
    private multaPorDia: number = 0; 

      calcularVencimiento(): Date {
        const vencimiento = new Date();
        vencimiento.setDate(vencimiento.getDate() + this.duracion);
        return vencimiento;
    }

     calcularMulta(diaDevolucion: Date): number {
          const diasAtraso = Math.ceil((diaDevolucion.getTime() - this.vencimiento.getTime()) / (1000 * 3600 * 24));
        return diasAtraso > 0 ? diasAtraso * this.multaPorDia : 0;
    }
}