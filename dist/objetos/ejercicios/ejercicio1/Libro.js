"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Libro = void 0;
class Libro {
    _titulo;
    _autor;
    _isbn;
    constructor(titulo, autor, isbn) {
        this._titulo = titulo;
        this._autor = autor;
        this._isbn = isbn;
    }
    get titulo() { return this._titulo; }
    get autor() { return this._autor; }
    get isbn() { return this._isbn; }
    obtenerInformacion() {
        return `${this._titulo} fue escrito por ${this._autor} y su ISBN es ${this._isbn}.`;
    }
}
exports.Libro = Libro;
