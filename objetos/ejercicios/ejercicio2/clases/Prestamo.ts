import { Libro } from "./Libro";

export abstract class Prestamo {
  abstract calcularVencimiento(): Date;
  abstract calcularMulta(): number;
  constructor(public libro: Libro, public vencimiento: Date) {
  };
}


export class PrestamoRegular extends Prestamo {
  constructor(libro: Libro) {
    const fechaVencimiento = new Date();
    fechaVencimiento.setDate(fechaVencimiento.getDate() + 14);
    super(libro, fechaVencimiento);
  }

  calcularMulta(): number {
    const hoy = new Date();
    const diasAtraso = Math.ceil((hoy.getTime() - this.vencimiento.getTime()) / (1000 * 60 * 60 * 24));
    if (diasAtraso <= 0) {
      return 0;
    }
    return diasAtraso * 50;
  }

  calcularVencimiento(): Date {
    return this.vencimiento;
  }
}

export class PrestamoCorto extends Prestamo {
  constructor(libro: Libro) {
    const fechaVencimiento = new Date();
    fechaVencimiento.setDate(fechaVencimiento.getDate() + 7);

    super(libro, fechaVencimiento);
  }

  calcularMulta(): number {
    const hoy = new Date();
    if (hoy <= this.vencimiento) {
      return 0;
    }
    const diasAtraso = Math.ceil((hoy.getTime()) - this.vencimiento.getTime()) / (1000 * 60 * 60 * 24);
    return diasAtraso * 50 * 2;
  }

  calcularVencimiento(): Date {
    return this.vencimiento
  }

}


export class PrestamoReferencia extends Prestamo {
  constructor(libro: Libro) {
    super(libro, new Date());
  }

  calcularMulta(): number {
    return 0;
  }

  override calcularVencimiento(): Date {
    throw new Error("No puedes prestar libros.");
  }
}


export class PrestamoDigital extends Prestamo {
  constructor(libro: Libro) {
    super(libro, new Date(9999, 11, 31));
  }

  calcularMulta(): number {
    return 0;
  }

  calcularVencimiento(): Date {
    return this.vencimiento;
  }
}

export enum TipoPrestamo {
  REGULAR = "regular",
  CORTO = "corto",
  REFERENCIA = "referencia",
  DIGITAL = "digital"
}
