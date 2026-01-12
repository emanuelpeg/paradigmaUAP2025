



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

    get titulo(): string {
        return this._titulo;
    }

    get autor(): Autor {
        return this._autor;
    }

    get isbn(): string {
        return this._isbn;
    }
}

