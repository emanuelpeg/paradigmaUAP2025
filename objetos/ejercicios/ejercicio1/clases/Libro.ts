import { Socio } from "./Socio";

export class Libro {
    // private _titulo: string;
    // private _autor: string;
    // private _isbn: string;

    // constructor(titulo: string, autor: string, isbn: string) {
    //     this._titulo = titulo;
    //     this._autor = autor;
    //     this._isbn = isbn;   
    // }
    
    constructor(private _titulo: string, 
                private _autor: string, 
                private _isbn: string, 
                private _cola: Socio[]=[],
                private _disponible: boolean = true) {}

    get titulo() {return this._titulo;}
    get autor() {return this._autor;} 
    get isbn() {return this._isbn;}
    get isDisponible() {return this._disponible;}
    get colaEspera() {return this._cola;}
}