import { Autor } from "./autor";

export class Libro {
    constructor(
        private _titulo: string,
        private _autor: Autor,
        private _isbn: string,
        public disponible: boolean = true
    ) {}

    get titulo() { return this._titulo; }
    get autor() { return this._autor; }
    get isbn() { return this._isbn; }
}
