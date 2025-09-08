import { Autor } from "./Autor";

export class Libro {
  constructor(
    private _titulo: string,
    private _autor: Autor,
    private _isbn: string,
    public esReferencia: boolean = false // <- nuevo
  ) {}

  get titulo() { return this._titulo; }
  get autor()  { return this._autor; }
  get isbn()   { return this._isbn; }

  obtenerInformacion(): string {
    return `${this._titulo} — ${this._autor.nombre} (ISBN: ${this._isbn})`;
  }
}