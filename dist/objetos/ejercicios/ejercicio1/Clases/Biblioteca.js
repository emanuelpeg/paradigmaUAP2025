"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.biblioteca = exports.Biblioteca = void 0;
// objetos/ejercicios/ejercicio1/Clases/Biblioteca.ts
const Libro_1 = require("./Libro");
const Socio_1 = require("./Socio");
const Politicas_1 = require("./Politicas");
class Biblioteca {
    libros = new Map();
    disponibilidad = new Map();
    socios = new Map();
    espera = new Map();
    politica = new Politicas_1.PoliticaFlexible();
    agregarLibro(titulo, autor, isbn, esReferencia = false) {
        const lib = new Libro_1.Libro(titulo, autor, isbn, esReferencia);
        this.libros.set(isbn, lib);
        if (!this.disponibilidad.has(isbn))
            this.disponibilidad.set(isbn, true);
        if (!this.espera.has(isbn))
            this.espera.set(isbn, []);
    }
    registrarSocio(tipo, id, nombre, apellido) {
        const s = new Socio_1.Socio(id, nombre, apellido, tipo);
        this.socios.set(id, s);
        return s;
    }
    setPolitica(p) {
        this.politica = p;
    }
    prestarLibro(socioId, isbn, modo) {
        const socio = this.socios.get(socioId);
        const libro = this.libros.get(isbn);
        if (!socio)
            return `Error: socio ${socioId} inexistente`;
        if (!libro)
            return `Error: libro ${isbn} inexistente`;
        if (libro.esReferencia || modo === "referencia") {
            if (!this.politica.permiteReferencia(socio.tipo)) {
                return `Rechazado: solo empleados pueden llevar material de referencia`;
            }
            const disp = this.disponibilidad.get(isbn) ?? true;
            if (!disp)
                return `No disponible (referencia)`;
            this.disponibilidad.set(isbn, false);
            return `Prestado (referencia) a ${socio.nombre}`;
        }
        const disp = this.disponibilidad.get(isbn) ?? true;
        if (disp) {
            this.disponibilidad.set(isbn, false);
            return `Prestado a ${socio.nombre}`;
        }
        else {
            const cola = this.espera.get(isbn);
            if (!cola.includes(socioId))
                cola.push(socioId);
            return `En espera (#${cola.length}) para ${socio.nombre}`;
        }
    }
    devolverLibro(_socioId, isbn) {
        const libro = this.libros.get(isbn);
        if (!libro)
            return `Error: libro ${isbn} inexistente`;
        const cola = this.espera.get(isbn) ?? [];
        if (cola.length > 0) {
            const siguienteId = cola.shift();
            const siguiente = this.socios.get(siguienteId);
            this.espera.set(isbn, cola);
            this.disponibilidad.set(isbn, false);
            return `Devuelto y asignado a ${siguiente?.nombre ?? "siguiente en cola"}`;
        }
        else {
            this.disponibilidad.set(isbn, true);
            return `Devuelto y disponible`;
        }
    }
    buscarEnSistemas(criteria) {
        const t = criteria.titulo?.toLowerCase();
        const a = criteria.autor?.toLowerCase();
        const i = criteria.isbn?.toLowerCase();
        const res = [];
        for (const libro of this.libros.values()) {
            const okT = t ? libro.titulo.toLowerCase().includes(t) : true;
            const okA = a ? libro.autor.toLowerCase().includes(a) : true;
            const okI = i ? libro.isbn.toLowerCase().includes(i) : true;
            if (okT && okA && okI)
                res.push(libro);
        }
        return res;
    }
    listarLibros() {
        return [...this.libros.values()];
    }
    disponible(isbn) {
        return this.disponibilidad.get(isbn) ?? true;
    }
}
exports.Biblioteca = Biblioteca;
exports.biblioteca = new Biblioteca();
