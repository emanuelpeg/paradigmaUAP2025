// Prestamo.ts
import { Libro } from "./Libro";
import type { Socio } from "./Socio";

const MS_POR_DIA = 1000 * 60 * 60 * 24;

export abstract class Prestamo {
  protected _fechaPrestamo: Date = new Date();

  constructor(protected socio: Socio, protected libro: Libro) {}

  get Socio() { return this.socio; }
  get Libro() { return this.libro; }
  get FechaPrestamo() { return this._fechaPrestamo; }
  get Vencimiento(): Date { return this.calcularVencimiento(); }

  /** Cada subclase define su vencimiento y su multa */
  abstract calcularVencimiento(): Date;
  abstract calcularMulta(fechaDevolucion: Date): number;

  protected diasDeRetraso(fechaDevolucion: Date): number {
    const diff = fechaDevolucion.getTime() - this.Vencimiento.getTime();
    return Math.ceil(diff / MS_POR_DIA);
  }
}

export class PrestamoRegular extends Prestamo {
  calcularVencimiento(): Date {
    const f = new Date(this._fechaPrestamo);
    f.setDate(f.getDate() + 14);
    return f;
  }
  calcularMulta(fechaDevolucion: Date): number {
    const dias = this.diasDeRetraso(fechaDevolucion);
    return dias > 0 ? dias * 50 : 0;
  }
}

export class PrestamoCorto extends Prestamo {
  calcularVencimiento(): Date {
    const f = new Date(this._fechaPrestamo);
    f.setDate(f.getDate() + 7);
    return f;
  }
  calcularMulta(fechaDevolucion: Date): number {
    const dias = this.diasDeRetraso(fechaDevolucion);
    return dias > 0 ? dias * 100 : 0; // multa doble
  }
}

export class PrestamoReferencia extends Prestamo {
  calcularVencimiento(): Date {
    return this._fechaPrestamo; // consulta en sala
  }
  calcularMulta(_: Date): number {
    return 0;
  }
}

export class PrestamoDigital extends Prestamo {
  calcularVencimiento(): Date {
    // una fecha muy lejana (prácticamente sin vencimiento)
    return new Date(8640000000000000);
  }
  calcularMulta(_: Date): number {
    return 0;
  }
}
