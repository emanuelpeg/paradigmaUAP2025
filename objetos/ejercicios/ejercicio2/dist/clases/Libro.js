"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Libro = void 0;
class Libro {
    constructor(_titulo, _autor, // Cambia a objeto Autor si existe
    _isbn) {
        this._titulo = _titulo;
        this._autor = _autor;
        this._isbn = _isbn;
        this.reservas = [];
        this.notificaciones = [];
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
    agregarReserva(socio) {
        this.reservas.push(socio);
        this.notificaciones.push(`Reserva agregada para el socio ${socio.nombreCompleto}`);
    }
    tieneReservas() {
        return this.reservas.length > 0;
    }
    obtenerProximaReserva() {
        var _a;
        return (_a = this.reservas.shift()) !== null && _a !== void 0 ? _a : null;
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
//# sourceMappingURL=Libro.js.map