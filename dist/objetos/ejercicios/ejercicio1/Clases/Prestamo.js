"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrestamoDigital = exports.PrestamoReferencia = exports.PrestamoCorto = exports.PrestamoRegular = exports.Prestamo = void 0;
exports.crearPrestamo = crearPrestamo;
class Prestamo {
    libro;
    fechaInicio;
    constructor(libro, fechaInicio = new Date()) {
        this.libro = libro;
        this.fechaInicio = fechaInicio;
    }
}
exports.Prestamo = Prestamo;
class PrestamoRegular extends Prestamo {
    calcularVencimiento() {
        const d = new Date(this.fechaInicio);
        d.setDate(d.getDate() + 14);
        return d;
    }
    calcularMulta(socio, fecha) {
        const v = this.calcularVencimiento();
        if (!v)
            return 0;
        const dias = Math.max(0, Math.ceil((+fecha - +v) / 86_400_000));
        return socio.aplicaMultas() ? dias * 50 : 0;
    }
}
exports.PrestamoRegular = PrestamoRegular;
class PrestamoCorto extends Prestamo {
    calcularVencimiento() {
        const d = new Date(this.fechaInicio);
        d.setDate(d.getDate() + 7);
        return d;
    }
    calcularMulta(socio, fecha) {
        const v = this.calcularVencimiento();
        const dias = Math.max(0, Math.ceil((+fecha - +v) / 86_400_000));
        return socio.aplicaMultas() ? dias * 100 : 0; // multa doble
    }
}
exports.PrestamoCorto = PrestamoCorto;
class PrestamoReferencia extends Prestamo {
    calcularVencimiento() { return null; } // solo consulta en sala
    calcularMulta() { return 0; }
}
exports.PrestamoReferencia = PrestamoReferencia;
class PrestamoDigital extends Prestamo {
    calcularVencimiento() { return null; } // sin límite
    calcularMulta() { return 0; }
}
exports.PrestamoDigital = PrestamoDigital;
function crearPrestamo(tipo, libro, inicio) {
    switch (tipo) {
        case "corto": return new PrestamoCorto(libro, inicio);
        case "referencia": return new PrestamoReferencia(libro, inicio);
        case "digital": return new PrestamoDigital(libro, inicio);
        default: return new PrestamoRegular(libro, inicio);
    }
}
