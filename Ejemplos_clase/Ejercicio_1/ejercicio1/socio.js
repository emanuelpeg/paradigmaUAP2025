"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Socio = void 0;
var Prestamo = /** @class */ (function () {
    function Prestamo(libro, vencimiento) {
        this.libro = libro;
        this.vencimiento = vencimiento;
    }
    return Prestamo;
}());
var Socio = /** @class */ (function () {
    function Socio(_id, _nombre, _apellido) {
        this._id = _id;
        this._nombre = _nombre;
        this._apellido = _apellido;
        this.prestamos = [];
        this.Reserva = [];
        this.librosRetirados = [];
        this.vencimientoPrestamo = [];
    }
    Object.defineProperty(Socio.prototype, "id", {
        get: function () { return this._id; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Socio.prototype, "nombre", {
        get: function () { return this._nombre; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Socio.prototype, "apellido", {
        get: function () { return this._apellido; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Socio.prototype, "NombreCompleto", {
        get: function () { return "".concat(this.nombre, " ").concat(this.apellido); },
        enumerable: false,
        configurable: true
    });
    Socio.prototype.retirar = function (libro, duracion) {
        this.librosRetirados.push(libro);
        var vencimiento = new Date();
        vencimiento.setDate(vencimiento.getDate() + duracion);
        this.prestamos.push(new Prestamo(libro, vencimiento));
    };
    Socio.prototype.devolver = function (libro) {
        var prestamo = this.prestamos.find(function (p) { return p.libro === libro; });
        if (!prestamo) {
            throw new Error("No esta prestado");
        }
        //indice toma el indice del array prestamo
        var indice = this.prestamos.indexOf(prestamo);
        //elimina el elemento en el indice
        this.prestamos.splice(indice, 1);
        return prestamo;
    };
    Socio.prototype.tienePrestadoLibro = function (libro) {
        var _a;
        return (_a = this.prestamos.find(function (p) { return p.libro === libro; })) !== null && _a !== void 0 ? _a : null;
    };
    Socio.prototype.reservaLibro = function (libro) {
        var _this = this;
        var _a;
        return (_a = this.Reserva.find(function (p) { return p.prestamos === _this.prestamos; })) !== null && _a !== void 0 ? _a : null;
    };
    return Socio;
}());
exports.Socio = Socio;
