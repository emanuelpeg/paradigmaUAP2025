"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Visitante = exports.Empleado = exports.SocioVIP = exports.SocioRegular = exports.Socio = void 0;
class Socio {
    _id;
    _nombre;
    _apellido;
    _prestamos = [];
    _historial = [];
    _deuda = 0;
    constructor(_id, _nombre, _apellido) {
        this._id = _id;
        this._nombre = _nombre;
        this._apellido = _apellido;
    }
    get id() { return this._id; }
    get nombreCompleto() { return `${this._nombre} ${this._apellido}`; }
    get prestamos() { return this._prestamos; }
    get historialLectura() { return this._historial; }
    get deudaPendiente() { return this._deuda; }
    puedeTomarOtro() {
        if (this.capacidadMaxima() === "ilimitado")
            return true;
        return this._prestamos.length < this.capacidadMaxima();
    }
    tienePrestado(isbn) {
        return this._prestamos.some(p => p.libro.isbn === isbn);
    }
    agregarPrestamo(p) {
        if (!this.tienePrestado(p.libro.isbn))
            this._prestamos.push(p);
    }
    registrarDevolucion(isbn, fecha) {
        const idx = this._prestamos.findIndex(p => p.libro.isbn === isbn);
        if (idx === -1)
            throw new Error("El socio no tenía este libro.");
        const p = this._prestamos[idx];
        this._prestamos.splice(idx, 1);
        const multa = p.calcularMulta(this, fecha);
        this._deuda += multa;
        if (!this._historial.some(l => l.isbn === p.libro.isbn))
            this._historial.push(p.libro);
        return multa;
    }
    pagarDeuda(monto) { if (monto > 0)
        this._deuda = Math.max(0, this._deuda - monto); }
}
exports.Socio = Socio;
// ---- Tipos de socio
class SocioRegular extends Socio {
    capacidadMaxima() { return 3; }
    periodoBaseDias() { return 14; }
    aplicaMultas() { return true; }
}
exports.SocioRegular = SocioRegular;
class SocioVIP extends Socio {
    capacidadMaxima() { return 5; }
    periodoBaseDias() { return 21; }
    aplicaMultas() { return false; } // sin multas
}
exports.SocioVIP = SocioVIP;
class Empleado extends Socio {
    capacidadMaxima() { return "ilimitado"; } // ← tipo literal explícito
    periodoBaseDias() { return 28; }
    aplicaMultas() { return true; }
}
exports.Empleado = Empleado;
class Visitante extends Socio {
    capacidadMaxima() { return 0; }
    periodoBaseDias() { return 0; }
    aplicaMultas() { return false; }
}
exports.Visitante = Visitante;
