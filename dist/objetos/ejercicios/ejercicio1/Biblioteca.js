"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.biblioteca = void 0;
const Libro_1 = require("./Libro");
const Socio_1 = require("./Socio");
class Biblioteca {
    inventario;
    socios;
    constructor() {
        this.inventario = [];
        this.socios = [];
    }
    //Funciones de Libro
    agregarLibro(titulo, _autor, isbn) {
        const libro = new Libro_1.Libro(titulo, _autor, isbn);
        this.inventario.push(libro);
        return libro;
    }
    buscarLibro(isbn) {
        //return this.inventario.find(libro => libro.titulo === titulo);
        const libroEncontrado = this.inventario.find((libro) => libro.isbn === isbn);
        if (!libroEncontrado) {
            return null;
        }
        return libroEncontrado;
    }
    //Funciones de Socio
    registrarSocio(id, nombre, apellido) {
        const socio = new Socio_1.Socio(id, nombre, apellido);
        this.socios.push(socio);
        return socio;
    }
}
exports.biblioteca = new Biblioteca();
