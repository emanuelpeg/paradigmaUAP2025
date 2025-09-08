import { Libro } from "./Libro";
import { Transaccion, TransaccionEstandar } from "./prestamo";

type DuracionPrestamo = number;

export abstract class Socio {
  protected historialTransacciones: Transaccion[] = [];

  constructor(
    private _codigo: number,
    private _nombre: string,
    private _apellido: string
  ) { }

  get codigo() {
    return this._codigo;
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

  abstract getDuracionMaximaPrestamo(): DuracionPrestamo;
  abstract getCantidadMaximaLibros(): number;

  retirar(libro: Libro) {
    const transaccion = new TransaccionEstandar(libro, new Date());
    if (!this.puedeRetirar(libro) || !transaccion.esPrestable()) {
      throw new Error("No tiene permisos para retirar este libro");
    }
    this.historialTransacciones.push(transaccion);
  }

  devolver(libro: Libro) {
    const transaccion = this.tieneLibroPrestado(libro);

    if (!transaccion) {
      throw new Error("No esta prestado");
    }

    const multa = transaccion.calcularMontoRetraso();
    if (multa > 0) {
      console.log(`Debe pagar un monto por retraso de: $${multa}`);
    }

    const indice = this.historialTransacciones.indexOf(transaccion);
    this.historialTransacciones.splice(indice, 1);
    return transaccion;
  }

  tieneLibroPrestado(libro: Libro): Transaccion | null {
    return this.historialTransacciones.find((t) => t.libro === libro) ?? null;
  }

  get librosEnPrestamo() {
    return this.historialTransacciones.length;
  }

  puedeRetirar(libro: Libro): boolean {
    return this.historialTransacciones.length < this.getCantidadMaximaLibros();
  }

  tieneLibrosVencidos(): boolean {
    return this.historialTransacciones.some((t) => t.calcularMontoRetraso() > 0);
  }
}

export class SocioRegular extends Socio {
  getDuracionMaximaPrestamo(): DuracionPrestamo {
    return 14;
  }

  getCantidadMaximaLibros(): number {
    return 3;
  }
}

export class SocioVIP extends Socio {
  getDuracionMaximaPrestamo(): DuracionPrestamo {
    return 21;
  }

  getCantidadMaximaLibros(): number {
    return 5;
  }

  devolver(libro: Libro) {
    const transaccion = this.tieneLibroPrestado(libro);
    if (!transaccion) {
      throw new Error("No esta prestado");
    }
    const indice = this.historialTransacciones.indexOf(transaccion);
    this.historialTransacciones.splice(indice, 1);
    return transaccion;
  }
}

export class Empleado extends Socio {
  getDuracionMaximaPrestamo(): DuracionPrestamo {
    return 30;
  }

  getCantidadMaximaLibros(): number {
    return Infinity;
  }
}

export class Visitante extends Socio {
  puedeRetirar(libro: Libro): boolean {
    return false;
  }

  getDuracionMaximaPrestamo(): DuracionPrestamo {
    return 0;
  }

  getCantidadMaximaLibros(): number {
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
    codigo: number,
    nombre: string,
    apellido: string
  ): Socio {
    switch (tipo) {
      case TipoSocio.REGULAR:
        return new SocioRegular(codigo, nombre, apellido);
      case TipoSocio.VIP:
        return new SocioVIP(codigo, nombre, apellido);
      case TipoSocio.EMPLEADO:
        return new Empleado(codigo, nombre, apellido);
      case TipoSocio.VISITANTE:
        return new Visitante(codigo, nombre, apellido);
      default:
        throw new Error("Tipo de socio no valido");
    }
  }
}