import { Libro } from "./Libro";

/** Clase base abstracta */
export abstract class Prestamo {
  constructor(
    public libro: Libro,
    public fechaInicio: Date
  ) {}

  abstract calcularVencimiento(): Date | null; // null = sin vencimiento
  abstract calcularMulta(fechaDevolucion: Date): number;
}

/** PrestamoRegular: 14 días, multa estándar */
export class PrestamoRegular extends Prestamo {
  calcularVencimiento(): Date {
    const venc = new Date(this.fechaInicio);
    venc.setDate(venc.getDate() + 14);
    return venc;
  }

  calcularMulta(fechaDevolucion: Date): number {
    const venc = this.calcularVencimiento();
    if (fechaDevolucion <= venc) return 0;

    const dias = Math.ceil(
      (fechaDevolucion.getTime() - venc.getTime()) / (1000 * 60 * 60 * 24)
    );
    return dias * 50; // multa estándar
  }
}

/** PrestamoCorto: 7 días, multa doble */
export class PrestamoCorto extends Prestamo {
  calcularVencimiento(): Date {
    const venc = new Date(this.fechaInicio);
    venc.setDate(venc.getDate() + 7);
    return venc;
  }

  calcularMulta(fechaDevolucion: Date): number {
    const venc = this.calcularVencimiento();
    if (fechaDevolucion <= venc) return 0;

    const dias = Math.ceil(
      (fechaDevolucion.getTime() - venc.getTime()) / (1000 * 60 * 60 * 24)
    );
    return dias * 100; // multa doble
  }
}

/** PrestamoReferencia: solo consulta, sin vencimiento ni multa */
export class PrestamoReferencia extends Prestamo {
  calcularVencimiento(): Date | null {
    return null; // no se lleva a casa
  }

  calcularMulta(fechaDevolucion: Date): number {
    return 0; // nunca hay multa, aunque reciba fecha
  }
}

/** PrestamoDigital: sin límite ni multa */
export class PrestamoDigital extends Prestamo {
  calcularVencimiento(): Date | null {
    return null; // no tiene vencimiento
  }

  calcularMulta(fechaDevolucion: Date): number {
    return 0; // tampoco hay multa
  }
}

