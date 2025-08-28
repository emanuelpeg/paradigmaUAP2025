"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Libro = void 0;
class Libro {
    _titulo;
    _autor;
    _isbn;
    reservas = [];
    constructor(_titulo, _autor, _isbn) {
        this._titulo = _titulo;
        this._autor = _autor;
        this._isbn = _isbn;
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
    reservar(socioId) {
        if (!this.reservas.includes(socioId))
            this.reservas.push(socioId);
    }
    cancelarReserva(socioId) {
        this.reservas = this.reservas.filter((id) => id !== socioId);
    }
    proximoReservante() {
        return this.reservas.length > 0 ? this.reservas[0] : null;
    }
    popReservante() {
        return this.reservas.shift() ?? null;
    }
}
exports.Libro = Libro;
