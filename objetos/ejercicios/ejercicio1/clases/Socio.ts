import { Libro } from "./Libro";

class Prestamo {
  constructor(public libro: Libro, public vencimiento: Date) {}
}
export class Mensaje {
  constructor(public contenido: string, public fecha: Date) {}
}

/** Duracion en dias de un prestamo */
type Duracion = number;

export class Socio {
  private prestamos: Prestamo[] = [];
  private buzonEntrada: Mensaje[] = [];
  private historial: Libro[] = [];
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
  get getMensajes() {
    return this.buzonEntrada;
  }
  set setMensajes(mensajes: Mensaje[]) {
    this.buzonEntrada = mensajes;
  }

  set setHistorial(libro: Libro){
    const his = this.historial
    his.push(libro);
    this.historial = his
  }

  retirar(libro: Libro, duracion: Duracion) {
    const vencimiento = new Date();
    vencimiento.setDate(vencimiento.getDate() + duracion);
    this.prestamos.push(new Prestamo(libro, vencimiento));
  }

  devolver(libro: Libro) {
    const prestamo = this.tienePrestadoLibro(libro);

    if (!prestamo) {
      throw new Error("No esta prestado");
    }

    const indice = this.prestamos.indexOf(prestamo);
    // Eliminar el elemento en el indice
    this.prestamos.splice(indice, 1);

    return prestamo;
  }

  tienePrestadoLibro(libro: Libro): Prestamo | null {
    return this.prestamos.find((p) => p.libro === libro) ?? null;
  }
  calcularMulta(): number {
    let total = 0;
    const fechaActual: Date = new Date();
    for (const prestamo of this.prestamos) {
      if (prestamo.vencimiento < fechaActual) {
        const diasAtraso = Math.ceil(
          (fechaActual.getTime() - prestamo.vencimiento.getTime()) /
            (1000 * 60 * 60 * 24)
        );
        total += diasAtraso * 50; // Suponiendo una multa de 50 por dia de atraso
      }
    }
    return total;
  }
}

