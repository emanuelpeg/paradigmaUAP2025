import { Socio } from "./Socio";
import { Libro } from "./Libro";

export enum TipoPrestamo {
  Regular = "regular",
  Corto = "corto",
  Referencia = "referencia",
  Digital = "digital",
}

// Clase base
export abstract class Prestamo {
  public vencimiento: Date | null = null;
  public multa: number = 0;
  protected diasMora: number = 0;

  constructor(
    public libro: Libro,
    public socio: Socio,
    protected multaBase: number
  ) {}

  setDiasMora(dias: number) {
    this.diasMora = Math.max(0, dias);
  }

  abstract calcularVencimiento(): void;
  abstract calcularMulta(): void;
}

export class PrestamoRegular extends Prestamo {
  constructor(libro: Libro, socio: Socio, multaBase: number, private dias: number = 14) {
    super(libro, socio, multaBase);
  }

  calcularVencimiento(): void {
    const v = new Date();
    v.setDate(v.getDate() + this.dias);
    this.vencimiento = v;
  }

  calcularMulta(): void {
    this.multa = this.multaBase * this.diasMora;
  }
}

export class PrestamoCorto extends Prestamo {
  calcularVencimiento(): void {
    const v = new Date();
    v.setDate(v.getDate() + 7);
    this.vencimiento = v;
  }

  calcularMulta(): void {
    this.multa = this.multaBase * 2 * this.diasMora;
  }
}

export class PrestamoReferencia extends Prestamo {
  calcularVencimiento(): void {
    // Solo consulta en sala; consideramos vencimiento el mismo día (no se lleva)
    const v = new Date();
    this.vencimiento = v;
  }

  calcularMulta(): void {
    this.multa = 0; // Sin multa
  }
}

export class PrestamoDigital extends Prestamo {
  calcularVencimiento(): void {
    this.vencimiento = null; // Sin límite de tiempo
  }

  calcularMulta(): void {
    this.multa = 0; // Sin multa
  }
}

export function crearPrestamo(
  tipo: TipoPrestamo,
  libro: Libro,
  socio: Socio,
  multaBase: number,
  opciones?: { diasRegular?: number }
): Prestamo {
  switch (tipo) {
    case TipoPrestamo.Regular:
      return new PrestamoRegular(libro, socio, multaBase, opciones?.diasRegular ?? 14);
    case TipoPrestamo.Corto:
      return new PrestamoCorto(libro, socio, multaBase);
    case TipoPrestamo.Referencia:
      return new PrestamoReferencia(libro, socio, multaBase);
    case TipoPrestamo.Digital:
      return new PrestamoDigital(libro, socio, multaBase);
  }
}
