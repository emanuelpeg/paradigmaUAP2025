import { biblioteca } from "./Biblioteca";
import { Libro } from "./Libro";
import { TipoPrestamo } from "./Prestamo";
/** Duracion en dias de un prestamo */


export class Notificacion {
  constructor(public mensaje: string, public fecha: Date = new Date()) {}
}

export abstract class Socio {
  private multas: number[] = [];
  private notificaciones: Notificacion[] = [];
  private historialLectura: Libro[] = [];
  
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

  verificarMultas(): boolean {
    return this.multas.length > 0;
  }

  agregarMulta(monto: number): void {
    this.multas.push(monto);
  }

  pagarMulta(): boolean {
    if (this.verificarMultas()) {
      this.multas = [];
      this.agregarNotificacion("Has pagado todas tus multas pendientes.");
      return true;
    }
    return false;
  }

  obtenerTotalMultas(): number {
    return this.multas.reduce((total, multa) => total + multa, 0);
  }

  agregarNotificacion(mensaje: string) {
    this.notificaciones.push(new Notificacion(mensaje));
  }

  obtenerNotificaciones(): Notificacion[] {
    return this.notificaciones;
  }

  limpiarNotificaciones() {
    this.notificaciones = [];
  }

  agregarLibroAlHistorial(libro: Libro) {
    if (!this.historialLectura.includes(libro)) {
      this.historialLectura.push(libro);
    }
  }

  obtenerHistorialLectura(): Libro[] {
    return this.historialLectura;
  }

  recomendarLibros(inventario: Libro[]): Libro[] {
    // Recomienda libros por autor o título similar
    const leidos = this.historialLectura;
    const autoresLeidos = leidos.map(l => l.autor);
    const titulosLeidos = leidos.map(l => l.titulo.toLowerCase());
    return inventario.filter(libro =>
      !leidos.includes(libro) && (
        autoresLeidos.includes(libro.autor) ||
        titulosLeidos.some(titulo => libro.titulo.toLowerCase().includes(titulo))
      )
    );
  }

  cantidadDeLibrosPrestados(libros: Libro[]): number {
    return libros.filter(libro => libro.tienePrestadoLibro(this)).length;
  }

  abstract cantidadDeLibrosAPrestar(): number | null;

  abstract duracionDePrestamo(): number;

  abstract puedeRetirar(): boolean;

  abstract tipoDePrestamoPara(libro: Libro): TipoPrestamo;

  aplicaMulta(): boolean {
    return true;
  }
}

export class SocioRegular extends Socio {
  puedeRetirar(): boolean {
    return true;
  }

  cantidadDeLibrosAPrestar(): number | null {
    return 3;
  }

  duracionDePrestamo(): number {
    return biblioteca.obtenerDuracion();
  }

  tipoDePrestamoPara(_libro: Libro): TipoPrestamo {
    // Por simplicidad, devolvemos Regular por defecto; podrías variar según reglas.
    return TipoPrestamo.Regular;
  }
}

export class SocioVip extends Socio {
  puedeRetirar(): boolean {
    return true;
  }

  cantidadDeLibrosAPrestar(): number | null{
    return 5;
  }

  duracionDePrestamo(): number {
    return biblioteca.obtenerDuracion() + 7; // 7 días adicionales
  }

  tipoDePrestamoPara(_libro: Libro): TipoPrestamo {
    return TipoPrestamo.Regular;
  }

  aplicaMulta(): boolean {
    return false;
  }
}

export class Empleado extends Socio {
  puedeRetirar(): boolean {
    return true;
  }

  cantidadDeLibrosAPrestar(): number | null{
    return null;
  }

  duracionDePrestamo(): number {
    return biblioteca.obtenerDuracion() + 14; 
  }

  tipoDePrestamoPara(libro: Libro): TipoPrestamo {
    return TipoPrestamo.Referencia;
  }
}

export class Invitado extends Socio {
  puedeRetirar(): boolean {
    return false;
  }

  cantidadDeLibrosAPrestar(): number | null{
    return 0;
  }

  duracionDePrestamo(): number {
    return 0;
  }

  tipoDePrestamoPara(_libro: Libro): TipoPrestamo {
    return TipoPrestamo.Referencia; 
  }
}