import { Libro } from "./Libro";

class Prestamo {
  constructor(public libro: Libro, public vencimiento: Date) {}
}

// Duracion en dias de un prestmo
type Duracion = number;

export class Socio {
  private _notificaciones: string[] = [];
 
  private _prestamos: Prestamo[] = [];
  private _historialLectura: Libro[] = [];


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
  set nombre(value: string) {
    this._nombre = value;
  }

  get apellido() {
    return this._apellido;
  }
  set apellido(value: string) {
    this._apellido = value;
  }

  get nombreCompleto() {
    return `${this.nombre} ${this.apellido}`;
  }
  public get prestamos(): Prestamo[] {
    return [...this._prestamos];
  }
  public get historial(): Libro[] {
    return [...this._historialLectura];
  }
  public get notificaciones(): string[] {
    return [...this._notificaciones];
  }


  
  public notificar(mensaje: string): void {
    this._notificaciones.push(mensaje);
  }
  retirar(libro: Libro, duracion: Duracion) {
    const vencimiento = new Date();
    vencimiento.setDate(vencimiento.getDate() + duracion);
  this._prestamos.push(new Prestamo(libro, vencimiento));
  }

  devolver(libro: Libro) {
    const prestamo = this.tienePrestadoLibro(libro);

    if (!prestamo) {
      throw new Error("No esta prestado");
    }

  const indice = this._prestamos.indexOf(prestamo);
  this._prestamos.splice(indice, 1);

  this._historialLectura.push(prestamo.libro);
  return prestamo;
  }

  tienePrestadoLibro(libro: Libro): Prestamo | null {
  return this._prestamos.find((p) => p.libro === libro) ?? null;
  }
  
}
