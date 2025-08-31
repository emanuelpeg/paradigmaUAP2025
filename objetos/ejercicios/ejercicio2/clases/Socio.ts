import { Libro } from "./Libro";

type Duracion = number;

export enum TipoSocio {
  REGULAR = "regular",
  VIP = "vip",
  EMPLEADO = "empleado",
  VISITANTE = "visitante",
}

export enum TipoPrestamo {
  REGULAR = "regular",
  CORTO = "corto",
  REFERENCIA = "referencia",
  DIGITAL = "digital",
}

export abstract class Prestamo {
  constructor(public libro: Libro, public vencimiento: Date | null) {}
  abstract calcularVencimiento(): Date | null;
  abstract calcularMulta(hoy: Date): number;
}

export class PrestamoRegular extends Prestamo {
  constructor(libro: Libro, dias: number = 14) {
    const venc = new Date();
    venc.setDate(venc.getDate() + dias);
    super(libro, venc);
  }
  calcularVencimiento(): Date | null {
    return this.vencimiento;
  }
  calcularMulta(hoy: Date): number {
    if (!this.vencimiento) return 0;
    if (hoy <= this.vencimiento) return 0;
    const dias = Math.ceil((hoy.getTime() - this.vencimiento.getTime()) / (1000 * 60 * 60 * 24));
    return dias * 50;
  }
}

export class PrestamoCorto extends Prestamo {
  constructor(libro: Libro, dias: number = 7) {
    const venc = new Date();
    venc.setDate(venc.getDate() + dias);
    super(libro, venc);
  }
  calcularVencimiento(): Date | null {
    return this.vencimiento;
  }
  calcularMulta(hoy: Date): number {
    if (!this.vencimiento) return 0;
    if (hoy <= this.vencimiento) return 0;
    const dias = Math.ceil((hoy.getTime() - this.vencimiento.getTime()) / (1000 * 60 * 60 * 24));
    return dias * 100;
  }
}

export class PrestamoReferencia extends Prestamo {
  constructor(libro: Libro) {
    super(libro, null);
  }
  calcularVencimiento(): Date | null {
    return null;
  }
  calcularMulta(hoy: Date): number {
    return 0;
  }
}

export class PrestamoDigital extends Prestamo {
  constructor(libro: Libro) {
    super(libro, null);
  }
  calcularVencimiento(): Date | null {
    return null;
  }
  calcularMulta(hoy: Date): number {
    return 0;
  }
}

export abstract class Socio {
  protected prestamos: Prestamo[] = [];

  constructor(private _id: number, private _nombre: string, private _apellido: string) {}

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

  retirar(libro: Libro, duracion?: Duracion, tipo: TipoPrestamo = TipoPrestamo.REGULAR) {
    if (!this.puedeRetirar(libro)) {
      throw new Error("No tiene permisos para retirar este libro");
    }

    let prestamo: Prestamo;
    switch (tipo) {
      case TipoPrestamo.CORTO:
        prestamo = new PrestamoCorto(libro, duracion ?? 7);
        break;
      case TipoPrestamo.REFERENCIA:
        prestamo = new PrestamoReferencia(libro);
        break;
      case TipoPrestamo.DIGITAL:
        prestamo = new PrestamoDigital(libro);
        break;
      default:
        prestamo = new PrestamoRegular(libro, duracion ?? this.getDuracionPrestamo());
    }

    this.prestamos.push(prestamo);
  }

  devolver(libro: Libro) {
    const prestamo = this.tienePrestadoLibro(libro);

    if (!prestamo) {
      throw new Error("No esta prestado");
    }

    const hoy = new Date();
    const multa = prestamo.calcularMulta(hoy);
    
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
}

export class SocioRegular extends Socio {
  getDuracionPrestamo(): Duracion {
    return 14;
  }

  getMaximoLibros(): number {
    return 3;
  }

  devolver(libro: Libro) {
    return super.devolver(libro);
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
    return Infinity as unknown as number;
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

export class SocioFactory {
  static crearSocio(tipo: TipoSocio, id: number, nombre: string, apellido: string): Socio {
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
