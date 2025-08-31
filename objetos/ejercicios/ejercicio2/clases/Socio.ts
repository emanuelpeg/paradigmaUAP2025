import { Libro } from "./Libro";
import { 
  Prestamo, 
  TipoPrestamo, 
  PrestamoCorto, 
  PrestamoDigital, 
  PrestamoReferencia, 
  PrestamoRegular 
} from "./Prestamo";

/** Duracion en dias de un prestamo */
type Duracion = number;

export abstract class Socio {
  protected prestamos: Prestamo[] = [];
  protected deuda: number = 0;
  protected _historialLectura: Libro[] = [];

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

  get historialLectura(): Libro[] {
    return this._historialLectura;
  }

  get deudaTotal(): number {
    return this.deuda;
  }

  abstract getDuracionPrestamo(): Duracion;
  abstract getMaximoLibros(): number;

  retirar(libro: Libro, tipoDePrestamo: TipoPrestamo) {
    if (!this.puedeRetirar(libro)) {
      throw new Error("No puede retirar más libros");
    }

    let nuevoPrestamo: Prestamo;
    switch (tipoDePrestamo) {
      case TipoPrestamo.REGULAR:
        nuevoPrestamo = new PrestamoRegular(libro);
        break;
      case TipoPrestamo.CORTO:
        nuevoPrestamo = new PrestamoCorto(libro);
        break;
      case TipoPrestamo.REFERENCIA:
        nuevoPrestamo = new PrestamoReferencia(libro);
        break;
      case TipoPrestamo.DIGITAL:
        nuevoPrestamo = new PrestamoDigital(libro);
        break;
      default:
        throw new Error("Tipo de préstamo no válido");
    }

    this.prestamos.push(nuevoPrestamo);
  }

  devolver(libro: Libro): void {
    const prestamo = this.tienePrestadoLibro(libro);

    if (!prestamo) {
      throw new Error("El libro no está prestado");
    }

    const hoy = new Date();
    const vencimiento = prestamo.calcularVencimiento();

    if (hoy > vencimiento) {
      const diferenciaMs = hoy.getTime() - vencimiento.getTime();
      const diasDeRetraso = Math.ceil(diferenciaMs / (1000 * 60 * 60 * 24));
      const multa = prestamo.calcularMulta(diasDeRetraso);

      if (multa > 0) {
        this.deuda += multa;
        console.log(
          `Multa por retraso: $${multa}. Deuda total: $${this.deuda}`
        );
      }
    }

    // Agregar al historial si no está
    if (!this._historialLectura.includes(libro)) {
      this._historialLectura.push(libro);
    }

    // Eliminar el préstamo
    const indice = this.prestamos.indexOf(prestamo);
    this.prestamos.splice(indice, 1);
  }

  tienePrestadoLibro(libro: Libro): Prestamo | null {
    return this.prestamos.find((p) => p.getLibro() === libro) ?? null;
  }

  get librosEnPrestamo(): number {
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
        throw new Error("Tipo de socio no válido");
    }
  }
}