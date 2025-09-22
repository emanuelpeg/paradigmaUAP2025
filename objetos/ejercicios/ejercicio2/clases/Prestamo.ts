import { Libro } from "./Libro";

// Clase base abstracta para préstamos
export abstract class Prestamo {
  protected fechaInicio: Date;
  protected fechaVencimiento: Date;

  constructor(
    protected libro: Libro,
    protected socioId: number
  ) {
    this.fechaInicio = new Date();
    this.fechaVencimiento = this.calcularVencimiento();
  }

  // Métodos abstractos que deben implementar las subclases
  public abstract calcularVencimiento(): Date;
  public abstract calcularMulta(): number;
  public abstract puedeSerLlevado(): boolean;

  // Métodos comunes
  public getLibro(): Libro {
    return this.libro;
  }

  public getSocioId(): number {
    return this.socioId;
  }

  public getFechaVencimiento(): Date {
    return this.fechaVencimiento;
  }

  public estaVencido(): boolean {
    return new Date() > this.fechaVencimiento;
  }

  public getDiasVencido(): number {
    if (!this.estaVencido()) return 0;
    const diferencia = new Date().getTime() - this.fechaVencimiento.getTime();
    return Math.ceil(diferencia / (1000 * 60 * 60 * 24));
  }
}

// Préstamo regular: 14 días, multa estándar
export class PrestamoRegular extends Prestamo {
  private static readonly DIAS_PRESTAMO = 14;
  private static readonly MULTA_POR_DIA = 50;

  public calcularVencimiento(): Date {
    const vencimiento = new Date(this.fechaInicio);
    vencimiento.setDate(vencimiento.getDate() + PrestamoRegular.DIAS_PRESTAMO);
    return vencimiento;
  }

  public calcularMulta(): number {
    return this.getDiasVencido() * PrestamoRegular.MULTA_POR_DIA;
  }

  public puedeSerLlevado(): boolean {
    return true;
  }
}

// Préstamo corto: 7 días, multa doble
export class PrestamoCorto extends Prestamo {
  private static readonly DIAS_PRESTAMO = 7;
  private static readonly MULTA_POR_DIA = 100;

  public calcularVencimiento(): Date {
    const vencimiento = new Date(this.fechaInicio);
    vencimiento.setDate(vencimiento.getDate() + PrestamoCorto.DIAS_PRESTAMO);
    return vencimiento;
  }

  public calcularMulta(): number {
    return this.getDiasVencido() * PrestamoCorto.MULTA_POR_DIA;
  }

  public puedeSerLlevado(): boolean {
    return true;
  }
}

// Préstamo de referencia: Solo consulta en biblioteca
export class PrestamoReferencia extends Prestamo {
  public calcularVencimiento(): Date {
    // Vence al final del día
    const vencimiento = new Date(this.fechaInicio);
    vencimiento.setHours(23, 59, 59, 999);
    return vencimiento;
  }

  public calcularMulta(): number {
    // No hay multa para libros de referencia
    return 0;
  }

  public puedeSerLlevado(): boolean {
    return false;
  }
}

// Préstamo digital: Sin límite de tiempo, sin multa
export class PrestamoDigital extends Prestamo {
  public calcularVencimiento(): Date {
    // Sin límite de tiempo - vencimiento muy lejano
    const vencimiento = new Date(this.fechaInicio);
    vencimiento.setFullYear(vencimiento.getFullYear() + 10);
    return vencimiento;
  }

  public calcularMulta(): number {
    return 0;
  }

  public puedeSerLlevado(): boolean {
    return true;
  }

  public estaVencido(): boolean {
    // Los préstamos digitales nunca vencen
    return false;
  }
}

// Factory para crear préstamos
export enum TipoPrestamo {
  REGULAR = "regular",
  CORTO = "corto",
  REFERENCIA = "referencia",
  DIGITAL = "digital"
}

export class PrestamoFactory {
  public static crearPrestamo(
    tipo: TipoPrestamo,
    libro: Libro,
    socioId: number
  ): Prestamo {
    switch (tipo) {
      case TipoPrestamo.REGULAR:
        return new PrestamoRegular(libro, socioId);
      case TipoPrestamo.CORTO:
        return new PrestamoCorto(libro, socioId);
      case TipoPrestamo.REFERENCIA:
        return new PrestamoReferencia(libro, socioId);
      case TipoPrestamo.DIGITAL:
        return new PrestamoDigital(libro, socioId);
      default:
        throw new Error("Tipo de préstamo no válido");
    }
  }
}
