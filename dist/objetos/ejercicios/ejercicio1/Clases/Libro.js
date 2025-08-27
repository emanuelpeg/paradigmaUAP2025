"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Libro = void 0;
class Libro {
    _titulo;
    _autor;
    _isbn;
    constructor(_titulo, _autor, _isbn) {
        this._titulo = _titulo;
        this._autor = _autor;
        this._isbn = _isbn;
    }
    get titulo() { return this._titulo; }
    get autor() { return this._autor; }
    get isbn() { return this._isbn; }
    obtenerInformacion() {
        return `${this._titulo} — ${this._autor.nombre} (ISBN: ${this._isbn})`;
    }
}
exports.Libro = Libro;
