import { Libro } from "./Libro";
import { Prestamo } from "./Libro";
/** Duracion en dias de un prestamo */


export class Notificacion {
  constructor(public mensaje: string, public fecha: Date = new Date()) {}
}

export class Socio {
  private multas: Prestamo[] = [];
  private notificaciones: Notificacion[] = [];
  private historialLectura: Libro[] = [];
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

  pagarMulta(): boolean {
    if (this.verificarMultas()) {
      this.multas = [];
      return true;
    }
    return false;
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
}