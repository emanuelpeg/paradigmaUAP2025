import { Libro } from "./Libro";
import {Prestamo, TipoPrestamo, PrestamoFactory} from "./Prestamo";
import { IPoliticaPrestamo } from "../Interface/IPoliticaPrestamo";
import { IUsuario } from "../Interface/IUsuario";

/** Duracion en dias de un prestamo */
type Duracion = number;

export abstract class Socio  implements IUsuario {
  protected prestamos: Prestamo[] = [];
  private duracionPrestamo: number = 14; // Valor por defecto: 14 días
  private renovacionesPermitidas: number = 1; // Valor por defecto: 1 


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
    // Implementación de los métodos de IUsuario

  tienePrestamosVencidos(): boolean {
    return this.prestamos.some(prestamo => prestamo.estaVencido());
  }

  setDuracionPrestamo(dias: number): void {
    this.duracionPrestamo = dias;
    console.log(`⏰ Duración de préstamo establecida a ${dias} días`);
  }

  setRenovacionesPermitidas(veces: number): void {
    this.renovacionesPermitidas = veces;
    console.log(` Renovaciones permitidas: ${veces}`);
  }

  getRenovacionesPermitidas(): number {
    return this.renovacionesPermitidas;
  }
  // Métodos abstractos que deben ser implementados por las subclases

  abstract getDuracionPrestamo(): Duracion;
  abstract getMaximoLibros(): number;

  // Métodos para retirar libros| lo ideal es crear un metodo general que permita seleccionar tipo de prestamo y a partir de el aplicar una unica funcino general-- no lo hice por cuestion de tiempo.

  
    retirarLibro(libro: Libro, tipoPrestamo: TipoPrestamo, politica: IPoliticaPrestamo): Prestamo {
        if (this.tienePrestadoLibro(libro)) {
            throw new Error("Ya tienes este libro prestado");
        }

        // Crear préstamo con factory y política
        const prestamo = PrestamoFactory.crearPrestamo(tipoPrestamo, libro, politica);
        this.prestamos.push(prestamo);
        
        return prestamo;
    }


  devolver(libro: Libro) {
    const prestamo = this.tienePrestadoLibro(libro);

    if (!prestamo) {
      throw new Error("No esta prestado");
    }

    const indice = this.prestamos.indexOf(prestamo);
    this.prestamos.splice(indice, 1);

    return prestamo;
  }

  tienePrestadoLibro(libro: Libro): Prestamo | null {
    return this.prestamos.find((p) => p.getLibro() === libro) ?? null;
  }

  get librosEnPrestamo() {
    return this.prestamos.length;
  }

  puedeRetirar(libro: Libro): boolean {
    return this.prestamos.length < this.getMaximoLibros();
  }
  getPrestamosVigentes(): Prestamo[] {
    return this.prestamos.filter(p => !p.estaVencido());
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

