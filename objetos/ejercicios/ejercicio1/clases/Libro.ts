export class Autor{
  constructor(
    private _nombre: string, 
    private _apellido: string, 
    private _fechaNacimiento: Date, 
    private _biografia: string)
    {}
  get nombre() {
    return this._nombre;
  }
  get apellido() {
    return this._apellido;
  }
  get fechaNacimiento() {
    return this._fechaNacimiento;
  }
  get biografia() {
    return this._biografia;
  }

}
export class Libro {
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
}
