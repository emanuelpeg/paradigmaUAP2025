import { Socio } from "./Socio";

export class EventoBiblioteca {
    private participantes: Socio[] = [];

    constructor(
        private _nombre: string,
        private _descripcion: string,
        private _fecha: Date
    ) {}

    get nombre() {
        return this._nombre;
    }

    get descripcion() {
        return this._descripcion;
    }

    get fecha() {
        return this._fecha;
    }

    inscribirSocio(socio: Socio) {
        if (!this.participantes.includes(socio)) {
            this.participantes.push(socio);
            socio.notificar(`Te inscribiste al evento "${this._nombre}" que se realizará el ${this._fecha.toLocaleDateString()}`);
        }
    }

    obtenerParticipantes(): Socio[] {
        return this.participantes;
    }
}
