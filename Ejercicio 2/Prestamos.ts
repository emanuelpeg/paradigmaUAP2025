
import { Libro } from "./Libro";
import { Socio } from "./Socio";

export abstract class PrestamoBase {
  protected _fechaDevolucion?: Date;
  readonly fechaInicio: Date = new Date();

  constructor(
    public readonly socio: Socio,
    public readonly libro: Libro
  ) {}


  abstract calcularVencimiento(): Date | null;

  abstract calcularMulta(hoy: Date, multaPorDia: number): number;

  get devuelto() { return !!this._fechaDevolucion; }
  get fechaDevolucion() { return this._fechaDevolucion; }

  devolver(fecha = new Date()): void {
    if (!this._fechaDevolucion) this._fechaDevolucion = fecha;
  }

  protected diasAtraso(hoy = new Date()): number {
    const v = this.calcularVencimiento();
    if (!v) return 0;
    const fin = this._fechaDevolucion ?? hoy;
    const MS = 1000 * 60 * 60 * 24;
    const due = new Date(v);  due.setHours(0,0,0,0);
    const end = new Date(fin); end.setHours(0,0,0,0);
    return Math.max(0, Math.ceil((end.getTime() - due.getTime()) / MS));
  }
}


export class PrestamoRegular extends PrestamoBase {
  constructor(socio: Socio, libro: Libro, private dias: number = 14) {
    super(socio, libro);
  }
  calcularVencimiento(): Date {
    const d = new Date(this.fechaInicio);
    d.setDate(d.getDate() + this.dias);
    return d;
  }
  calcularMulta(hoy: Date, multaPorDia: number): number {
    return this.diasAtraso(hoy) * multaPorDia;
  }
}


export class PrestamoCorto extends PrestamoBase {
  constructor(socio: Socio, libro: Libro, private dias: number = 7) {
    super(socio, libro);
  }
  calcularVencimiento(): Date {
    const d = new Date(this.fechaInicio);
    d.setDate(d.getDate() + this.dias);
    return d;
  }
  calcularMulta(hoy: Date, multaPorDia: number): number {
    return this.diasAtraso(hoy) * multaPorDia * 2;
  }
}


export class PrestamoReferencia extends PrestamoBase {
  calcularVencimiento(): Date | null { return null; }
  calcularMulta(_hoy: Date, _multaPorDia: number): number { return 0; }
}

export class PrestamoDigital extends PrestamoBase {
  calcularVencimiento(): Date | null { return null; }
  calcularMulta(_hoy: Date, _multaPorDia: number): number { return 0; }
}

export type TipoPrestamo = "regular" | "corto" | "referencia" | "digital";
