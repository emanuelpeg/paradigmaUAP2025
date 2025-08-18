import { Libro } from "./Libro";

type Duracion = number;

class Prestamo{
    constructor(
        public libro: Libro,
        private duracion: Duracion
    ){}
}

export class Socio {
    private librosRetirados: Prestamo[] = [];

    constructor(
        private _id: number,
        private _nombre: string,
        private _apellido: string
    ){}

    get id() {return this._id;}
    get nombre() {return this._nombre;}
    get apellido() {return this._apellido;}
    get nombreCompleto() {return `${this._nombre} ${this._apellido}`;}

    retirar(libro: Libro, duracion: Duracion) {
        const vencimiento = new Date();
        vencimiento.setDate(vencimiento.getDate() + duracion);
        this.librosRetirados.push(new Prestamo(libro, duracion));
    }

    devolver(libro: Libro) {
        const prestamo = this.librosRetirados.find(p => p.libro === libro);
        if (!prestamo) {
            throw new Error("El libro no fue retirado por este socio.");
        } 
        const index = this.librosRetirados.indexOf(prestamo);
        this.librosRetirados.splice(index, 1);

        return prestamo;
    }
}