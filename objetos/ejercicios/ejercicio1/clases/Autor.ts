export class Autor {
    constructor(
        private _nombre: string,
        private _apellido: string,
        private _biografia: string,
        private _fechaNacimiento: Date
    ) {}

    get nombre() {
        return this._nombre;
    }
    get apellido() {
        return this._apellido;
    }
    get nombreCompleto() {
        return `${this._nombre} ${this._apellido}`;
    }
    get biografia() {
        return this._biografia;
    }
    get fechaNacimiento() {
        return this._fechaNacimiento;
    }
  

}