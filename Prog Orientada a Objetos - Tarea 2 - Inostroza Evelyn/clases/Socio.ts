import { Prestamo } from "./Prestamo";
import { Libro } from "./Libro";

export class Socio {
  private prestamos: Prestamo[] = [];
  private historialLectura: Libro[] = [];

  constructor(private _id: number, private _nombre: string, private _apellido: string) {}

  get id() { return this._id; }
  get nombre() { return this._nombre; }
  get apellido() { return this._apellido; }
  get nombreCompleto() { return `${this.nombre} ${this.apellido}`; }

  retirar(prestamo: Prestamo) {
    this.prestamos.push(prestamo);
  }

  devolver(libro: Libro): Prestamo {
    const prestamo = this.prestamos.find(p => p.libro === libro);
    if (!prestamo) throw new Error("No está prestado");
    this.prestamos.splice(this.prestamos.indexOf(prestamo), 1);
    if (!this.historialLectura.includes(libro)) this.historialLectura.push(libro);
    return prestamo;
  }

  tienePrestadoLibro(libro: Libro): Prestamo | null {
    return this.prestamos.find(p => p.libro === libro) ?? null;
  }

  get historial(): readonly Libro[] { return this.historialLectura; }
  get prestamosActivos(): readonly Prestamo[] { return this.prestamos; }
}

export class SocioRegular extends Socio {
  private static MAX_LIBROS = 3;
  override retirar(prestamo: Prestamo) {
    if (this.prestamosActivos.length >= SocioRegular.MAX_LIBROS)
      throw new Error("Máximo de libros alcanzado (Regular)");
    super.retirar(prestamo);
  }
}

export class SocioVIP extends Socio {
  private static MAX_LIBROS = 5;
  override retirar(prestamo: Prestamo) {
    if (this.prestamosActivos.length >= SocioVIP.MAX_LIBROS)
      throw new Error("Máximo de libros alcanzado (VIP)");
    super.retirar(prestamo);
  }
}

export class Empleado extends Socio {
  override retirar(prestamo: Prestamo) { super.retirar(prestamo); }
}

export class Visitante extends Socio {
  override retirar(_prestamo: Prestamo) { throw new Error("El visitante no puede retirar libros"); }
}
