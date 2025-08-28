import {Libro} from './Libro';
type Duracion = number; // en días

export class Prestamo {//   CLASE PRESTAMO
    constructor(public libro: Libro, public vencimiento: Date) {}
}


import { Notificacion } from "./Notificacion";


export class Socio {
    private notificaciones: Notificacion[] = [];
    private librosLeidos: Libro[] = [];

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
        return `${this._nombre} ${this._apellido}`;
    }


    public agregarNotificacion(notificacion: Notificacion): void {
        this.notificaciones.push(notificacion);
    }

    public agregarLibroLeido(libro: Libro): void {
        // Evita duplicados
        if (!this.librosLeidos.includes(libro)) {
            this.librosLeidos.push(libro);
        }
    }

    public getLibrosLeidos(): Libro[] {
        return this.librosLeidos;
    }

    public getNotificaciones(): Notificacion[] {
        return this.notificaciones;
    }

    public leerNotificaciones(): void {
        if (this.notificaciones.length === 0) {
            console.log("No tienes notificaciones.");
            return;
        }
        this.notificaciones.forEach(n => {
            console.log(`[${n.getFecha().toLocaleString()}] ${n.getTexto()}`);
        });
    }
}