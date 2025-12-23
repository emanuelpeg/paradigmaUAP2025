"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.biblioteca = void 0;
var Libro_1 = require("./Libro");
var Socio_1 = require("./Socio");
var Biblioteca = /** @class */ (function () {
    function Biblioteca() {
        this.inventario = [];
        this.socios = [];
    }
    // Funciones de libros
    Biblioteca.prototype.agregarLibro = function (titulo, autor, isbn) {
        var libroCreado = new Libro_1.Libro(titulo, autor, isbn);
        this.inventario.push(libroCreado);
        return libroCreado;
    };
    Biblioteca.prototype.buscarLibro = function (isbn) {
        // return this.inventario.find(libro => libro.isbn === isbn) ?? null;
        var libroEncontrado = this.inventario.find(function (libro) { return libro.isbn === isbn; });
        if (libroEncontrado) {
            return libroEncontrado;
        }
        return null;
    };
    // Funciones de socios
    Biblioteca.prototype.registrarSocio = function (tipo, id, nombre, apellido) {
        var socioCreado = Socio_1.SocioFactory.crearSocio(tipo, id, nombre, apellido);
        this.socios.push(socioCreado);
        return socioCreado;
    };
    Biblioteca.prototype.buscarSocio = function (id) {
        var _a;
        return (_a = this.socios.find(function (socio) { return socio.id === id; })) !== null && _a !== void 0 ? _a : null;
    };
    Biblioteca.prototype.retirarLibro = function (socioId, libroISBN) {
        var socio = this.buscarSocio(socioId);
        var libro = this.buscarLibro(libroISBN);
        if (!socio || !libro) {
            throw new Error("No se encontro");
        }
        // fijarse si esta disponible
        for (var _i = 0, _a = this.socios; _i < _a.length; _i++) {
            var socio_1 = _a[_i];
            if (socio_1.tienePrestadoLibro(libro)) {
                throw new Error("Libro no esta disponible");
            }
        }
        socio.retirar(libro);
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
exports.biblioteca = new Biblioteca();
