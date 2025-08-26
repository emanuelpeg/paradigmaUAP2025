import { Libro } from "./Libro";

class Prestamo {
  constructor(public libro: Libro, public vencimiento: Date) {}
}

/** Duracion en dias de un prestamo */
type Duracion = number;

export class Socio {
  private prestamos: Prestamo[] = [];
  private historial: Libro[] = []; // ✅ Nuevo: historial de lectura
  private multa: number = 0;
  private notificaciones: string[] = [];

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

  get deuda() {
    return this.multa;
  }

  retirar(libro: Libro, duracion: Duracion) {
    if (this.multa > 0) {
      throw new Error(
        `El socio ${this.nombreCompleto} tiene una deuda de $${this.multa} y no puede retirar libros.`
      );
    }
    const vencimiento = new Date();
    vencimiento.setDate(vencimiento.getDate() + duracion);
    this.prestamos.push(new Prestamo(libro, vencimiento));
  }

  devolver(libro: Libro) {
    const prestamo = this.tienePrestadoLibro(libro);

    if (!prestamo) {
      throw new Error("No está prestado");
    }

    const hoy = new Date();
    if (hoy > prestamo.vencimiento) {
      const diasAtraso =
        (hoy.getTime() - prestamo.vencimiento.getTime()) /
        (1000 * 60 * 60 * 24);
      const multa = diasAtraso * 50;
      this.multa += multa;

      this.recibirNotificacion(
        `Devolviste el libro "${prestamo.libro.titulo}" con retraso. Multa generada: $${multa.toFixed(
          2
        )}. Deuda total: $${this.multa.toFixed(2)}.`
      );
    }

    // ✅ Guardamos el libro en historial de lectura
    this.historial.push(prestamo.libro);

    const indice = this.prestamos.findIndex(
      (p) => p.libro.isbn === libro.isbn
    );
    if (indice === -1)
      throw new Error("No se encontró el préstamo a eliminar");
    this.prestamos.splice(indice, 1);

    return prestamo;
  }

  tienePrestadoLibro(libro: Libro): Prestamo | null {
    return this.prestamos.find((p) => p.libro.isbn === libro.isbn) ?? null;
  }

  pagarMulta() {
    console.log(
      `✅ ${this.nombreCompleto} pagó su deuda de $${this.multa}.`
    );
    this.multa = 0;
  }

  recibirNotificacion(mensaje: string) {
    this.notificaciones.push(mensaje);
    console.log(`🔔 Notificación para ${this.nombreCompleto}: ${mensaje}`);
  }

  mostrarNotificaciones() {
    console.log(`📬 Notificaciones de ${this.nombreCompleto}:`);
    this.notificaciones.forEach((n) => console.log("- " + n));
  }

  // ✅ Nuevo: ver historial
  getHistorial(): Libro[] {
    return this.historial;
  }

  // ✅ Nuevo: recomendar libros según historial
  recomendar(inventario: Libro[]): Libro[] {
    if (this.historial.length === 0) return [];

    const recomendaciones: Libro[] = [];

    for (const leido of this.historial) {
      for (const libro of inventario) {
        if (
          libro.isbn !== leido.isbn &&
          !this.historial.includes(libro) &&
          (libro.autor === leido.autor || // mismo autor
            libro.titulo.includes(leido.titulo.split(" ")[0])) // título parecido
        ) {
          if (!recomendaciones.includes(libro)) {
            recomendaciones.push(libro);
          }
        }
      }
    }

    return recomendaciones;
  }
}
