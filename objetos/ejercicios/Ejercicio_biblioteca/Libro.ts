
export class Libro{

    private _titulo: string; // solo la clase puede acceder a la propiedad. Y el protected permite que las clases hijas accedan a la propiedad.
    private _autor: string;
    private _isbn: string;

    constructor(titulo: string, autor: string, isbn: string) {
        this._titulo = titulo;
        this._autor = autor;
        this._isbn = isbn;
    }

    /* Declara las atriubutos con el modificador de acceso y se inicializan directamente en el constructor.
    constructor(
    private _titulo: string,
    private _autor: string, 
    private _isbn: string
    )
    */

    get titulo(): string {
        return this._titulo;
    }
    set titulo(titulo: string) {
        this._titulo = titulo;
    }
    get autor(): string {
        return this._autor;
    }
    set autor(autor: string) {
        this._autor = autor;
    }
    get isbn(): string {
        return this._isbn;
    }
    set isbn(isbn: string) {
        this._isbn = isbn;
    }
}