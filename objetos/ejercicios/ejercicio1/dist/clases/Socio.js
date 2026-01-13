class Prestamo {
    libro;
    vencimiento;
    constructor(libro, vencimiento) {
        this.libro = libro;
        this.vencimiento = vencimiento;
    }
}
export class Socio {
    _id;
    _nombre;
    _apellido;
    prestamos = [];
    multasPendientes = 0;
    historialLectura = [];
    reservas = [];
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
        if (!this.puedeRetirar()) {
            throw new Error("No tiene permisos para retirar este libro");
        }
        if (this.deuda > 0) {
            throw new Error("No puede retirar libros con multas pendientes");
        }
        const duracionFinal = duracion ?? this.getDuracionPrestamo();
        const vencimiento = new Date();
        vencimiento.setDate(vencimiento.getDate() + duracionFinal);
        this.prestamos.push(new Prestamo(libro, vencimiento));
    }
    devolver(libro) {
        const prestamo = this.tienePrestadoLibro(libro);
        if (!prestamo) {
            throw new Error("No tiene este libro prestado");
        }
        this.prestamos = this.prestamos.filter((p) => p.libro !== libro);
        this.historialLectura.push(libro);
    }
    tienePrestadoLibro(libro) {
        return this.prestamos.find((p) => p.libro === libro) ?? null;
    }
    registrarMulta(monto) {
        this.multasPendientes += monto;
    }
    pagarMulta(monto) {
        if (monto > this.multasPendientes)
            throw new Error("Monto mayor a la deuda");
        this.multasPendientes -= monto;
    }
    puedeRetirar() {
        return this.prestamos.length < this.getMaximoLibros();
    }
    agregarReserva(libro) {
        this.reservas.push(libro);
    }
    obtenerHistorialLectura() {
        return [...this.historialLectura];
    }
    recomendacionesSimples() {
        return this.historialLectura.map((libro) => `Recomendado: ${libro.titulo}`);
    }
}
export class SocioRegular extends Socio {
    getDuracionPrestamo() {
        return 14;
    }
    getMaximoLibros() {
        return 3;
    }
}
export class SocioVIP extends Socio {
    getDuracionPrestamo() {
        return 30;
    }
    getMaximoLibros() {
        return 10;
    }
}
export class SocioEmpleado extends Socio {
    getDuracionPrestamo() {
        return 60;
    }
    getMaximoLibros() {
        return 20;
    }
}
export class SocioVisitante extends Socio {
    getDuracionPrestamo() {
        return 7;
    }
    getMaximoLibros() {
        return 1;
    }
}
export var TipoSocio;
(function (TipoSocio) {
    TipoSocio[TipoSocio["REGULAR"] = 0] = "REGULAR";
    TipoSocio[TipoSocio["VIP"] = 1] = "VIP";
    TipoSocio[TipoSocio["EMPLEADO"] = 2] = "EMPLEADO";
    TipoSocio[TipoSocio["VISITANTE"] = 3] = "VISITANTE";
})(TipoSocio || (TipoSocio = {}));
export class SocioFactory {
    static crearSocio(tipo, id, nombre, apellido) {
        switch (tipo) {
            case TipoSocio.REGULAR:
                return new SocioRegular(id, nombre, apellido);
            case TipoSocio.VIP:
                return new SocioVIP(id, nombre, apellido);
            case TipoSocio.EMPLEADO:
                return new SocioEmpleado(id, nombre, apellido);
            case TipoSocio.VISITANTE:
                return new SocioVisitante(id, nombre, apellido);
            default:
                throw new Error("Tipo de socio no válido");
        }
    }
}
