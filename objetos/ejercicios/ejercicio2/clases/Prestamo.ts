// Tarea 2: Tipos de préstamo con polimorfismo

import { Libro } from "./Libro";

export abstract class Prestamo {
  constructor(public libro: Libro) {}
  abstract calcularVencimiento(): Date | null;
  abstract calcularMulta(diasVencido: number): number;
}

export class PrestamoRegular extends Prestamo {
  calcularVencimiento(): Date {
    const vencimiento = new Date();
    vencimiento.setDate(vencimiento.getDate() + 14);
    return vencimiento;
  }
  calcularMulta(diasVencido: number): number {
    return diasVencido * 10;
  }
}

export class PrestamoCorto extends Prestamo {
  calcularVencimiento(): Date {
    const vencimiento = new Date();
    vencimiento.setDate(vencimiento.getDate() + 7);
    return vencimiento;
  }
  calcularMulta(diasVencido: number): number {
    return diasVencido * 20;
  }
}

export class PrestamoReferencia extends Prestamo {
  calcularVencimiento(): null {
    return null;
  }
  calcularMulta(): number {
    return 0;
  }
}

export class PrestamoDigital extends Prestamo {
  calcularVencimiento(): null {
    return null;
  }
  calcularMulta(): number {
    return 0;
  }
}
