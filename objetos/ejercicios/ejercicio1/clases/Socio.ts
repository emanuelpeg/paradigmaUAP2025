import { Libro } from "./Libro";

class Prestamo {
  constructor(public libro: Libro, public vencimiento: Date) {}
}

type Duracion = number;

export class Socio {
  private prestamos: Prestamo[] = [];
  private historial: Libro[] = [];
  private multas: number = 0;

  constructor(private _id: number, private _nombre: string, private _apellido: string) {}

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
    return this.multas;
  }

  pagar(monto: number) {
    this.multas = Math.max(0, this.multas - monto);
  }

  retirar(libro: Libro, duracion: Duracion) {
    if (this.multas > 0) throw new Error("Socio tiene multas pendientes");
    const vencimiento = new Date();
    vencimiento.setDate(vencimiento.getDate() + duracion);
    this.prestamos.push(new Prestamo(libro, vencimiento));
    this.historial.push(libro);
  }

  retirarConVencimiento(libro: Libro, vencimiento: Date) {
    this.prestamos.push(new Prestamo(libro, vencimiento));
    this.historial.push(libro);
  }

  devolver(libro: Libro) {
    const prestamo = this.tienePrestadoLibro(libro);

    if (!prestamo) {
      throw new Error("No esta prestado");
    }

    const hoy = new Date();
    if (hoy > prestamo.vencimiento) {
      const diasAtraso = Math.ceil((hoy.getTime() - prestamo.vencimiento.getTime()) / (1000 * 60 * 60 * 24));
      this.multas += diasAtraso * 50;
    }

    const indice = this.prestamos.indexOf(prestamo);
    this.prestamos.splice(indice, 1);

    return prestamo;
  }

  tienePrestadoLibro(libro: Libro): Prestamo | null {
    return this.prestamos.find((p) => p.libro === libro) ?? null;
  }

  historialLectura() {
    return this.historial.map((l) => l.titulo);
  }

  recomendar(bibliotecaLibros: Libro[]) {
    const autoresLeidos = new Set(this.historial.map((l) => l.autor.nombre));
    return bibliotecaLibros.filter((l) => autoresLeidos.has(l.autor.nombre));
  }
}
