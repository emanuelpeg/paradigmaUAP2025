import { Libro } from "./Libro";

// Clase base abstracta
export abstract class Prestamo {
  constructor(public libro: Libro, public fechaInicio: Date = new Date()) {}

  abstract calcularVencimiento(): Date | null;
  abstract calcularMulta(fechaDevolucion: Date): number;
}

// Préstamo regular: 14 días, multa estándar ($10 por día de atraso)
export class PrestamoRegular extends Prestamo {
  calcularVencimiento(): Date {
    const vencimiento = new Date(this.fechaInicio);
    vencimiento.setDate(vencimiento.getDate() + 14);
    return vencimiento;
  }
  calcularMulta(fechaDevolucion: Date): number {
    const vencimiento = this.calcularVencimiento();
    const diasAtraso = Math.ceil(
      (fechaDevolucion.getTime() - vencimiento.getTime()) / (1000 * 60 * 60 * 24)
    );
    return diasAtraso > 0 ? diasAtraso * 10 : 0;
  }
}

// Préstamo corto: 7 días, multa doble ($20 por día de atraso)
export class PrestamoCorto extends Prestamo {
  calcularVencimiento(): Date {
    const vencimiento = new Date(this.fechaInicio);
    vencimiento.setDate(vencimiento.getDate() + 7);
    return vencimiento;
  }
  calcularMulta(fechaDevolucion: Date): number {
    const vencimiento = this.calcularVencimiento();
    const diasAtraso = Math.ceil(
      (fechaDevolucion.getTime() - vencimiento.getTime()) / (1000 * 60 * 60 * 24)
    );
    return diasAtraso > 0 ? diasAtraso * 20 : 0;
  }
}

// Préstamo de referencia: solo consulta en biblioteca, sin llevar, sin multa
export class PrestamoReferencia extends Prestamo {
  calcularVencimiento(): null {
    return null; // No hay vencimiento porque no se lleva el libro
  }
  calcularMulta(_fechaDevolucion: Date): number {
    return 0;
  }
}

// Préstamo digital: sin límite de tiempo, sin multa
export class PrestamoDigital extends Prestamo {
  calcularVencimiento(): null {
    return null; // Sin vencimiento
  }
  calcularMulta(_fechaDevolucion: Date): number {
    return 0;
  }
}