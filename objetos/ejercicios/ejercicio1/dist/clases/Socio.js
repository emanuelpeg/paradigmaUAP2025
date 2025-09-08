"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Socio = void 0;
class Prestamo {
    libro;
    vencimiento;
    constructor(libro, vencimiento) {
        this.libro = libro;
        this.vencimiento = vencimiento;
    }
}
class Socio {
    _id;
    _nombre;
    _apellido;
    prestamos = [];
    historial = [];
    multas = 0;
    constructor(_id, _nombre, _apellido) {
        this._id = _id;
        this._nombre = _nombre;
        this._apellido = _apellido;
    }
    get id() {
        return this._id;
    }
    get nombre() {
        return this._nombre;
    }
    get apellido() {
        return this._apellido;
    }
    get nombreCompleto() {
        return `${this.nombre} ${this.apellido}`;
    }
    get deuda() {
        return this.multas;
    }
    pagar(monto) {
        this.multas = Math.max(0, this.multas - monto);
    }
    retirar(libro, duracion) {
        if (this.multas > 0)
            throw new Error("Socio tiene multas pendientes");
        const vencimiento = new Date();
        vencimiento.setDate(vencimiento.getDate() + duracion);
        this.prestamos.push(new Prestamo(libro, vencimiento));
        this.historial.push(libro);
    }
    retirarConVencimiento(libro, vencimiento) {
        this.prestamos.push(new Prestamo(libro, vencimiento));
        this.historial.push(libro);
    }
    devolver(libro) {
        const prestamo = this.tienePrestadoLibro(libro);
        if (!prestamo) {
            throw new Error("No esta prestado");
        }
        const hoy = new Date();
        if (hoy > prestamo.vencimiento) {
            const diasAtraso = Math.ceil((hoy.getTime() - prestamo.vencimiento.getTime()) / (1000 * 60 * 60 * 24));
            this.multas += diasAtraso * 50;
        }
        const indice = this.prestamos.indexOf(prestamo);
        this.prestamos.splice(indice, 1);
        return prestamo;
    }
    tienePrestadoLibro(libro) {
        return this.prestamos.find((p) => p.libro === libro) ?? null;
    }
    historialLectura() {
        return this.historial.map((l) => l.titulo);
    }
    recomendar(bibliotecaLibros) {
        const autoresLeidos = new Set(this.historial.map((l) => l.autor.nombre));
        return bibliotecaLibros.filter((l) => autoresLeidos.has(l.autor.nombre));
    }
}
exports.Socio = Socio;
