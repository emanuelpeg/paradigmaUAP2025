import { Libro } from "./Libro";
import { Prestamo } from "./Prestamo";

export abstract class Socio {
  protected _prestamos: Prestamo[] = [];
  protected _historial: Libro[] = [];
  protected _deuda: number = 0;

  constructor(
    private _id: number,
    private _nombre: string,
    private _apellido: string
  ) {}

  get id() { return this._id; }
  get nombreCompleto() { return `${this._nombre} ${this._apellido}`; }
  get prestamos(): ReadonlyArray<Prestamo> { return this._prestamos; }
  get historialLectura(): ReadonlyArray<Libro> { return this._historial; }
  get deudaPendiente(): number { return this._deuda; }

  abstract capacidadMaxima(): number | "ilimitado";
  abstract periodoBaseDias(): number;
  abstract aplicaMultas(): boolean; // VIP no paga multa

  puedeTomarOtro(): boolean {
    if (this.capacidadMaxima() === "ilimitado") return true;
    return this._prestamos.length < (this.capacidadMaxima() as number);
  }

  tienePrestado(isbn: string): boolean {
    return this._prestamos.some(p => p.libro.isbn === isbn);
  }

  agregarPrestamo(p: Prestamo) {
    if (!this.tienePrestado(p.libro.isbn)) this._prestamos.push(p);
  }

  registrarDevolucion(isbn: string, fecha: Date): number {
    const idx = this._prestamos.findIndex(p => p.libro.isbn === isbn);
    if (idx === -1) throw new Error("El socio no tenía este libro.");
    const p = this._prestamos[idx];
    this._prestamos.splice(idx, 1);

    const multa = p.calcularMulta(this, fecha);
    this._deuda += multa;

    if (!this._historial.some(l => l.isbn === p.libro.isbn)) this._historial.push(p.libro);
    return multa;
  }

  pagarDeuda(monto: number) { if (monto > 0) this._deuda = Math.max(0, this._deuda - monto); }
}

// ---- Tipos de socio
export class SocioRegular extends Socio {
  capacidadMaxima() { return 3; }
  periodoBaseDias() { return 14; }
  aplicaMultas()    { return true; }
}
export class SocioVIP extends Socio {
  capacidadMaxima() { return 5; }
  periodoBaseDias() { return 21; }
  aplicaMultas()    { return false; } // sin multas
}
export class Empleado extends Socio {
  capacidadMaxima(): "ilimitado" { return "ilimitado"; }  // ← tipo literal explícito
  periodoBaseDias() { return 28; }
  aplicaMultas()    { return true; }
}

export class Visitante extends Socio {
  capacidadMaxima() { return 0; }
  periodoBaseDias() { return 0; }
  aplicaMultas()    { return false; }
}
