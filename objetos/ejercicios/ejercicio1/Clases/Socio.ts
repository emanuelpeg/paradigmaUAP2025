import { Libro } from "./Libro";

class Prestamo {
    constructor(public libro: Libro, public vencimiento: Date) {}
}

type Duracion = number;

export class Socio {
    private prestamos: Prestamo[] = [];

    constructor(private _id: number, private _nombre: string, private _apellido: string) {}

    get id(): number {
        return this._id;
    }

    get nombre(): string {
        return this._nombre;
    }

    get apellido(): string {
        return this._apellido;
    }

    get nombreCompleto(): string {
        return `${this._nombre} ${this._apellido}`;
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
}