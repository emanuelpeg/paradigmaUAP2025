import { Autor } from "./Autor";

export class Libro {
    private reservas: any[] = [];

    constructor(
        private _titulo: string,
        private _autor: Autor,   
        private _isbn: string 
    ) {}

    get titulo() { return this._titulo }
    get autor() { return this._autor }  
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
