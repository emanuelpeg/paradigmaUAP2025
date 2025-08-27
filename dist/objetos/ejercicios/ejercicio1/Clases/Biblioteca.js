"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.biblioteca = exports.Biblioteca = void 0;
const Libro_1 = require("./Libro");
const Socio_1 = require("./Socio");
const Autor_1 = require("./Autor");
const EventoBiblioteca_1 = require("./EventoBiblioteca");
class Biblioteca {
    inventario = [];
    socios = [];
    autores = [];
    reservas = new Map(); // ISBN -> cola
    duracionPrestamoDias = 7;
    // Libros / Autores
    agregarLibro(titulo, autorNombre, isbn) {
        const autor = this.ensureAutor(autorNombre);
        const libro = new Libro_1.Libro(titulo, autor, isbn);
        this.inventario.push(libro);
        return libro;
    }
    ensureAutor(nombre) {
        const ex = this.autores.find(a => a.nombre.toLowerCase() === nombre.toLowerCase());
        if (ex)
            return ex;
        const nuevo = new Autor_1.Autor(nombre);
        this.autores.push(nuevo);
        return nuevo;
    }
    buscarLibro(isbn) { return this.inventario.find(l => l.isbn === isbn); }
    buscarSocio(id) { return this.socios.find(s => s.id === id); }
    registrarSocio(id, nombre, apellido) {
        return this.buscarSocio(id) ?? (this.socios.push(new Socio_1.Socio(id, nombre, apellido)), this.buscarSocio(id));
    }
    buscarLibrosPorAutorNombre(nombre) {
        return this.inventario.filter(l => l.autor.nombre.toLowerCase() === nombre.toLowerCase());
    }
    // Préstamos / Devoluciones
    prestarLibro(socioId, isbn, fecha = new Date()) {
        const socio = this.buscarSocio(socioId);
        const libro = this.buscarLibro(isbn);
        if (!socio || !libro)
            throw new Error("Socio o libro no encontrado.");
        if (socio.deudaPendiente > 0)
            throw new Error("Debes saldar tu deuda antes de retirar.");
        const prestado = this.socios.some(s => s.prestamos.some(p => p.libro.isbn === isbn));
        if (prestado) {
            this.reservarLibro(socio, isbn);
            return { reservado: true };
        }
        const venc = new Date(fecha);
        venc.setDate(venc.getDate() + this.duracionPrestamoDias);
        socio.agregarPrestamo(libro, venc);
        EventoBiblioteca_1.EventoBiblioteca.notificarPrestamo(socio.nombreCompleto, libro.titulo, venc);
        return { reservado: false, vencimiento: venc };
    }
    devolverLibro(socioId, isbn, fecha = new Date()) {
        const socio = this.buscarSocio(socioId);
        const libro = this.buscarLibro(isbn);
        if (!socio || !libro)
            throw new Error("Socio o libro no encontrado.");
        const multa = socio.registrarDevolucion(isbn, fecha);
        EventoBiblioteca_1.EventoBiblioteca.notificarDevolucion(socio.nombreCompleto, libro.titulo, multa);
        const cola = this.reservas.get(isbn) ?? [];
        if (cola.length > 0) {
            const siguiente = cola.shift();
            this.reservas.set(isbn, cola);
            const venc = new Date(fecha);
            venc.setDate(venc.getDate() + this.duracionPrestamoDias);
            siguiente.agregarPrestamo(libro, venc);
            EventoBiblioteca_1.EventoBiblioteca.notificarReserva(siguiente.nombreCompleto, libro.titulo);
            EventoBiblioteca_1.EventoBiblioteca.notificarPrestamo(siguiente.nombreCompleto, libro.titulo, venc);
        }
    }
    reservarLibro(socio, isbn) {
        const cola = this.reservas.get(isbn) ?? [];
        if (!cola.some(s => s.id === socio.id)) {
            cola.push(socio);
            this.reservas.set(isbn, cola);
        }
    }
    recomendarLibros(socioId) {
        const socio = this.buscarSocio(socioId);
        if (!socio)
            return [];
        const autoresLeidos = new Set(socio.historialLectura.map(l => l.autor.nombre.toLowerCase()));
        const yaLeidos = new Set(socio.historialLectura.map(l => l.isbn));
        const prestados = new Set(this.socios.flatMap(s => s.prestamos.map(p => p.libro.isbn)));
        const candidatos = this.inventario.filter(l => autoresLeidos.has(l.autor.nombre.toLowerCase()) && !yaLeidos.has(l.isbn) && !prestados.has(l.isbn));
        return candidatos.length ? candidatos : this.inventario.filter(l => !yaLeidos.has(l.isbn) && !prestados.has(l.isbn));
    }
}
exports.Biblioteca = Biblioteca;
exports.biblioteca = new Biblioteca();
exports.default = exports.biblioteca;
