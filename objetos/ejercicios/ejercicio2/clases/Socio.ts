import { Libro } from "./Libro";

export abstract class Prestamo {
  constructor(public libro: Libro, public inicio: Date = new Date()) {}
  
  abstract calcularVencimiento(): Date | null;
  abstract calcularMulta(fechaDevolucion: Date): number;
}

//tipos de prestamos
export class PrestamoRegular extends Prestamo {
  calcularVencimiento(): Date {
    const vencimiento = new Date(this.inicio);
    vencimiento.setDate(vencimiento.getDate() + 14);
    return vencimiento;
  }

  calcularMulta(fechaDevolucion: Date): number {
    const vencimiento = this.calcularVencimiento();
    if (fechaDevolucion > vencimiento) {
      const diasAtraso = Math.ceil(
        (fechaDevolucion.getTime() - vencimiento.getTime()) / (1000 * 60 * 60 * 24)
      );
      return diasAtraso * 10;
    }
    return 0;
  }
}

export class PrestamoCorto extends Prestamo {
  calcularVencimiento(): Date {
    const vencimiento = new Date(this.inicio);
    vencimiento.setDate(vencimiento.getDate() + 7);
    return vencimiento;
  }

  calcularMulta(fechaDevolucion: Date): number {
    const vencimiento = this.calcularVencimiento();
    if (fechaDevolucion > vencimiento) {
      const diasAtraso = Math.ceil(
        (fechaDevolucion.getTime() - vencimiento.getTime()) / (1000 * 60 * 60 * 24)
      );
      return diasAtraso * 20;
    }
    return 0;
  }
}

export class PrestamoReferencia extends Prestamo {
  calcularVencimiento(): Date | null {
    return null;
  }

  calcularMulta(): number {
    return 0;
  }
}

export class PrestamoDigital extends Prestamo {
  calcularVencimiento(): Date | null {
    return null;
  }

  calcularMulta(): number {
    return 0;
  }
}

//tipos de prestamos que se pueden elegir
export enum TipoPrestamo {
  REGULAR = "regular",
  CORTO = "corto",
  REFERENCIA = "referencia",
  DIGITAL = "digital",
}

/** Duracion en dias de un prestamo */
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
  get nombreCompleto() { return `${this.nombre} ${this.apellido}`; }

  abstract getMaximoLibros(): number;

  retirar(libro: Libro, tipoPrestamo: TipoPrestamo = TipoPrestamo.REGULAR) {
    if (!this.puedeRetirar(libro)) {
      throw new Error("No tiene permisos para retirar este libro");
    }

    let prestamo: Prestamo;
    switch (tipoPrestamo) {
      case TipoPrestamo.CORTO:
        prestamo = new PrestamoCorto(libro);
        break;
      case TipoPrestamo.REFERENCIA:
        prestamo = new PrestamoReferencia(libro);
        break;
      case TipoPrestamo.DIGITAL:
        prestamo = new PrestamoDigital(libro);
        break;
      default:
        prestamo = new PrestamoRegular(libro);
        break;
    }

    this.prestamos.push(prestamo);
  }

  devolver(libro: Libro): Prestamo {
    const prestamo = this.tienePrestadoLibro(libro);
    if (!prestamo) {
      throw new Error("No esta prestado");
    }
    this.prestamos = this.prestamos.filter((p) => p !== prestamo);
    return prestamo;
  }

  tienePrestadoLibro(libro: Libro): Prestamo | null {
    return this.prestamos.find((p) => p.libro === libro) ?? null;
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

  devolver(libro: Libro): Prestamo {
    // Manejar potenciales multas
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
