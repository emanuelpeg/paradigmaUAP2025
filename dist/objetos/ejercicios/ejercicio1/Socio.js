"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Socio = void 0;
class Socio {
    _id;
    _nombre;
    _apellido;
    constructor(_id, _nombre, _apellido) {
        this._id = _id;
        this._nombre = _nombre;
        this._apellido = _apellido;
    }
    get id() {
        return this._id;
    }
    get nombre() {
        return this._nombre;
    }
    get apellido() {
        return this._apellido;
    }
    get nombreCompleto() {
        return `${this._nombre} ${this._apellido}`;
    }
}
exports.Socio = Socio;
