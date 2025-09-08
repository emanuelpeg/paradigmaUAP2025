import { Libro } from "./Libro";
import { Prestamo, PrestamoRegular } from "./prestamo";

export type Duracion = number;

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
  get nombreCompleto() { return `${this.nombre} ${this.apellido}`; }

  abstract getDuracionPrestamo(): Duracion;
  abstract getMaximoLibros(): number;

  retirar(libro: Libro, prestamo?: Prestamo) {
    if (!this.puedeRetirar(libro)) {
      throw new Error("No tiene permisos para retirar este libro");
    }
    const nuevoPrestamo = prestamo ?? new PrestamoRegular(libro);
    this.prestamos.push(nuevoPrestamo);
  }

  devolver(libro: Libro) {
    const prestamo = this.tienePrestadoLibro(libro);
    if (!prestamo) throw new Error("No está prestado");
    const indice = this.prestamos.indexOf(prestamo);
    this.prestamos.splice(indice, 1);
    return prestamo;
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
}

export class SocioRegular extends Socio {
  getDuracionPrestamo(): Duracion { return 14; }
  getMaximoLibros(): number { return 3; }
}

export class SocioVIP extends Socio {
  getDuracionPrestamo(): Duracion { return 21; }
  getMaximoLibros(): number { return 5; }
}

export class Empleado extends Socio {
  getDuracionPrestamo(): Duracion { return 30; }
  getMaximoLibros(): number { return Infinity; }
}

export class Visitante extends Socio {
  puedeRetirar(libro: Libro): boolean { return false; }
  getDuracionPrestamo(): Duracion { return 0; }
  getMaximoLibros(): number { return 0; }
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
        throw new Error("Tipo de socio no válido");
    }
  }
}