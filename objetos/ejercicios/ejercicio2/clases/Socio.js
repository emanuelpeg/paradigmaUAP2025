"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocioFactory = exports.TipoSocio = exports.Visitante = exports.Empleado = exports.SocioVIP = exports.SocioRegular = exports.Socio = void 0;
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
    }
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
    Socio.prototype.retirar = function (libro, duracion) {
        if (!this.puedeRetirar(libro)) {
            throw new Error("No tiene permisos para retirar este libro");
        }
        var duracionFinal = duracion !== null && duracion !== void 0 ? duracion : this.getDuracionPrestamo();
        var vencimiento = new Date();
        vencimiento.setDate(vencimiento.getDate() + duracionFinal);
        this.prestamos.push(new Prestamo(libro, vencimiento));
    };
    Socio.prototype.devolver = function (libro) {
        var prestamo = this.tienePrestadoLibro(libro);
        if (!prestamo) {
            throw new Error("No esta prestado");
        }
        var indice = this.prestamos.indexOf(prestamo);
        this.prestamos.splice(indice, 1);
        return prestamo;
    };
    Socio.prototype.tienePrestadoLibro = function (libro) {
        var _a;
        return (_a = this.prestamos.find(function (p) { return p.libro === libro; })) !== null && _a !== void 0 ? _a : null;
    };
    Object.defineProperty(Socio.prototype, "librosEnPrestamo", {
        get: function () {
            return this.prestamos.length;
        },
        enumerable: false,
        configurable: true
    });
    Socio.prototype.puedeRetirar = function (libro) {
        return this.prestamos.length < this.getMaximoLibros();
    };
    return Socio;
}());
exports.Socio = Socio;
var SocioRegular = /** @class */ (function (_super) {
    __extends(SocioRegular, _super);
    function SocioRegular() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SocioRegular.prototype.getDuracionPrestamo = function () {
        return 14;
    };
    SocioRegular.prototype.getMaximoLibros = function () {
        return 3;
    };
    SocioRegular.prototype.devolver = function (libro) {
        // Manejar potenciales multas
        return _super.prototype.devolver.call(this, libro);
    };
    return SocioRegular;
}(Socio));
exports.SocioRegular = SocioRegular;
var SocioVIP = /** @class */ (function (_super) {
    __extends(SocioVIP, _super);
    function SocioVIP() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SocioVIP.prototype.getDuracionPrestamo = function () {
        return 21;
    };
    SocioVIP.prototype.getMaximoLibros = function () {
        return 5;
    };
    return SocioVIP;
}(Socio));
exports.SocioVIP = SocioVIP;
var Empleado = /** @class */ (function (_super) {
    __extends(Empleado, _super);
    function Empleado() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Empleado.prototype.getDuracionPrestamo = function () {
        return 30;
    };
    Empleado.prototype.getMaximoLibros = function () {
        return Infinity;
    };
    return Empleado;
}(Socio));
exports.Empleado = Empleado;
var Visitante = /** @class */ (function (_super) {
    __extends(Visitante, _super);
    function Visitante() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Visitante.prototype.puedeRetirar = function (libro) {
        return false;
    };
    Visitante.prototype.getDuracionPrestamo = function () {
        return 0;
    };
    Visitante.prototype.getMaximoLibros = function () {
        return 0;
    };
    return Visitante;
}(Socio));
exports.Visitante = Visitante;
var TipoSocio;
(function (TipoSocio) {
    TipoSocio["REGULAR"] = "regular";
    TipoSocio["VIP"] = "vip";
    TipoSocio["EMPLEADO"] = "empleado";
    TipoSocio["VISITANTE"] = "visitante";
})(TipoSocio || (exports.TipoSocio = TipoSocio = {}));
var SocioFactory = /** @class */ (function () {
    function SocioFactory() {
    }
    SocioFactory.crearSocio = function (tipo, id, nombre, apellido) {
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
    };
    return SocioFactory;
}());
exports.SocioFactory = SocioFactory;
