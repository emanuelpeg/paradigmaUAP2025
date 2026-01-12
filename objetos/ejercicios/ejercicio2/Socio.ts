
import { Libro } from "./Libro";
import {
  Prestamo,
  PrestamoRegular,
  PrestamoCorto,
  PrestamoReferencia,
  PrestamoDigital
} from "./Prestamo";

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

  abstract getDuracionPrestamo(): Duracion;
  abstract getMaximoLibros(): number;

  /**
   * Retira un libro, eligiendo el tipo de préstamo adecuado.
   * Por defecto, cada tipo de socio define su tipo de préstamo preferido.
   * Se puede sobreescribir en subclases para lógica especial.
   */
  retirar(libro: Libro, tipoPrestamo?: "regular" | "corto" | "referencia" | "digital") {
    if (!this.puedeRetirar(libro)) {
      throw new Error("No tiene permisos para retirar este libro");
    }
    const fechaInicio = new Date();
    let prestamo: Prestamo;
    switch (tipoPrestamo) {
      case "corto":
        prestamo = new PrestamoCorto(libro, fechaInicio);
        break;
      case "referencia":
        prestamo = new PrestamoReferencia(libro, fechaInicio);
        break;
      case "digital":
        prestamo = new PrestamoDigital(libro, fechaInicio);
        break;
      case "regular":
      default:
        prestamo = new PrestamoRegular(libro, fechaInicio);
        break;
    }
    this.prestamos.push(prestamo);
  }

  devolver(libro: Libro, fechaDevolucion: Date = new Date()) {
    const prestamo = this.tienePrestadoLibro(libro);
    if (!prestamo) {
      throw new Error("No esta prestado");
    }
    const indice = this.prestamos.indexOf(prestamo);
    this.prestamos.splice(indice, 1);
    // Calcular multa usando polimorfismo
    const multa = prestamo.calcularMulta(fechaDevolucion);
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

  // Por defecto, préstamo regular
  retirar(libro: Libro, tipoPrestamo?: "regular" | "corto" | "referencia" | "digital") {
    super.retirar(libro, tipoPrestamo ?? "regular");
  }
}

export class SocioVIP extends Socio {
  getDuracionPrestamo(): Duracion {
    return 21;
  }

  getMaximoLibros(): number {
    return 5;
  }

  // Puede elegir entre regular o corto
  retirar(libro: Libro, tipoPrestamo?: "regular" | "corto" | "referencia" | "digital") {
    super.retirar(libro, tipoPrestamo ?? "regular");
  }
}

export class Empleado extends Socio {
  getDuracionPrestamo(): Duracion {
    return 30;
  }

  getMaximoLibros(): number {
    return Infinity;
  }

  // Puede elegir cualquier tipo
  retirar(libro: Libro, tipoPrestamo?: "regular" | "corto" | "referencia" | "digital") {
    super.retirar(libro, tipoPrestamo);
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

  // Solo préstamo de referencia
  retirar(libro: Libro, tipoPrestamo?: "referencia") {
    if (tipoPrestamo !== "referencia") {
      throw new Error("El visitante solo puede consultar en sala");
    }
    super.retirar(libro, "referencia");
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