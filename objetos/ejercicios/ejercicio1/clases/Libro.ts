import { Autor } from "./Autor";

export class Libro {
  private reservas: number[] = [];

  constructor(
    private _titulo: string,
    private _autor: string,
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

  reservar(socioId: number) {
    if (!this.reservas.includes(socioId)) this.reservas.push(socioId);
  }

  cancelarReserva(socioId: number) {
    this.reservas = this.reservas.filter((id) => id !== socioId);
  }

  proximaReserva(): number | null {
    return this.reservas.length > 0 ? this.reservas[0] : null;
  }

  popReservante(): number | null {
    return this.reservas.shift() ?? null;
  }
}
