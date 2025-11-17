import { Libro } from "./Libro";

export class Autor{
    constructor(
        private _nombre: string,
        private _biografia: string,
        private _fechaNacimiento: Date,
        public libros: Libro[] = []
    ){}
    get nombre() {return this._nombre;}
    get biografia() {return this._biografia;}
    get fechaNacimiento() {return this._fechaNacimiento;}


}