import { Socio } from "./Socio";
import { Autor } from "./Autor";

export class Libro {
  private reservas:Socio[] = [];

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
  get reservasSocios() {
    return this.reservas;
  }
  reservar(socio:Socio){
    this.reservas.push(socio);
  }

}
