"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocioFactory = exports.PrestamoDigital = exports.PrestamoReferencia = exports.PrestamoCorto = exports.PrestamoRegular = exports.Prestamo = exports.TipoSocio = exports.Visitante = exports.Empleado = exports.SocioVIP = exports.SocioRegular = exports.Socio = void 0;
const Libro_1 = require("./Libro");
class Socio {
    _id;
    _nombre;
    _apellido;
    prestamos = [];
    multasPendientes = 0;
    historialLectura = [];
    reservas = [];
    /** Devuelve la lista de préstamos activos */
    getPrestamos() {
        return [...this.prestamos];
    }
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
    retirar(libro, tipo = "regular") {
        if (!this.puedeRetirar(libro)) {
            throw new Error("No tiene permisos para retirar este libro");
        }
        if (this.deuda > 0) {
            throw new Error("No puede retirar libros con multas pendientes");
        }
        let prestamo;
        switch (tipo) {
            case "regular":
                prestamo = new PrestamoRegular(libro, this);
                break;
            case "corto":
                prestamo = new PrestamoCorto(libro, this);
                break;
            case "referencia":
                prestamo = new PrestamoReferencia(libro, this);
                break;
            case "digital":
                prestamo = new PrestamoDigital(libro, this);
                break;
            default: prestamo = new PrestamoRegular(libro, this);
        }
        this.prestamos.push(prestamo);
    }
    devolver(libro) {
        const prestamo = this.tienePrestadoLibro(libro);
        if (!prestamo) {
            throw new Error("No esta prestado");
        }
        const hoy = new Date();
        if (prestamo.vencimiento && hoy > prestamo.vencimiento) {
            const msPorDia = 1000 * 60 * 60 * 24;
            const diasAtraso = Math.ceil((hoy.getTime() - prestamo.vencimiento.getTime()) / msPorDia);
            const multa = prestamo.calcularMulta(diasAtraso);
            this.registrarMulta(multa);
        }
        const indice = this.prestamos.indexOf(prestamo);
        this.prestamos.splice(indice, 1);
        this.historialLectura.push(libro);
        return prestamo;
    }
    tienePrestadoLibro(libro) {
        return this.prestamos.find((p) => p.libro === libro) ?? null;
    }
    get librosEnPrestamo() {
        return this.prestamos.length;
    }
    puedeRetirar(libro) {
        return this.prestamos.length < this.getMaximoLibros();
    }
    registrarMulta(monto) {
        this.multasPendientes += monto;
    }
    pagarMulta(monto) {
        this.multasPendientes = Math.max(0, this.multasPendientes - monto);
    }
    agregarReserva(libro) {
        this.reservas.push(libro);
    }
    obtenerHistorialLectura() {
        return [...this.historialLectura];
    }
    recomendacionesSimples() {
        const autores = new Set(this.historialLectura.map((l) => l.autor.nombre ?? l.autor));
        return Array.from(autores).map((a) => `Buscar más libros del autor: ${a}`);
    }
}
exports.Socio = Socio;
class SocioRegular extends Socio {
    getDuracionPrestamo() {
        return 14;
    }
    getMaximoLibros() {
        return 3;
    }
    devolver(libro) {
        // Manejar potenciales multas
        return super.devolver(libro);
    }
}
exports.SocioRegular = SocioRegular;
class SocioVIP extends Socio {
    getDuracionPrestamo() {
        return 21;
    }
    getMaximoLibros() {
        return 5;
    }
}
exports.SocioVIP = SocioVIP;
class Empleado extends Socio {
    getDuracionPrestamo() {
        return 30;
    }
    getMaximoLibros() {
        return Infinity;
    }
}
exports.Empleado = Empleado;
class Visitante extends Socio {
    puedeRetirar(libro) {
        return false;
    }
    getDuracionPrestamo() {
        return 0;
    }
    getMaximoLibros() {
        return 0;
    }
}
exports.Visitante = Visitante;
var TipoSocio;
(function (TipoSocio) {
    TipoSocio["REGULAR"] = "regular";
    TipoSocio["VIP"] = "vip";
    TipoSocio["EMPLEADO"] = "empleado";
    TipoSocio["VISITANTE"] = "visitante";
})(TipoSocio || (exports.TipoSocio = TipoSocio = {}));
// Polimorfismo: Tipos de Préstamo
class Prestamo {
    libro;
    socio;
    constructor(libro, socio) {
        this.libro = libro;
        this.socio = socio;
    }
}
exports.Prestamo = Prestamo;
class PrestamoRegular extends Prestamo {
    get vencimiento() {
        const vencimiento = new Date();
        vencimiento.setDate(vencimiento.getDate() + 14);
        return vencimiento;
    }
    calcularMulta(diasAtraso) {
        return diasAtraso * 50;
    }
}
exports.PrestamoRegular = PrestamoRegular;
class PrestamoCorto extends Prestamo {
    get vencimiento() {
        const vencimiento = new Date();
        vencimiento.setDate(vencimiento.getDate() + 7);
        return vencimiento;
    }
    calcularMulta(diasAtraso) {
        return diasAtraso * 100;
    }
}
exports.PrestamoCorto = PrestamoCorto;
class PrestamoReferencia extends Prestamo {
    get vencimiento() {
        return null; // Solo consulta en sala
    }
    calcularMulta() {
        return 0;
    }
}
exports.PrestamoReferencia = PrestamoReferencia;
class PrestamoDigital extends Prestamo {
    get vencimiento() {
        return null; // Sin límite
    }
    calcularMulta() {
        return 0;
    }
}
exports.PrestamoDigital = PrestamoDigital;
class SocioFactory {
    static crearSocio(tipo, id, nombre, apellido) {
        switch (tipo) {
            case TipoSocio.REGULAR:
                return new SocioRegular(id, nombre, apellido);
            case TipoSocio.VIP:
                return new SocioVIP(id, nombre, apellido);
            case TipoSocio.EMPLEADO:
                return new Empleado(id, nombre, apellido);
            case TipoSocio.VISITANTE:
                return new Visitante(id, nombre, apellido);
            default:
                throw new Error("Tipo de socio no valido");
        }
    }
}
exports.SocioFactory = SocioFactory;
//# sourceMappingURL=Socio.js.map