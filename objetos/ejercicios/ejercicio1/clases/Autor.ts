export class Autor {
    constructor(private _nombre: string, private _biografia: string | null = null, private _anioNacimiento: number | null = null) {}
    get nombre() {
        return this._nombre;
    }
    get biografia(){
        return this._biografia;
    }
    get anioNacimiento(){
        return this._anioNacimiento;
    }
}