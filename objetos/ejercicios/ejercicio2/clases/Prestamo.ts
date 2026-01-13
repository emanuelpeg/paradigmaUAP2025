import { Libro } from "./Libro";

export abstract class Prestamo {
  constructor(public libro: Libro, public fechaInicio: Date) {}

  abstract calcularVencimiento(): Date | null;

  abstract calcularMulta(fechaDevolucion: Date): number;
}

export class PrestamoRegular extends Prestamo {
  calcularVencimiento(): Date {
    const v = new Date(this.fechaInicio);
    v.setDate(v.getDate() + 14);
    return v;
  }
  calcularMulta(fechaDevolucion: Date): number {
    const v = this.calcularVencimiento();
    const dias = Math.ceil((+fechaDevolucion - +v) / (1000 * 60 * 60 * 24));
    return dias > 0 ? dias * 50 : 0;
  }
}

export class PrestamoExtendido extends Prestamo {
  calcularVencimiento(): Date {
    const v = new Date(this.fechaInicio);
    v.setDate(v.getDate() + 28);
    return v;
  }
  calcularMulta(fechaDevolucion: Date): number {
    const v = this.calcularVencimiento();
    const dias = Math.ceil((+fechaDevolucion - +v) / (1000 * 60 * 60 * 24));
    return dias > 0 ? dias * 30 : 0;
  }
}

export class PrestamoSinVencimiento extends Prestamo {
  calcularVencimiento(): Date | null {
    return null;
  }
  calcularMulta(_fechaDevolucion: Date): number {
    return 0;
  }
}
