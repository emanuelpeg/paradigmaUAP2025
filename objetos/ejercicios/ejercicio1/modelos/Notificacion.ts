import { EventoBiblioteca } from "./EventoBiblioteca"

export class Notificacion {
    constructor(
        private _mensaje: string,
        private _fecha: Date,
        private _fechaVencimiento: Date,
        private _Evento: EventoBiblioteca
    ) {}

    vencida() {
        return this._fechaVencimiento <= this._fecha;
    }

    get mensaje() { return this._mensaje };
    get fecha() { return this._fecha };
    get fechaVencimiento() { return this._fechaVencimiento };
    get Evento() { return this._Evento };
}