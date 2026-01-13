import { Prestamo } from "./Prestamo";

/**
 * PrestamoRegular: dura 14 días, multa estándar (10).
 */
export class PrestamoRegular extends Prestamo {
  calcularVencimiento(): Date {
    const v = new Date(this.fechaPrestamo);
    v.setDate(v.getDate() + 14);
    return v;
  }

  calcularMulta(fechaDevolucion: Date): number {
    return fechaDevolucion > this.calcularVencimiento() ? 10 : 0;
  }
}

/**
 * PrestamoCorto: dura 7 días, multa doble (20).
 */
export class PrestamoCorto extends Prestamo {
  calcularVencimiento(): Date {
    const v = new Date(this.fechaPrestamo);
    v.setDate(v.getDate() + 7);
    return v;
  }

  calcularMulta(fechaDevolucion: Date): number {
    return fechaDevolucion > this.calcularVencimiento() ? 20 : 0;
  }
}

/**
 * PrestamoReferencia: solo en sala, sin multa.
 */
export class PrestamoReferencia extends Prestamo {
  calcularVencimiento(): Date | null {
    return null; // No hay vencimiento
  }

  calcularMulta(_: Date): number {
    return 0; // Nunca hay multa
  }
}

/**
 * PrestamoDigital: sin vencimiento ni multa.
 */
export class PrestamoDigital extends Prestamo {
  calcularVencimiento(): Date | null {
    return null;
  }

  calcularMulta(_: Date): number {
    return 0;
  }
}