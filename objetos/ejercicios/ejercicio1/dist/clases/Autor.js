"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Autor = void 0;
class Autor {
    _nombre;
    _biografia;
    _anioNacimiento;
    constructor(_nombre, _biografia = null, _anioNacimiento = null) {
        this._nombre = _nombre;
        this._biografia = _biografia;
        this._anioNacimiento = _anioNacimiento;
    }
    get nombre() {
        return this._nombre;
    }
    get biografia() {
        return this._biografia;
    }
    get anioNacimiento() {
        return this._anioNacimiento;
    }
}
exports.Autor = Autor;
