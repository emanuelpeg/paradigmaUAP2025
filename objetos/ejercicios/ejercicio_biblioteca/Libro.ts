import { Autor } from "./Autor";
import { Socio } from "./Socio";

export class Libro {
    private reservas: Socio[] = []; //mantengo lo de reservas de la tarea 1

    constructor(
        private _titulo: string,
        private _autor: Autor,   //ahora es un objeto Autor
        private _isbn: string
    ) {}

    get titulo() { return this._titulo }
    get autor() { return this._autor }  //devuelve el objeto
    get isbn() { return this._isbn }

    agregarReserva(socio: Socio): void {
        if (!this.reservas.includes(socio)) { //Evita que un mismo socio reserve varias veces el mismo libro
            this.reservas.push(socio);
        }
    }

    atenderReserva(): Socio | null {
        return this.reservas.shift() ?? null; //Devuelve y elimina el primer socio de la fila de reservas, o null si no hay nadie
    }

    tieneReservas(): boolean { //Si el libro tiene reservas, devuelve true
        return this.reservas.length > 0;
    }
}
