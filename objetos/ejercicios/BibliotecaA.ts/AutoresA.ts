export class Autor{
    constructor (
        private _nombre: string, 
        private _nacimiento: number)
        {}

    getNombre(){
        return this._nombre;
    }

    getNacimiento(){
        return this._nacimiento;
    }
}