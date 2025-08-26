export class Autor{
  constructor(
    private _nombre: string,
    private _apellido: string,
    private _biografia: string,
    private _anioNacimiento: number
  ){}

  get nombre(){
    return this._nombre;
  }

  get apellido(){
    return this._apellido;
  }

  get biografia(){
    return this._biografia;
  }

  get anioNacimiento(){
    return this._anioNacimiento;
  }
  

}