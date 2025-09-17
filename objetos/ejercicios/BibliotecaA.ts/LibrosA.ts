import { Autor } from "./AutoresA"

export class Libro{
    constructor(
        private _titulo: string,
        private _autor : Autor,
        private _isbn : number
    )
    {}

    getTitulo(){
        return this._titulo;
    }

    getAutor(){
        return this._autor;
    }

    getIsbn(){
        return this._isbn;
    }
}