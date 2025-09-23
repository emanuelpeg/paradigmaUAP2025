import type { Libro } from "./Libro";
import type { Socio } from "./Socio";

export abstract class Prestamo {
  fecha: Date;
  vencimiento: Date;

  constructor(
    public socio: Socio,
    public libro: Libro
  ) {
    this.fecha = new Date();
    this.vencimiento = this.calcularVencimiento();
  }

  /** cada subclase define su vencimiento */
  abstract calcularVencimiento(): Date;
  /** cada subclase define el cálculo de multa */
  abstract calcularMulta(hoy?: Date): number;

  estaVencido(hoy: Date = new Date()): boolean {
    return hoy.getTime() > this.vencimiento.getTime();
  }
}

function addDays(base: Date, days: number): Date {
  const d = new Date(base.getTime());
  d.setDate(d.getDate() + days);
  return d;
}

/** Regular: 14 días, multa estándar (por día) */
export class PrestamoRegular extends Prestamo {
  calcularVencimiento(): Date {
    return addDays(this.fecha, 14);
  }
  calcularMulta(hoy: Date = new Date()): number {
    if (!this.estaVencido(hoy)) return 0;
    const dias = Math.ceil((hoy.getTime() - this.vencimiento.getTime()) / 86400000);
    return Math.max(0, dias) * 50; // $50/día
  }
}

/** Corto: 7 días, multa doble */
export class PrestamoCorto extends Prestamo {
  calcularVencimiento(): Date {
    return addDays(this.fecha, 7);
  }
  calcularMulta(hoy: Date = new Date()): number {
    if (!this.estaVencido(hoy)) return 0;
    const dias = Math.ceil((hoy.getTime() - this.vencimiento.getTime()) / 86400000);
    return Math.max(0, dias) * 100; // doble
  }
}

/** Referencia: solo consulta, sin llevar, sin multa (se usa como flag) */
export class PrestamoReferencia extends Prestamo {
  calcularVencimiento(): Date { return this.fecha; }
  calcularMulta(): number { return 0; }
}

/** Digital: sin límite, sin multa */
export class PrestamoDigital extends Prestamo {
  calcularVencimiento(): Date { return addDays(this.fecha, 36500); } // muy largo
  calcularMulta(): number { return 0; }
}
