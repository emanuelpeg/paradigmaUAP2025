import { Libro } from "./Libro";

/** Duracion en dias de un prestamo */
type Duracion = number;

export abstract class Socio {
  protected prestamos: Prestamo[] = [];
  protected multasPendientes: number = 0;
  protected historialLectura: Libro[] = [];
  protected reservas: Libro[] = [];
  /** Devuelve la lista de préstamos activos */
  public getPrestamos(): Prestamo[] {
    return [...this.prestamos];
  }

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

  retirar(libro: Libro, tipo: "regular"|"corto"|"referencia"|"digital" = "regular") {
    if (!this.puedeRetirar(libro)) {
      throw new Error("No tiene permisos para retirar este libro");
    }
    if (this.deuda > 0) {
      throw new Error("No puede retirar libros con multas pendientes");
    }
    let prestamo: Prestamo;
    switch (tipo) {
      case "regular": prestamo = new PrestamoRegular(libro, this); break;
      case "corto": prestamo = new PrestamoCorto(libro, this); break;
      case "referencia": prestamo = new PrestamoReferencia(libro, this); break;
      case "digital": prestamo = new PrestamoDigital(libro, this); break;
      default: prestamo = new PrestamoRegular(libro, this);
    }
    this.prestamos.push(prestamo);
  }

  devolver(libro: Libro) {
    const prestamo = this.tienePrestadoLibro(libro);
    if (!prestamo) {
      throw new Error("No esta prestado");
    }
    const hoy = new Date();
    if (prestamo.vencimiento && hoy > prestamo.vencimiento) {
      const msPorDia = 1000 * 60 * 60 * 24;
      const diasAtraso = Math.ceil((hoy.getTime() - prestamo.vencimiento.getTime()) / msPorDia);
      const multa = prestamo.calcularMulta(diasAtraso);
      this.registrarMulta(multa);
    }
    const indice = this.prestamos.indexOf(prestamo);
    this.prestamos.splice(indice, 1);
    this.historialLectura.push(libro);
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

  registrarMulta(monto: number) {
    this.multasPendientes += monto;
  }

  pagarMulta(monto: number) {
    this.multasPendientes = Math.max(0, this.multasPendientes - monto);
  }

  agregarReserva(libro: Libro) {
    this.reservas.push(libro);
  }

  obtenerHistorialLectura(): Libro[] {
    return [...this.historialLectura];
  }

  recomendacionesSimples(): string[] {
    const autores = new Set(this.historialLectura.map((l) => l.autor.nombre ?? l.autor));
    return Array.from(autores).map((a) => `Buscar más libros del autor: ${a}`);
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

// Polimorfismo: Tipos de Préstamo
export abstract class Prestamo {
  constructor(public libro: Libro, public socio: Socio) {}
  abstract get vencimiento(): Date | null;
  abstract calcularMulta(diasAtraso: number): number;
}

export class PrestamoRegular extends Prestamo {
  get vencimiento(): Date {
    const vencimiento = new Date();
    vencimiento.setDate(vencimiento.getDate() + 14);
    return vencimiento;
  }
  calcularMulta(diasAtraso: number): number {
    return diasAtraso * 50;
  }
}

export class PrestamoCorto extends Prestamo {
  get vencimiento(): Date {
    const vencimiento = new Date();
    vencimiento.setDate(vencimiento.getDate() + 7);
    return vencimiento;
  }
  calcularMulta(diasAtraso: number): number {
    return diasAtraso * 100;
  }
}

export class PrestamoReferencia extends Prestamo {
  get vencimiento(): null {
    return null; // Solo consulta en sala
  }
  calcularMulta(): number {
    return 0;
  }
}

export class PrestamoDigital extends Prestamo {
  get vencimiento(): null {
    return null; // Sin límite
  }
  calcularMulta(): number {
    return 0;
  }
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
