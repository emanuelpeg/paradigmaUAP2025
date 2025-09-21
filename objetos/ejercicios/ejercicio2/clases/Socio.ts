export type Duracion = number;

import { Libro } from "./Libro";
import { Prestamo, PrestamoRegular, PrestamoCorto, PrestamoReferencia, PrestamoDigital, TipoPrestamo } from "./Prestamo";

export abstract class Socio {
  protected prestamos: Prestamo[] = [];

  constructor(
    private _id: number,
    private _nombre: string,
    private _apellido: string
  ) {}

  get id() {
    return this._id;
  }

  get nombre() {
    return this._nombre;
  }

  get apellido() {
    return this._apellido;
  }

  get nombreCompleto() {
    return `${this.nombre} ${this.apellido}`;
  }

  abstract getDuracionPrestamo(): Duracion;
  abstract getMaximoLibros(): number;

  // Nuevo método para retirar con tipo de préstamo
  retirar(libro: Libro, tipoPrestamo: TipoPrestamo = 'regular') {
    if (!this.puedeRetirar(libro)) {
      throw new Error("No tiene permisos para retirar este libro");
    }

    let prestamo: Prestamo;
    switch (tipoPrestamo) {
      case 'regular':
        prestamo = new PrestamoRegular(libro);
        break;
      case 'corto':
        prestamo = new PrestamoCorto(libro);
        break;
      case 'referencia':
        prestamo = new PrestamoReferencia(libro);
        break;
      case 'digital':
        prestamo = new PrestamoDigital(libro);
        break;
      default:
        throw new Error("Tipo de préstamo no válido");
    }
    this.prestamos.push(prestamo);
  }

  devolver(libro: Libro, fechaDevolucion: Date = new Date()) {
    const prestamo = this.tienePrestadoLibro(libro);

    if (!prestamo) {
      throw new Error("No esta prestado");
    }

    // Calcula multa usando polimorfismo
    const multa = prestamo.calcularMulta(fechaDevolucion);

    const indice = this.prestamos.indexOf(prestamo);
    this.prestamos.splice(indice, 1);

    return { prestamo, multa };
  }

  tienePrestadoLibro(libro: Libro): Prestamo | null {
    return this.prestamos.find((p) => p.libro === libro) ?? null;
  }

  get librosEnPrestamo() {
    return this.prestamos.length;
  }

  puedeRetirar(libro: Libro): boolean {
    return this.prestamos.length < this.getMaximoLibros();
  }

  // Agrega este getter público
  getPrestamos(): Prestamo[] {
    return this.prestamos;
  }
}

export class SocioRegular extends Socio {
  getDuracionPrestamo(): Duracion {
    return 14;
  }

  getMaximoLibros(): number {
    return 3;
  }

  // Corrige el tipo de retorno
  devolver(libro: Libro, fechaDevolucion: Date = new Date()) {
    return super.devolver(libro, fechaDevolucion);
  }
}

export class SocioVIP extends Socio {
  getDuracionPrestamo(): Duracion {
    return 21;
  }

  getMaximoLibros(): number {
    return 5;
  }
}

export class Empleado extends Socio {
  getDuracionPrestamo(): Duracion {
    return 30;
  }

  getMaximoLibros(): number {
    return Infinity;
  }
}

export class Visitante extends Socio {
  puedeRetirar(libro: Libro): boolean {
    return false;
  }

  getDuracionPrestamo(): Duracion {
    return 0;
  }

  getMaximoLibros(): number {
    return 0;
  }
}

export enum TipoSocio {
  REGULAR = "regular",
  VIP = "vip",
  EMPLEADO = "empleado",
  VISITANTE = "visitante",
}

export class SocioFactory {
  static crearSocio(
    tipo: TipoSocio,
    id: number,
    nombre: string,
    apellido: string
  ): Socio {
    switch (tipo) {
      case TipoSocio.REGULAR:
        return new SocioRegular(id, nombre, apellido);
      case TipoSocio.VIP:
        return new SocioVIP(id, nombre, apellido);
      case TipoSocio.EMPLEADO:
        return new Empleado(id, nombre, apellido);
      case TipoSocio.VISITANTE:
        return new Visitante(id, nombre, apellido);
      default:
        throw new Error("Tipo de socio no valido");
    }
  }
}
