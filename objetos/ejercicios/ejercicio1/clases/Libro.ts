import { Autor } from "./Autor";

export class Libro {
  private reservas: number[] = []; // IDs de socios en la cola de reservas

  constructor(
    private _titulo: string,
    private _autor: Autor,
    private _isbn: string
  ) {}

  get titulo() {
    return this._titulo;
  }
  get autor() {
    return this._autor;
  }
  get isbn() {
    return this._isbn;
  }

  agregarReserva(socioId: number) {
    if (!this.reservas.includes(socioId)) {
      this.reservas.push(socioId);
    }
  }

  quitarReserva(): number | undefined {
    return this.reservas.shift();
  }

  tieneReservas(): boolean {
    return this.reservas.length > 0;
  }

  primerReserva(): number | undefined {
    return this.reservas[0];
  }
}
