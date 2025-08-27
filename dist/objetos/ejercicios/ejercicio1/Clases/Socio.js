"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Socio = void 0;
class Socio {
    _id;
    _nombre;
    _apellido;
    _prestamos = [];
    _historialLectura = [];
    _deuda = 0;
    constructor(_id, _nombre, _apellido) {
        this._id = _id;
        this._nombre = _nombre;
        this._apellido = _apellido;
    }
    get id() { return this._id; }
    get nombreCompleto() { return `${this._nombre} ${this._apellido}`; }
    get prestamos() { return this._prestamos; }
    get historialLectura() { return this._historialLectura; }
    get deudaPendiente() { return this._deuda; }
    tienePrestadoLibro(libro) {
        return this._prestamos.some(p => p.libro.isbn === libro.isbn);
    }
    agregarPrestamo(libro, vencimiento) {
        if (!this.tienePrestadoLibro(libro))
            this._prestamos.push({ libro, vencimiento });
    }
    registrarDevolucion(isbn, fechaDevolucion = new Date()) {
        const idx = this._prestamos.findIndex(p => p.libro.isbn === isbn);
        if (idx === -1)
            throw new Error("El socio no tenía este libro.");
        const { libro, vencimiento } = this._prestamos[idx];
        this._prestamos.splice(idx, 1);
        const dias = Math.max(0, Math.ceil((+fechaDevolucion - +vencimiento) / (1000 * 60 * 60 * 24)));
        const multa = dias * 50;
        this._deuda += multa;
        if (!this._historialLectura.some(l => l.isbn === libro.isbn))
            this._historialLectura.push(libro);
        return multa;
    }
    pagarDeuda(monto) {
        if (monto > 0)
            this._deuda = Math.max(0, this._deuda - monto);
    }
}
exports.Socio = Socio;
