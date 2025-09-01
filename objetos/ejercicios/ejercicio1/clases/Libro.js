"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Libro = void 0;
var Libro = /** @class */ (function () {
    function Libro(_titulo, _autor, _isbn) {
        this._titulo = _titulo;
        this._autor = _autor;
        this._isbn = _isbn;
        this.reservas = []; // Ids de socios que reservaron un libro.
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
    //Agrega un socio a la lista de reservas - es un metodo
    Libro.prototype.reservar = function (socioId) {
        this.reservas.push.apply(socioId);
    };
    //Obtiene el siguiente socio en la cola de reservas
    Libro.prototype.obtenerSiguienteReserva = function () {
        return this.reservas.shift(); //devuelve el primer elemento del array y lo elimina
    };
    //Valida si el libro tiene una reserva
    Libro.prototype.tieneReservas = function () {
        return this.reservas.length > 0; //si hay reservas True, sino es falso
    };
    return Libro;
}());
exports.Libro = Libro;
