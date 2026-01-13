"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.biblioteca = exports.Biblioteca = void 0;
var libro_1 = require("./libro");
var socio_1 = require("./socio");
var Biblioteca = /** @class */ (function () {
    function Biblioteca() {
        this.inventario = [];
        this.socios = [];
    }
    // funciones de libro
    Biblioteca.prototype.agregarLibro = function (titulo, autor, isbn) {
        var libroCreado = new libro_1.Libro(titulo, autor, isbn);
        this.inventario.push(libroCreado);
        return libroCreado;
    };
    // f
    Biblioteca.prototype.buscarLibro = function (isbn) {
        //return this.inventario.find(libro => libro.isbn === isbn) ?? null;
        var libroEncontrado = this.inventario.find(function (libro) { return libro.isbn === isbn; });
        if (libroEncontrado) {
            return libroEncontrado;
        }
        return null;
    };
    // funciones de socios
    Biblioteca.prototype.registrarSocio = function (id, nombre, apellido) {
        var socioCreado = new socio_1.Socio(id, nombre, apellido);
        this.socios.push(socioCreado);
        return socioCreado;
    };
    Biblioteca.prototype.buscarSocio = function (id) {
        var _a;
        return (_a = this.socios.find(function (socio) { return socio.id === id; })) !== null && _a !== void 0 ? _a : null;
    };
    Biblioteca.prototype.retirarLibro = function (socioId, libroISBN) {
        //Todo: fijarse si esta disponible
        var socio = this.buscarSocio(socioId);
        var libro = this.buscarLibro(libroISBN);
        if (!socio || !libro) {
            throw new Error("No se encontro");
        }
        for (var _i = 0, _a = this.socios; _i < _a.length; _i++) {
            var socio_2 = _a[_i];
            if (socio_2.tienePrestadoLibro(libro)) {
                throw new Error("Libro no esta disponible");
            }
        }
    };
    Biblioteca.prototype.devolverLibro = function (socioId, libroISBN) {
        var socio = this.buscarSocio(socioId);
        var libro = this.buscarLibro(libroISBN);
        if (!socio || !libro) {
            throw new Error("No se encontro");
        }
        socio.devolver(libro);
    };
    return Biblioteca;
}());
exports.Biblioteca = Biblioteca;
exports.biblioteca = new Biblioteca();
