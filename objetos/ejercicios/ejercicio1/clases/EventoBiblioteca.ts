export class eventoBiblioteca {
  private socioRegistrados: number[] = [];

  constructor(
    private _nombre: string,
    private _fecha: Date, 
    private _descripcion: string
  ) {}

  get nombre(){
    return this._nombre;
  }

  get fecha(){
    return this._fecha;
  }

  get descripcion(){
    return this._descripcion;
  }

  //Para agregar al socio a un evento
  registrarSocio(socioId: number){
    if(!this.socioRegistrados.includes(socioId))
    {
      this.socioRegistrados.push(socioId);
      return true;
    }
    return false// cuando ya esta registrado el socio
  }

  //Para validad si un socio ya está registrado a un evento
  estaRegistado(socioId: number):boolean
  {
    return this.socioRegistrados.includes(socioId)
  }
}
