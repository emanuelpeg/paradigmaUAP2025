import { Libro } from "./Libro";
/** Duracion en dias de un prestamo */


export class Notificacion {
  constructor(public mensaje: string, public fecha: Date = new Date()) {}
}

export class Socio {
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
}