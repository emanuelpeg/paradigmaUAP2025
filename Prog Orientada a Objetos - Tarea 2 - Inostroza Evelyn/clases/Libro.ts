import {Autor} from './Autor';

export class Libro {
  private reservas: number[] = [];

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

  reservar(socioId: number)
  {
    if (!this.reservas.includes(socioId)){
      this.reservas.push(socioId);
    }
  }

  proximoReserva(): number | undefined
  {
    return this.reservas.shift();
  }

  hayReservas(): boolean
  {
    return this.reservas.length > 0;
  }

  get listaReservas(): readonly number[]
  {
    return this.reservas;
  }

}
