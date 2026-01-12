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
    multasPendientes = 0;
    historialLectura = [];
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
        return this.multasPendientes;
    }
    retirar(libro, duracion) {
        const vencimiento = new Date();
        vencimiento.setDate(vencimiento.getDate() + duracion);
        this.prestamos.push(new Prestamo(libro, vencimiento));
    }
    devolver(libro) {
        const prestamo = this.tienePrestadoLibro(libro);
        if (!prestamo) {
            throw new Error("No esta prestado");
        }
        const indice = this.prestamos.indexOf(prestamo);
        // Eliminar el elemento en el indice
        this.prestamos.splice(indice, 1);
        // actualizar historial
        this.historialLectura.push(libro);
        return prestamo;
    }
    tienePrestadoLibro(libro) {
        return this.prestamos.find((p) => p.libro === libro) ?? null;
    }
    obtenerHistorialLectura() {
        return [...this.historialLectura];
    }
    calcularMultaPorPrestamo(prestamo, multaDiaria) {
        const hoy = new Date();
        if (hoy <= prestamo.vencimiento)
            return 0;
        const msPorDia = 1000 * 60 * 60 * 24;
        const diasAtraso = Math.ceil((hoy.getTime() - prestamo.vencimiento.getTime()) / msPorDia);
        return diasAtraso * multaDiaria;
    }
    registrarMulta(monto) {
        this.multasPendientes += monto;
    }
    pagarMulta(monto) {
        this.multasPendientes = Math.max(0, this.multasPendientes - monto);
    }
    calcularMultaPendiente(multaDiaria) {
        // Multa acumulada por prestamos vencidos al dia de hoy
        let total = this.multasPendientes;
        for (const p of this.prestamos) {
            const adicional = this.calcularMultaPorPrestamo(p, multaDiaria);
            if (adicional > 0) {
                total += adicional;
            }
        }
        return total;
    }
    recomendacionesSimples() {
        const autores = new Set(this.historialLectura.map((l) => l.autor.nombre));
        const categorias = new Set(this.historialLectura.flatMap((l) => l.categorias));
        return [
            ...Array.from(autores).map((a) => `Buscar mas libros del autor: ${a}`),
            ...Array.from(categorias).map((c) => `Explorar categoria: ${c}`),
        ];
    }
}
exports.Socio = Socio;
