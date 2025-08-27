import { Socio } from "./Socio";
import { biblioteca } from "./Bibiblioteca";

export class EventoBiblioteca {
    constructor(
        private _descripcion: string,
        private _fecha: Date,
        private _ubicacion: string,
        public participantes: Socio[] = []
    ){}
    get descripcion() {return this._descripcion;}
    get fecha() {return this._fecha;}
    get ubicacion() {return this._ubicacion;}

    agregarParticipante(socio: Socio): void {
        this.participantes.push(socio);
    }
    eliminarParticipante(socio: Socio): void {
        const index = this.participantes.indexOf(socio);
        this.participantes.splice(index, 1);
    }
    notificarParticipantes(mensaje: string): void {
        this.participantes.forEach(socio => {
            biblioteca.notificar(mensaje, socio);
        });
    }
}
