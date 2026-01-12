import { Libro } from "./Libro";
import { Prestamo, PrestamoRegular, PrestamoCorto, PrestamoReferencia, PrestamoDigital } from "./Pestamo";


/** Duracion en dias de un prestamo */
type Duracion = number;

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
  get librosEnPrestamos() {
    return this.prestamos.map(prestamo => prestamo.libro);
  }
  get getPrestamos(): Prestamo[] {
    return this.prestamos;
  }

  

  abstract getDuracionPrestamo(): Duracion;
  abstract getMaximoLibros(): number;

  retirar(libro: Libro, tipo: "regular" | "corto" | "referencia" | "digital") {
    let prestamo: Prestamo;
    const fechaInicio = new Date();
    switch (tipo) {
      case "regular":
        prestamo = new PrestamoRegular(libro, fechaInicio);
        break;
      case "corto":
        prestamo = new PrestamoCorto(libro, fechaInicio);
        break;
      case "referencia":
        prestamo = new PrestamoReferencia(libro, fechaInicio);
        break;
      case "digital":
        prestamo = new PrestamoDigital(libro, fechaInicio);
        break;
      default:
        throw new Error("Tipo de préstamo no válido");
    }
    this.prestamos.push(prestamo);
  }

  devolver(libro: Libro, fechaDevolucion: Date = new Date()): number {
    const prestamo = this.tienePrestadoLibro(libro);
    if (!prestamo) throw new Error("No está prestado");
    const multa = prestamo.calcularMulta(fechaDevolucion);
    this.prestamos = this.prestamos.filter(p => p !== prestamo);
    return multa;
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

  devolver(libro: Libro, fechaDevolucion: Date = new Date()): number {
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
  get librosEnPrestamos() {
  return this.prestamos.map(prestamo => prestamo.libro);
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
