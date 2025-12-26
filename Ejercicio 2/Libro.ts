 import { Autor } from "./Autor";

export class Libro {
  private _reservas: number[] = []; // cola de IDs de socio

  constructor(
    private _titulo: string,
    private _autor: Autor,   // ahora es un objeto Autor
    private _isbn: string
  ) {}

  get titulo() { return this._titulo; }
  get autor()  { return this._autor; }
  get isbn()   { return this._isbn; }

  
  get reservas(): number[] { return this._reservas; }

  agregarReserva(socioId: number) {
    if (!this._reservas.includes(socioId)) {
      this._reservas.push(socioId);
    }
  }

  proximaReserva(): number | null {
    return this._reservas.length > 0 ? this._reservas[0] : null;
  }

  quitarReserva(): number | null {
    return this._reservas.shift() ?? null;
  }
}

