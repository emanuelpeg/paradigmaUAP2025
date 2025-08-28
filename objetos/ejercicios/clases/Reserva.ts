import { Socio } from "./Socio";
import { Libro } from "./Libro";

export class Reserva {
    private _socio: Socio;
    private _libro: Libro;
    private _fechaReserva: Date;

    constructor(socio: Socio, libro: Libro, fechaReserva: Date = new Date()) {
        this._socio = socio;
        this._libro = libro;
        this._fechaReserva = fechaReserva;
    }

    get socio(): Socio {
        return this._socio;
    }

    get libro(): Libro {
        return this._libro;
    }

    get fechaReserva(): Date {
        return this._fechaReserva;
    }
}