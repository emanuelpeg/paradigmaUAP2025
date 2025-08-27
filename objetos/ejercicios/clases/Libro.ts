import { Autor } from "./autor";

export class Libro {
    constructor(
        private _titulo: string,
        private _autor: Autor,
        private _isbn: string,
        private _disponible: boolean = true
    ) {}

    get titulo() { return this._titulo; }
    get autor() { return this._autor; }
    get isbn() { return this._isbn; }
    get disponible() { return this._disponible; }
    set disponible(value: boolean) { this._disponible = value; }
}