import { Socio } from "./socio";

class Notificacion {
    constructor(
        private _mensaje: string,
        private _fecha: Date
    ) {}

    get mensaje() { return this._mensaje };
    get fecha() { return this._fecha };
}

export class EventoBiblioteca {
    constructor(
        private _nombreEvento: string,
        private _notificacion: Notificacion,
        private _sociosEnEvento: Socio[],
    ) {}

    registrarSocio(socio: Socio) {
        this.sociosEnEvento.push(socio);
    }

    eliminarSocio(socio: Socio) {
        const idxSocio: number = this._sociosEnEvento.indexOf(socio);
        if (idxSocio === -1) throw new Error("Socio no esta en evento");

        this._sociosEnEvento.splice(idxSocio, 1);
    }

    get nombreEvento() { return this._nombreEvento }
    get sociosEnEvento() { return this._sociosEnEvento }
}