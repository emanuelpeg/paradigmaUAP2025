import { Autor } from "./Autor";
import { Socio } from "./socio";



export class Libro {
    private _colaReserva: Socio[] = [];
    constructor(
        private _titulo: string,
        private _autor: Autor,
        private _isbn: string,
        private _disponible: boolean = true,
        private _categoria: string
    ) { }

    estaDisponible(libroISBN: number) {
        return this._disponible;
    }

    eliminarDeColaReserva(socio: Socio) {
        // usar indexof no funciono, usar find
        const socioEnCola = this._colaReserva.find(s => s.id === socio.id);

        if (!socioEnCola) {
            throw new Error("Socio no encontrado");
        }
        const idx = this._colaReserva.indexOf(socioEnCola);
        this._colaReserva.splice(idx, 1)
    }

    agregarAColaReserva(socio: Socio) {
        const socioEstaEnCola: boolean = this._colaReserva.some(s => s.id === socio.id);
        if (socioEstaEnCola) {
            throw new Error("El socio ya esta en la cola");
        } else {
            this._colaReserva.push(socio);
        }
    }

    get titulo() { return this._titulo; }
    get autor() { return this._autor; }
    get isbn() { return this._isbn; }
    get disponible() { return this._disponible; }
    get categoria() { return this._categoria; }
    get colaReserva() { return this._colaReserva; }
    set disponible(disponible: boolean) { this._disponible = disponible; }
}
