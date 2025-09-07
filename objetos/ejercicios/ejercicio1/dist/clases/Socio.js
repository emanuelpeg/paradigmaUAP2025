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
    HistorialLector = [];
    multa = 0;
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
    retirar(libro, duracion) {
        const vencimiento = new Date();
        vencimiento.setDate(vencimiento.getDate() + duracion);
        this.prestamos.push(new Prestamo(libro, vencimiento));
    }
    registrarLectura(libro) {
        if (!this.HistorialLector.includes(libro)) {
            this.HistorialLector.push(libro);
        }
    }
    devolver(libro) {
        const prestamo = this.tienePrestadoLibro(libro);
        if (!prestamo) {
            throw new Error("No esta prestado");
        }
        const hoy = new Date();
        if (hoy > prestamo.vencimiento) {
            const msPorDia = 1000 * 60 * 60 * 24;
            const diasRetraso = Math.ceil((hoy.getTime() - prestamo.vencimiento.getTime()) / msPorDia);
            const multaGenerada = diasRetraso * 50;
            this.multa += multaGenerada;
            console.log(`Multa generada: $${multaGenerada} por ${diasRetraso} días de retraso.`);
        }
        else {
            console.log("Libro devuelto a tiempo. No se genera multa.");
        }
        const indice = this.prestamos.indexOf(prestamo);
        // Eliminar el elemento en el indice
        this.prestamos.splice(indice, 1);
        return prestamo;
    }
    tienePrestadoLibro(libro) {
        return this.prestamos.find((p) => p.libro === libro) ?? null;
    }
    recibirNotificacion(mensaje) {
        console.log(`Notificacion para ${this.nombre} ${this.apellido}: ${mensaje}`);
    }
}
