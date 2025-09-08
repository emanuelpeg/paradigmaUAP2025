export class Autor{
    constructor(
        private _nombre:string,
        private _biografia:string,
        private _anoNacimiento:number
    ){}
    get nombre(){
        return this._nombre;
    }
    get biografia(){
        return this._biografia;
    }
    get anoNacimiento(){
        return this._anoNacimiento;
    }
}