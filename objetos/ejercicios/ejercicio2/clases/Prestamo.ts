import { Libro } from "./Libro";

export abstract class Prestamo {
  constructor(
    protected libro: Libro,
    protected fechaPrestamo: Date
  ) {}

  abstract calcularVencimiento(): Date | null;
  abstract calcularMulta(fechaDevolucion: Date): number;
}


export class PrestamoRegular extends Prestamo {
  calcularVencimiento(): Date {
    const vencimiento = new Date(this.fechaPrestamo);
    vencimiento.setDate(vencimiento.getDate() + 14);
    return vencimiento;
  }
  calcularMulta(fechaDevolucion: Date): number {
    const vencimiento = this.calcularVencimiento();
    const diasAtraso = Math.max(
      Math.ceil((fechaDevolucion.getTime() - vencimiento.getTime()) / (1000 * 60 * 60 * 24)),
      0
    );
    return diasAtraso * 50;
  }
}


export class PrestamoCorto extends Prestamo {
  calcularVencimiento(): Date {
    const vencimiento = new Date(this.fechaPrestamo);
    vencimiento.setDate(vencimiento.getDate() + 7);
    return vencimiento;
  }
  calcularMulta(fechaDevolucion: Date): number {
    const vencimiento = this.calcularVencimiento();
    const diasAtraso = Math.max(
      Math.ceil((fechaDevolucion.getTime() - vencimiento.getTime()) / (1000 * 60 * 60 * 24)),
      0
    );
    return diasAtraso * 100;
  }
}


export class PrestamoReferencia extends Prestamo {
  calcularVencimiento(): null {
    return null; 
  }
  calcularMulta(_fechaDevolucion: Date): number {
    return 0; 
  }
}

export class PrestamoDigital extends Prestamo {
  calcularVencimiento(): null {
    return null; 
  }
  calcularMulta(_fechaDevolucion: Date): number {
    return 0;
  }
}