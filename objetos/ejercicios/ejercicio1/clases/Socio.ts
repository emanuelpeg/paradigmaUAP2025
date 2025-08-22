import { Libro } from "./Libro";

class Prestamo {
  constructor(public libro: Libro, public vencimiento: Date) {}
}

/** Duracion en dias de un prestamo */
type Duracion = number;

export class Socio {
  private prestamos: Prestamo[] = [];

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

    return this.prestamos.find((p) => p.libro.isbn === libro.isbn) ?? null;
  }

  diasRetrasoLibro(libro: Libro): number {
  const hoy = new Date();
  const prestamo = this.prestamos.find(p => p.libro.isbn === libro.isbn);

  hoy.setDate(hoy.getDate() + 15); // aumento 15 dias para pasar los de 'duracion' que son 14

  if (!prestamo) return 0;

  if (hoy > prestamo.vencimiento) {
    const diferencia = hoy.getTime() - prestamo.vencimiento.getTime();
    return Math.ceil(diferencia / (1000 * 3600 * 24)); 
  }

  return 0;
}
}

