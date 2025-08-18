export class Libro {
    // private _titulo: string;
    // private _autor: string;
    // private _isbn: string;

    // constructor(titulo: string, autor: string, isbn: string) {
    //     this._titulo = titulo;
    //     this._autor = autor;
    //     this._isbn = isbn;   
    // }
    
    constructor(private _titulo: string, private _autor: string, private _isbn: string) {}

    get titulo() {return this._titulo;}
    get autor() {return this._autor;}
    get isbn() {return this._isbn;}
}