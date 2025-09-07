import { Socio } from "./Socio.js";
import {Autor} from "./Autor.js"

export class Libro {
  private _reservas: Socio[] = [];

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
  get reservas():Socio[] {
    return this._reservas
  }
}