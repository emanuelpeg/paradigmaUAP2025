"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.biblioteca = void 0;
const Libro_1 = require("./Libro");
const Socio_1 = require("./Socio");
const Autor_1 = require("./Autor");
class Biblioteca {
    inventario = [];
    socios = [];
    DURACION = 14;
    eventos = [];
    notificaciones = [];
    agregarLibro(titulo, autor, isbn) {
        const autorObj = typeof autor === "string" ? new Autor_1.Autor(autor) : autor;
        const libroCreado = new Libro_1.Libro(titulo, autorObj, isbn);
        this.inventario.push(libroCreado);
        return libroCreado;
    }
    buscarLibro(isbn) {
        const libroEncontrado = this.inventario.find((libro) => libro.isbn === isbn);
        return libroEncontrado ?? null;
    }
    registrarSocio(id, nombre, apellido) {
        const socioCreado = new Socio_1.Socio(id, nombre, apellido);
        this.socios.push(socioCreado);
        return socioCreado;
    }
    buscarSocio(id) {
        return this.socios.find((socio) => socio.id === id) ?? null;
    }
    retirarLibro(socioId, libroISBN) {
        const socio = this.buscarSocio(socioId);
        const libro = this.buscarLibro(libroISBN);
        if (!socio || !libro) {
            throw new Error("No se encontro");
        }
        for (const s of this.socios) {
            if (s.tienePrestadoLibro(libro)) {
                libro.reservar(socioId);
                return;
            }
        }
        if (socio.deuda > 0)
            throw new Error("Socio tiene multas pendientes");
        socio.retirar(libro, this.DURACION);
    }
    forzarPrestamo(socioId, libroISBN, vencimiento) {
        const socio = this.buscarSocio(socioId);
        const libro = this.buscarLibro(libroISBN);
        if (!socio || !libro)
            throw new Error("No se encontro");
        socio.retirarConVencimiento(libro, vencimiento);
    }
    devolverLibro(socioId, libroISBN) {
        const socio = this.buscarSocio(socioId);
        const libro = this.buscarLibro(libroISBN);
        if (!socio || !libro) {
            throw new Error("No se encontro");
        }
        const prestamo = socio.devolver(libro);
        const hoy = new Date();
        if (prestamo && hoy > prestamo.vencimiento) {
            const diasAtraso = Math.ceil((hoy.getTime() - prestamo.vencimiento.getTime()) / (1000 * 60 * 60 * 24));
            const multa = diasAtraso * 50;
            const msg = `${socio.nombreCompleto} devolvió "${libro.titulo}" con ${diasAtraso} días de atraso — multa: $${multa}.`;
            this.notificaciones.push(msg);
        }
        const siguiente = libro.popReservante();
        if (siguiente) {
            const socioNot = this.buscarSocio(siguiente);
            if (socioNot) {
                const msg = `¡Buenas! ${socioNot.nombreCompleto}, "${libro.titulo}" ya está disponible para vos.`;
                this.notificaciones.push(msg);
            }
        }
    }
    registrarEvento(evento) {
        this.eventos.push(evento);
    }
    listarEventos() {
        return this.eventos.map((e) => ({ titulo: e.titulo, fecha: e.fecha }));
    }
    recomendarPara(socioId) {
        const socio = this.buscarSocio(socioId);
        if (!socio)
            return [];
        return socio.recomendar(this.inventario);
    }
    librosDeAutor(autor) {
        const nombre = typeof autor === "string" ? autor : autor.nombre;
        return this.inventario.filter((l) => l.autor.nombre === nombre);
    }
    obtenerNotificaciones() {
        return this.notificaciones.slice();
    }
}
exports.biblioteca = new Biblioteca();
