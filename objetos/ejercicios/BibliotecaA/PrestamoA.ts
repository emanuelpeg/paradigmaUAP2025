import { Libro } from "./LibroA";
import { Usuario } from "./UsuarioA";

export abstract class Prestamo {
  constructor(public libro: Libro, public usuario: Usuario, public fecha: Date) {}
  abstract calcularVencimiento(): Date;
  abstract calcularMulta(fechaDevolucion: Date): number;
}

export class PrestamoRegular extends Prestamo {
  calcularVencimiento() {
    const venc = new Date(this.fecha);
    venc.setDate(venc.getDate() + 14);
    return venc;
  }
  calcularMulta(fechaDevolucion: Date) {
    const venc = this.calcularVencimiento();
    const diasAtraso = Math.max(0, (fechaDevolucion.getTime() - venc.getTime()) / (1000*60*60*24));
    return diasAtraso * 50;
  }
}

export class PrestamoCorto extends Prestamo {
  calcularVencimiento() {
    const venc = new Date(this.fecha);
    venc.setDate(venc.getDate() + 7);
    return venc;
  }
  calcularMulta(fechaDevolucion: Date) {
    const venc = this.calcularVencimiento();
    const diasAtraso = Math.max(0, (fechaDevolucion.getTime() - venc.getTime()) / (1000*60*60*24));
    return diasAtraso * 100;
  }
}

export class PrestamoReferencia extends Prestamo {
  calcularVencimiento() { return this.fecha; }
  calcularMulta(fechaDevolucion: Date) { return 0; }
}

export class PrestamoDigital extends Prestamo {
  calcularVencimiento() { return new Date(8640000000000000); }
  calcularMulta(fechaDevolucion: Date) { return 0; }
}