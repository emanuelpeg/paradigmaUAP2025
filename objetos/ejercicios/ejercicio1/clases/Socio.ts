import { Libro3D } from "./Libro.js";

class Prestamo {
  constructor(public libro: Libro3D, public vencimiento: Date) {}
}

/** Duracion en dias de un prestamo */
type Duracion = number;

export abstract class Socio {
  protected prestamos: Prestamo[] = [];
  protected multasPendientes: number = 0;
  protected historialLectura: Libro3D[] = [];
  protected reservas: Libro3D[] = [];

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

  get deuda(): number {
    return this.multasPendientes;
  }

  abstract getDuracionPrestamo(): Duracion;
  abstract getMaximoLibros(): number;

  retirar(libro: Libro3D, duracion?: Duracion) {
    if (!this.puedeRetirar()) {
      throw new Error("No tiene permisos para retirar este libro");
    }
    if (this.deuda > 0) {
      throw new Error("No puede retirar libros con multas pendientes");
    }
    const duracionFinal = duracion ?? this.getDuracionPrestamo();
    const vencimiento = new Date();
    vencimiento.setDate(vencimiento.getDate() + duracionFinal);
    this.prestamos.push(new Prestamo(libro, vencimiento));
  }

  devolver(libro: Libro3D) {
    const prestamo = this.tienePrestadoLibro(libro);
    if (!prestamo) {
      throw new Error("No tiene este libro prestado");
    }
    this.prestamos = this.prestamos.filter((p) => p.libro !== libro);
    this.historialLectura.push(libro);
  }

  tienePrestadoLibro(libro: Libro3D): Prestamo | null {
    return this.prestamos.find((p) => p.libro === libro) ?? null;
  }

  registrarMulta(monto: number) {
    this.multasPendientes += monto;
  }

  pagarMulta(monto: number) {
    if (monto > this.multasPendientes) throw new Error("Monto mayor a la deuda");
    this.multasPendientes -= monto;
  }

  puedeRetirar(): boolean {
    return this.prestamos.length < this.getMaximoLibros();
  }

  agregarReserva(libro: Libro3D) {
    this.reservas.push(libro);
  }

  obtenerHistorialLectura(): Libro3D[] {
    return [...this.historialLectura];
  }

  recomendacionesSimples(): string[] {
    return this.historialLectura.map((libro) => `Recomendado: ${libro.titulo}`);
  }
}

export class SocioRegular extends Socio {
  getDuracionPrestamo(): Duracion {
    return 14;
  }
  getMaximoLibros(): number {
    return 3;
  }
}

export class SocioVIP extends Socio {
  getDuracionPrestamo(): Duracion {
    return 30;
  }
  getMaximoLibros(): number {
    return 10;
  }
}

export class SocioEmpleado extends Socio {
  getDuracionPrestamo(): Duracion {
    return 60;
  }
  getMaximoLibros(): number {
    return 20;
  }
}

export class SocioVisitante extends Socio {
  getDuracionPrestamo(): Duracion {
    return 7;
  }
  getMaximoLibros(): number {
    return 1;
  }
}

export enum TipoSocio {
  REGULAR,
  VIP,
  EMPLEADO,
  VISITANTE,
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
        return new SocioEmpleado(id, nombre, apellido);
      case TipoSocio.VISITANTE:
        return new SocioVisitante(id, nombre, apellido);
      default:
        throw new Error("Tipo de socio no válido");
    }
  }
}
