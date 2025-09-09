import { Autor } from "./Autor";

export class Libro {
  constructor(
    private _titulo: string,
    private _autor: Autor,
    private _isbn: string
  ) {}

  get titulo() {
    return this._titulo;
  }
  public set titulo(value: string) {
    this._titulo = value;
  }
  get autor() {
    return this._autor;
  }
  public set autor(value: Autor) {
    this._autor = value;
  }
  get isbn() {
    return this._isbn;
  }
  public set isbn(value: string) {
    this._isbn = value;
  }
}
