"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Libro = void 0;
class Libro {
    _titulo;
    _autor;
    _isbn;
    _categorias;
    reservas = [];
    notificaciones = [];
    constructor(_titulo, _autor, _isbn, _categorias = []) {
        this._titulo = _titulo;
        this._autor = _autor;
        this._isbn = _isbn;
        this._categorias = _categorias;
    }
    get titulo() {
        return this._titulo;
    }
    get autor() {
        return this._autor;
    }
    get isbn() {
        return this._isbn;
    }
    get categorias() {
        return this._categorias;
    }
    // Métodos para reservas
    agregarReserva(socio) {
        this.reservas.push(socio);
        this.notificaciones.push(`Reserva agregada para el socio ${socio.nombreCompleto}`);
    }
    tieneReservas() {
        return this.reservas.length > 0;
    }
    obtenerProximaReserva() {
        return this.reservas.shift() ?? null;
    }
    notificarDisponibilidad() {
        if (this.tieneReservas()) {
            const socio = this.reservas[0];
            this.notificaciones.push(`El libro '${this.titulo}' está disponible para ${socio.nombreCompleto}`);
        }
    }
    obtenerNotificaciones() {
        return [...this.notificaciones];
    }
}
exports.Libro = Libro;
