import { Libro } from "./Libro";
import { Prestamo, PrestamoRegular, PrestamoExtendido, PrestamoSinVencimiento } from "./Prestamo";

type Duracion = number;

export abstract class Socio {
  protected prestamos: Prestamo[] = [];

  constructor(
    private _id: number,
    private _nombre: string,
    private _apellido: string
  ) {}

  get id() { return this._id; }
  get nombre() { return this._nombre; }
  get apellido() { return this._apellido; }

  abstract limiteLibros(): number;

  abstract ignoraMultas(): boolean;

  retirarConPrestamo(prestamo: Prestamo) {
    if (this.prestamos.length >= this.limiteLibros()) {
      throw new Error("Supera el límite de préstamos");
    }
    this.prestamos.push(prestamo);
  }

  retirar(libro: Libro, duracion: Duracion) {
    let p: Prestamo;
    if (!isFinite(this.limiteLibros())) {
      p = new PrestamoSinVencimiento(libro, new Date());
    } else if (duracion >= 28) {
      p = new PrestamoExtendido(libro, new Date());
    } else {
      p = new PrestamoRegular(libro, new Date());
    }
    this.retirarConPrestamo(p);
  }

  devolver(libro: Libro, fechaDevolucion: Date = new Date()): number {
    const p = this.prestamos.find(pr => pr.libro === libro);
    if (!p) throw new Error("El socio no tenía ese libro");

    // quitar de la lista
    this.prestamos = this.prestamos.filter(pr => pr !== p);

    if (this.ignoraMultas()) return 0;
    return p.calcularMulta(fechaDevolucion);
  }

  tienePrestadoLibro(libro: Libro): Prestamo | null {
    return this.prestamos.find(p => p.libro === libro) ?? null;
  }

  getPrestamos(): Prestamo[] {
    return [...this.prestamos];
  }
}

export class SocioRegular extends Socio {
  limiteLibros(): number { return 3; }
  ignoraMultas(): boolean { return false; }
}
export class SocioVIP extends Socio {
  limiteLibros(): number { return 5; }
  ignoraMultas(): boolean { return true; } // sin multas
}
export class Empleado extends Socio {
  limiteLibros(): number { return Infinity; }
  ignoraMultas(): boolean { return true; }
}
export class Visitante extends Socio {
  limiteLibros(): number { return 0; } // solo consulta
  ignoraMultas(): boolean { return true; }
}

export type { Duracion, Prestamo };
