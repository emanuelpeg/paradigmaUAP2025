"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Libro = void 0;
var Libro = /** @class */ (function () {
    function Libro(_titulo, _autor, _isbn) {
        this._titulo = _titulo;
        this._autor = _autor;
        this._isbn = _isbn;
    }
    Object.defineProperty(Libro.prototype, "titulo", {
        get: function () {
            return this._titulo;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Libro.prototype, "autor", {
        get: function () {
            return this._autor;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Libro.prototype, "isbn", {
        get: function () {
            return this._isbn;
        },
        enumerable: false,
        configurable: true
    });
    return Libro;
}());
exports.Libro = Libro;
