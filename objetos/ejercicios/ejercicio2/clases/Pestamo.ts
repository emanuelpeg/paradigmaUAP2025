import { Libro } from "./Libro";
export abstract class Prestamo {
  constructor(public libro: Libro, public fechaInicio: Date) {}

  abstract calcularVencimiento(): Date;
  abstract calcularMulta(fechaDevolucion: Date): number;
}

export class PrestamoRegular extends Prestamo {
  calcularVencimiento(): Date {
    const vencimiento = new Date(this.fechaInicio);
    vencimiento.setDate(vencimiento.getDate() + 14);
    return vencimiento;
  }
  calcularMulta(fechaDevolucion: Date): number {
    const vencimiento = this.calcularVencimiento();
    if (fechaDevolucion > vencimiento) {
      const dias = Math.ceil((fechaDevolucion.getTime() - vencimiento.getTime()) / (1000 * 60 * 60 * 24));
      return dias * 50;
    }
    return 0;
  }
}

export class PrestamoCorto extends Prestamo {
  calcularVencimiento(): Date {
    const vencimiento = new Date(this.fechaInicio);
    vencimiento.setDate(vencimiento.getDate() + 7);
    return vencimiento;
  }
  calcularMulta(fechaDevolucion: Date): number {
    const vencimiento = this.calcularVencimiento();
    if (fechaDevolucion > vencimiento) {
      const dias = Math.ceil((fechaDevolucion.getTime() - vencimiento.getTime()) / (1000 * 60 * 60 * 24));
      return dias * 100; // Multa doble
    }
    return 0;
  }
}

export class PrestamoReferencia extends Prestamo {
  calcularVencimiento(): Date {
    return this.fechaInicio; // Solo consulta, no hay vencimiento
  }
  calcularMulta(fechaDevolucion: Date): number {
    return 0; // Sin multa
  }
}

export class PrestamoDigital extends Prestamo {
  calcularVencimiento(): Date {
    return new Date(8640000000000000); // Fecha máxima posible
  }
  calcularMulta(fechaDevolucion: Date): number {
    return 0; // Sin multa
  }
}