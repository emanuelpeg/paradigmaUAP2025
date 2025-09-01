"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventoBiblioteca = void 0;
var eventoBiblioteca = /** @class */ (function () {
    function eventoBiblioteca(_nombre, _fecha, _descripcion) {
        this._nombre = _nombre;
        this._fecha = _fecha;
        this._descripcion = _descripcion;
        this.socioRegistrados = [];
    }
    Object.defineProperty(eventoBiblioteca.prototype, "nombre", {
        get: function () {
            return this._nombre;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(eventoBiblioteca.prototype, "fecha", {
        get: function () {
            return this._fecha;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(eventoBiblioteca.prototype, "descripcion", {
        get: function () {
            return this._descripcion;
        },
        enumerable: false,
        configurable: true
    });
    //Para agregar al socio a un evento
    eventoBiblioteca.prototype.registrarSocio = function (socioId) {
        if (!this.socioRegistrados.includes(socioId)) {
            this.socioRegistrados.push(socioId);
            return true;
        }
        return false; // cuando ya esta registrado el socio
    };
    //Para validad si un socio ya está registrado a un evento
    eventoBiblioteca.prototype.estaRegistado = function (socioId) {
        return this.socioRegistrados.includes(socioId);
    };
    return eventoBiblioteca;
}());
exports.eventoBiblioteca = eventoBiblioteca;
