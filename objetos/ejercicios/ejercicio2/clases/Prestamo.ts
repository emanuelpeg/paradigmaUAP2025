import { Libro } from "./Libro";

export abstract class Prestamo {
  constructor(protected libro: Libro) {}
  // estos son los metodos abstractos para que las demas clsases los implementen como quieran
  abstract calcularVencimiento(): Date;
  abstract calcularMulta(diasDeRetraso: number): number;
  
  getLibro(): Libro {
    return this.libro;
  }
}
export class PrestamoRegular extends Prestamo {
    private duracion: number = 14; // dias

    calcularVencimiento(): Date {
        const fecha = new Date();
        fecha.setDate(fecha.getDate() + this.duracion);
        return fecha;
    }
    calcularMulta(diasDeRetraso: number): number {
        return diasDeRetraso * 50; 
    }
}
export class PrestamoCorto extends Prestamo {
    private duracion: number = 7; // dias

    calcularVencimiento(): Date {
        const fecha = new Date();
        fecha.setDate(fecha.getDate() + this.duracion);
        return fecha;
    }
    calcularMulta(diasDeRetraso: number): number {
        return diasDeRetraso * 100; 
    }
}
export class PrestamoReferencia extends Prestamo{
    calcularVencimiento(): Date {
        const fecha = new Date();
        fecha.setHours(18, 0, 0, 0); //como no tiene vencimiento vamos a suponer que vence a las 18 del mismo dia
        return fecha;
    }
    calcularMulta(diasDeRetraso: number): number {
        return 0; // si no lleva libro no tiene multa
    }
}
export class PrestamoDigital extends Prestamo {
    calcularVencimiento(): Date {
        const fecha = new Date();
        fecha.setDate(fecha.getDate() + 100);//100 dias pq no ponerle una fecha limite puede ser riesgoso
        return fecha;
    }
    calcularMulta(diasDeRetraso: number): number {
        return 0; // no tiene multa
    }
}
export enum TipoPrestamo {
    REGULAR = "regular",
    CORTO = "corto",
    REFERENCIA = "referencia",
    DIGITAL = "digital"
}