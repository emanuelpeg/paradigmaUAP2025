import { Libro } from "./Libro";

class Prestamo {
    constructor(public libro: Libro, public vencimiento: Date) {}
}

/** Duracion en dias de un prestamo */
type Duracion = number;

export class Socio {
    private prestamos: Prestamo[] = [];
    private _deuda: number = 0;

    constructor(
        private _id: number, 
        private _nombre: string, 
        private _apellido: string
    ) {}

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

    get prestamosActuales() {
    return this.prestamos;
    }

    get deuda() {
        return this._deuda;
    }

    retirar(libro: Libro, duracion: Duracion) {
        const vencimiento = new Date();
        vencimiento.setDate(vencimiento.getDate() + duracion);
        this.prestamos.push(new Prestamo(libro, vencimiento));
    }

    devolver(libro: Libro): Prestamo {
        const prestamo = this.tienePrestadoLibro(libro);

        if (!prestamo) {
            throw new Error("No esta prestado");
        }

        const indice = this.prestamos.indexOf(prestamo);
        this.prestamos.splice(indice, 1);

        const hoy = new Date();
        if (hoy > prestamo.vencimiento) {
            const diasAtraso = Math.floor(
                (hoy.getTime() - prestamo.vencimiento.getTime()) / (1000 * 60 * 60 * 24)
            );
            this._deuda += diasAtraso*50;
        }

        return prestamo;
    }

    tienePrestadoLibro(libro: Libro): Prestamo | null {
       return this.prestamos.find((p) => p.libro === libro) ?? null;
    }

    pagarMulta(monto: number) {
        if (monto <= 0) throw new Error("Monto invalido!!!");
        this._deuda -= monto;
        if (this._deuda < 0) this._deuda = 0;
    }
}