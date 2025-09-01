"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Autor = void 0;
var Autor = /** @class */ (function () {
    function Autor(_nombre, _apellido, _biografia, _anioNacimiento) {
        this._nombre = _nombre;
        this._apellido = _apellido;
        this._biografia = _biografia;
        this._anioNacimiento = _anioNacimiento;
    }
    Object.defineProperty(Autor.prototype, "nombre", {
        get: function () {
            return this._nombre;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Autor.prototype, "apellido", {
        get: function () {
            return this._apellido;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Autor.prototype, "biografia", {
        get: function () {
            return this._biografia;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Autor.prototype, "anioNacimiento", {
        get: function () {
            return this._anioNacimiento;
        },
        enumerable: false,
        configurable: true
    });
    return Autor;
}());
exports.Autor = Autor;
