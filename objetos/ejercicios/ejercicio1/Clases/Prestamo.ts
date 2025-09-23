import { Libro } from "./Libro";
import type { Socio } from "./Socio";

export abstract class Prestamo {
  constructor(public libro: Libro, public fechaInicio: Date = new Date()) {}
  abstract calcularVencimiento(): Date | null;   // null = sin vencimiento / solo consulta
  abstract calcularMulta(socio: Socio, fechaDevolucion: Date): number;
}

export class PrestamoRegular extends Prestamo {
  calcularVencimiento(): Date {
    const d = new Date(this.fechaInicio); d.setDate(d.getDate() + 14);
    return d;
  }
  calcularMulta(socio: Socio, fecha: Date): number {
    const v = this.calcularVencimiento();
    if (!v) return 0;
    const dias = Math.max(0, Math.ceil((+fecha - +v)/86_400_000));
    return socio.aplicaMultas() ? dias * 50 : 0;
  }
}

export class PrestamoCorto extends Prestamo {
  calcularVencimiento(): Date {
    const d = new Date(this.fechaInicio); d.setDate(d.getDate() + 7);
    return d;
  }
  calcularMulta(socio: Socio, fecha: Date): number {
    const v = this.calcularVencimiento();
    const dias = Math.max(0, Math.ceil((+fecha - +v)/86_400_000));
    return socio.aplicaMultas() ? dias * 100 : 0; // multa doble
  }
}

export class PrestamoReferencia extends Prestamo {
  calcularVencimiento(): Date | null { return null; } // solo consulta en sala
  calcularMulta(): number { return 0; }
}

export class PrestamoDigital extends Prestamo {
  calcularVencimiento(): Date | null { return null; } // sin límite
  calcularMulta(): number { return 0; }
}

export type TipoPrestamo = "regular" | "corto" | "referencia" | "digital";

export function crearPrestamo(tipo: TipoPrestamo, libro: Libro, inicio?: Date): Prestamo {
  switch (tipo) {
    case "corto":      return new PrestamoCorto(libro, inicio);
    case "referencia": return new PrestamoReferencia(libro, inicio);
    case "digital":    return new PrestamoDigital(libro, inicio);
    default:           return new PrestamoRegular(libro, inicio);
  }
}
