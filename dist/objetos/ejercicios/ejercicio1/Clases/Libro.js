"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Libro = void 0;
// objetos/ejercicios/ejercicio1/Clases/Libro.ts
class Libro {
    titulo;
    autor;
    isbn;
    esReferencia;
    constructor(titulo, autor, isbn, esReferencia = false) {
        this.titulo = titulo;
        this.autor = autor;
        this.isbn = isbn;
        this.esReferencia = esReferencia;
    }
    obtenerInformacion() {
        return `${this.titulo} — ${this.autor} [${this.isbn}]${this.esReferencia ? " (Referencia)" : ""}`;
    }
}
exports.Libro = Libro;
