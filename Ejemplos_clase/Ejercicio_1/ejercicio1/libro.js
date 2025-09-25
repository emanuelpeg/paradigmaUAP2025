"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Libro = void 0;
var Libro = /** @class */ (function () {
    /*private _titulo: string;
    private _autor: string;
    private _isbn: string;

    
    constructor(titulo: string, autor: string, isbn: string;){
        this._titulo = titulo;
        this._autor = autor;
        this._isbn = isbn;
    }*/
    function Libro(_titulo, _autor, _isbn) {
        this._titulo = _titulo;
        this._autor = _autor;
        this._isbn = _isbn;
    }
    Object.defineProperty(Libro.prototype, "titulo", {
        get: function () { return this._titulo; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Libro.prototype, "autor", {
        get: function () { return this._autor; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Libro.prototype, "isbn", {
        get: function () { return this._isbn; },
        enumerable: false,
        configurable: true
    });
    return Libro;
}());
exports.Libro = Libro;
