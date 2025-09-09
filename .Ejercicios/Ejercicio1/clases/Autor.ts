import { Libro } from "./Libro";
export class Autor {
    private _libros : Libro[] = [];

    constructor(
        private _nombre: string,
        private _apellido: string,
        private _biografia: string,
        private _dob: Date
    ){}

    get nombre(){ return this._nombre; }
    get apellido(){ return this._apellido; }
    get nombreCompleto(){ return `${this._nombre} ${this._apellido}`; }
    get biografia(){ return this._biografia; }
    get dob(){ return this._dob; }
    get obtenerLibros(){ return this._libros; }
}
