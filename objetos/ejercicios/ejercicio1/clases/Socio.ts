import { Libro } from "./Libro";

class Prestamo {
  constructor(public libro: Libro, public vencimiento: Date) {}
}

/** Duracion en dias de un prestamo */
type Duracion = number;

export class Socio {
  private multas: number = 0;
  private historial: Libro[] = []; // Historial de lectura

  constructor(
    private _id: number,
    private _nombre: string,
    private _apellido: string,
    private prestamos: Prestamo[] = []
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
    return this.multas;
  }

  saldarDeuda() {
    this.multas = 0;
  }

  retirar(libro: Libro, duracion: Duracion) {
    if (this.deuda > 0) {
      throw new Error("No puede retirar libros hasta saldar su deuda.");
    }
    const vencimiento = new Date();
    vencimiento.setDate(vencimiento.getDate() + duracion);
    this.prestamos.push(new Prestamo(libro, vencimiento));
  }

  devolver(libro: Libro) {
    const prestamo = this.tienePrestadoLibro(libro);

    if (!prestamo) {
      throw new Error("No esta prestado");
    }

    // Calcular multa si está vencido
    const hoy = new Date();
    if (hoy > prestamo.vencimiento) {
      const diasAtraso = Math.ceil(
        (hoy.getTime() - prestamo.vencimiento.getTime()) / (1000 * 60 * 60 * 24)
      );
      this.multas += diasAtraso * 50;
    }

    const indice = this.prestamos.indexOf(prestamo);
    this.prestamos.splice(indice, 1);

    // Agregar al historial si no está ya
    if (!this.historial.includes(libro)) {
      this.historial.push(libro);
    }

    return prestamo;
  }

  tienePrestadoLibro(libro: Libro): Prestamo | null {
    return this.prestamos.find((p) => p.libro === libro) ?? null;
  }

  obtenerHistorial(): Libro[] {
    return this.historial;
  }

  recomendarLibros(todosLosLibros: Libro[]): Libro[] {
    // Recomienda libros del mismo autor o con títulos similares que no haya leído
    const autoresLeidos = this.historial.map(l => l.autor);
    const titulosLeidos = this.historial.map(l => l.titulo.toLowerCase());

    return todosLosLibros.filter(libro =>
      !this.historial.includes(libro) &&
      (
        autoresLeidos.includes(libro.autor) ||
        titulosLeidos.some(titulo => libro.titulo.toLowerCase().includes(titulo) || titulo.includes(libro.titulo.toLowerCase()))
      )
    );
  }

  notificar(mensaje: string) {
    // Aquí puedes cambiar por email, SMS, etc. Por ahora, consola:
    console.log(`Notificación para ${this.nombreCompleto}: ${mensaje}`);
  }
}
