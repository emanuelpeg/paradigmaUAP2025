"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Biblioteca = void 0;
const Libro_1 = require("./Libro");
const Autor_1 = require("./Autor");
const Socio_1 = require("./Socio");
class Biblioteca {
    // Eventos y notificaciones
    eventos = [];
    notificaciones = [];
    inventario = [];
    socios = [];
    DURACION = 14;
    // Funciones de libros
    buscarLibrosPorAutor(nombreAutor) {
        return this.inventario.filter(libro => libro.autor.nombre === nombreAutor);
    }
    agregarLibro(titulo, autor, isbn) {
        const autorObj = new Autor_1.Autor(autor);
        const libroCreado = new Libro_1.Libro(titulo, autorObj, isbn);
        this.inventario.push(libroCreado);
        return libroCreado;
    }
    buscarLibro(isbn) {
        // return this.inventario.find(libro => libro.isbn === isbn) ?? null;
        const libroEncontrado = this.inventario.find((libro) => libro.isbn === isbn);
        return libroEncontrado ?? null;
    }
    // Funciones de socios
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
        // Bloquear préstamo si tiene deuda
        if (socio.deuda > 0) {
            throw new Error("El socio tiene multas pendientes y no puede retirar libros");
        }
        // fijarse si esta disponible
        for (const socioAux of this.socios) {
            if (socioAux.tienePrestadoLibro(libro)) {
                throw new Error("Libro no esta disponible");
            }
        }
        socio.retirar(libro, this.DURACION);
    }
    reservarLibro(socioId, libroISBN) {
        const socio = this.buscarSocio(socioId);
        const libro = this.buscarLibro(libroISBN);
        if (!socio || !libro) {
            throw new Error("Socio o libro no encontrado");
        }
        // Verificar si ya está prestado
        const prestado = this.socios.some((s) => s.tienePrestadoLibro(libro));
        if (prestado) {
            libro.agregarReserva(socio);
            console.log(`${socio.nombreCompleto} reservó el libro "${libro.titulo}"`);
        }
        else {
            // Si está libre, lo prestamos directamente
            socio.retirar(libro, this.DURACION);
            console.log(`${socio.nombreCompleto} retiró el libro "${libro.titulo}" sin necesidad de reserva`);
        }
    }
    devolverLibro(socioId, libroISBN) {
        const socio = this.buscarSocio(socioId);
        const libro = this.buscarLibro(libroISBN);
        if (!socio || !libro) {
            throw new Error("No se encontro");
        }
        // Calcular multa si corresponde
        const prestamo = socio.tienePrestadoLibro(libro);
        if (prestamo) {
            const multa = socio.calcularMultaPorPrestamo(prestamo, 50);
            if (multa > 0) {
                socio.registrarMulta(multa);
                this.notificarSocio(socio.id, `Tienes una multa de $${multa} por retraso en la devolución de '${libro.titulo}'`);
            }
        }
        socio.devolver(libro);
        console.log(`${socio.nombreCompleto} devolvió el libro "${libro.titulo}"`);
        if (libro.tieneReservas()) {
            const siguienteSocio = libro.obtenerProximaReserva();
            if (siguienteSocio) {
                siguienteSocio.retirar(libro, this.DURACION);
                this.notificarSocio(siguienteSocio.id, `El libro '${libro.titulo}' está disponible para ti por reserva.`);
                console.log(`📢 Notificación: "${libro.titulo}" ahora está prestado a ${siguienteSocio.nombreCompleto} (por reserva).`);
            }
        }
    }
    agregarEvento(evento) {
        this.eventos.push(evento);
        this.notificaciones.push(`Nuevo evento: ${evento.titulo} el ${evento.fecha}`);
    }
    notificarSocio(socioId, mensaje) {
        this.notificaciones.push(`Notificación para socio ${socioId}: ${mensaje}`);
    }
    obtenerNotificaciones() {
        return [...this.notificaciones];
    }
    obtenerHistorialSocio(socioId) {
        const socio = this.buscarSocio(socioId);
        return socio ? socio.obtenerHistorialLectura() : [];
    }
    obtenerRecomendacionesSocio(socioId) {
        const socio = this.buscarSocio(socioId);
        return socio ? socio.recomendacionesSimples() : [];
    }
}
exports.Biblioteca = Biblioteca;
