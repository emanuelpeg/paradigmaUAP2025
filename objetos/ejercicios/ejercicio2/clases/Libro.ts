export class Libro {

    private _categoria:string[]=[]
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
  get categoria(){
    return this._categoria;
  }
}
