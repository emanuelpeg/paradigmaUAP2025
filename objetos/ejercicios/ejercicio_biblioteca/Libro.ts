import { Autor } from "./Autor";

export class Libro {
    private reservas: any[] = []; //mantengo lo de reservas de la tarea 1

    constructor(
        private _titulo: string,
        private _autor: Autor,   //ahora es un objeto Autor
        private _isbn: string
    ) {}

    get titulo() { return this._titulo }
    get autor() { return this._autor }  //devuelve el objeto
    get isbn() { return this._isbn }

    agregarReserva(socio: any): void {
        if (!this.reservas.includes(socio)) {
            this.reservas.push(socio);
        }
    }

    atenderReserva(): any | null {
        return this.reservas.shift() ?? null;
    }

    tieneReservas(): boolean {
        return this.reservas.length > 0;
    }
}
