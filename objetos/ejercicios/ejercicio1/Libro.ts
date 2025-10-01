import { Socio } from "./Socio";

export class Libro {
    private _disponible: boolean = true;
    private reservas: Socio[] = [];

    constructor(
        private _titulo: string,
        private _autor: string,
        private _isbn: string
    ) {}

    get titulo() {
        return this._titulo
    }
    get autor() {
        return this._autor
    }
    get isbn() {
        return this._isbn
    }

    get disponible() {
        return this._disponible
    }

    marcarComoPrestado() {
        this._disponible = false;
    }

    marcarComoDisponible() {
        this._disponible = true;
    }

    reservar(socio: Socio) {
        if (!this.reservas.includes(socio)) {
            this.reservas.push(socio);
        }
    }

    obtenerProximaReserva(): Socio | undefined {
        return this.reservas.shift();
    }

    tieneReservas(): boolean {
        return this.reservas.length > 0;
    }
}