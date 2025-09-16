import { Libro } from "./Libro";

class Prestamo {
  constructor(public libro: Libro, public vencimiento: Date) {}
}

 /**Duración en días de un préstamo */
type Duracion = number;

export class Socio {
  private prestamos: Prestamo[] = [];

  // Multas
  private _multasPendientes = 0;

  // Notificaciones
  private _inbox: string[] = [];

  // Historial de lectura 
  private _historial: string[] = [];

  constructor(
    private _id: number,
    private _nombre: string,
    private _apellido: string
  ) {}

  get id() { return this._id; }
  get nombre() { return this._nombre; }
  get apellido() { return this._apellido; }
  get nombreCompleto() { return `${this.nombre} ${this.apellido}`; }

  // Multas
  get multasPendientes() { return this._multasPendientes; }
  get puedePrestar() { return this._multasPendientes === 0; }
  pagarMulta(monto: number) { this._multasPendientes = Math.max(0, this._multasPendientes - monto); }
  sumarMulta(monto: number) { this._multasPendientes += monto; }

  // Notificaciones
  get inbox() { return this._inbox; }
  notificar(mensaje: string) { this._inbox.push(mensaje); }

  // Historial
  get historial() { return this._historial; }
  registrarLectura(isbn: string) {
    if (!this._historial.includes(isbn)) this._historial.push(isbn);
  }

  // Préstamos
  retirar(libro: Libro, duracion: Duracion) {
    const vencimiento = new Date();
    vencimiento.setDate(vencimiento.getDate() + duracion);
    this.prestamos.push(new Prestamo(libro, vencimiento));
  }

  devolver(libro: Libro) {
    const prestamo = this.tienePrestadoLibro(libro);
    if (!prestamo) throw new Error("No está prestado");
    const indice = this.prestamos.indexOf(prestamo);
    this.prestamos.splice(indice, 1);
    return prestamo; // devolvemos el préstamo para conocer vencimiento
  }

  tienePrestadoLibro(libro: Libro): Prestamo | null {
    return this.prestamos.find((p) => p.libro === libro) ?? null;
  }

  
  prestamosActivos(): ReadonlyArray<{ libro: Libro; vencimiento: Date }> {
    return this.prestamos.map(p => ({ libro: p.libro, vencimiento: p.vencimiento }));
  }
}
