// Prestamo.ts
import { Libro } from "./Libro";
import { Usuario } from "./Usuario";

export abstract class Prestamo {
  constructor(
    public libro: Libro,
    public usuario: Usuario,
    public fechaPrestamo: Date
  ) {}

  abstract calcularVencimiento(): Date | null;
  abstract calcularMulta(fechaDevolucion: Date): number;
}

export class PrestamoRegular extends Prestamo {
  calcularVencimiento() {
    const fecha = new Date(this.fechaPrestamo);
    fecha.setDate(fecha.getDate() + 14);
    return fecha;
  }
  calcularMulta(fechaDevolucion: Date): number {
    const venc = this.calcularVencimiento()!;
    const diasRetraso = Math.max(0, (fechaDevolucion.getTime() - venc.getTime()) / (1000 * 3600 * 24));
    return diasRetraso * 50; // multa estándar
  }
}

export class PrestamoCorto extends Prestamo {
  calcularVencimiento() {
    const fecha = new Date(this.fechaPrestamo);
    fecha.setDate(fecha.getDate() + 7);
    return fecha;
  }
  calcularMulta(fechaDevolucion: Date): number {
    const venc = this.calcularVencimiento()!;
    const diasRetraso = Math.max(0, (fechaDevolucion.getTime() - venc.getTime()) / (1000 * 3600 * 24));
    return diasRetraso * 100; // multa doble
  }
}

export class PrestamoReferencia extends Prestamo {
  calcularVencimiento() { return null; } // no se lleva
  calcularMulta(_: Date): number { return 0; }
}

export class PrestamoDigital extends Prestamo {
  calcularVencimiento() { return null; } // sin límite
  calcularMulta(_: Date): number { return 0; }
}
