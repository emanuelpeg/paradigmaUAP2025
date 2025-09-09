import { biblioteca } from "./Biblioteca";
import { Socio } from "./Socio";
import { Autor } from "./Autor";

export class Libro {
    private _titulo: string;
    private _autor: Autor;
    private _isbn: string;

    constructor(titulo: string, autor: Autor, isbn: string) {
        this._titulo = titulo;
        this._autor = autor;
        this._isbn = isbn;
    }

    get titulo() { return this._titulo; }
    get autor() { return this._autor; }
    get isbn() { return this._isbn; }

    public obtenerInformacion(): string {
        return `${this._titulo} fue escrito por ${this._autor.nombre} y su ISBN es ${this._isbn}.`;
    }
}