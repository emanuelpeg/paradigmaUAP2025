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
        this._multa = 0;
        this._historialDeLectura = [];
    }
    Object.defineProperty(Socio.prototype, "historialDeLectura", {
        get: function () {
            return this._historialDeLectura;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Socio.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Socio.prototype, "nombre", {
        get: function () {
            return this._nombre;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Socio.prototype, "apellido", {
        get: function () {
            return this._apellido;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Socio.prototype, "nombreCompleto", {
        get: function () {
            return "".concat(this.nombre, " ").concat(this.apellido);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Socio.prototype, "multa", {
        get: function () {
            return this._multa;
        },
        enumerable: false,
        configurable: true
    });
    //metodo para agregar una multa
    Socio.prototype.agregarMulta = function (monto) {
        this._multa += monto;
    };
    //metodo para saldar una multa
    Socio.prototype.saldarMulta = function () {
        this._multa = 0;
    };
    Socio.prototype.retirar = function (libro, duracion) {
        var vencimiento = new Date();
        vencimiento.setDate(vencimiento.getDate() + duracion);
        this.prestamos.push(new Prestamo(libro, vencimiento));
    };
    Socio.prototype.devolver = function (libro) {
        var prestamo = this.tienePrestadoLibro(libro);
        if (!prestamo) {
            throw new Error("No esta prestado");
        }
        var indice = this.prestamos.indexOf(prestamo);
        // Eliminar el elemento al que apunta el indice y borra un solo elemento
        this.prestamos.splice(indice, 1);
        //agregamos el isbn al historial de lectura = lista: string
        this._historialDeLectura.push(libro.isbn);
        return prestamo;
    };
    Socio.prototype.tienePrestadoLibro = function (libro) {
        var _a;
        return (_a = this.prestamos.find(function (p) { return p.libro === libro; })) !== null && _a !== void 0 ? _a : null;
    };
    Socio.prototype.haLeidoLibro = function (isbn) {
        return this._historialDeLectura.includes(isbn); //si el socio ha leido, retorna true, sino false
    };
    Socio.prototype.prestamosVencidos = function () {
        var hoy = new Date();
        return this.prestamos.filter(function (prestamo) { return prestamo.vencimiento < hoy; });
    };
    return Socio;
}());
exports.Socio = Socio;
