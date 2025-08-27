import { Socio } from "./Socio";

export class EventoBiblioteca {
    constructor(
        public nombre: string,
        public fecha: Date,
        public descripcion: string
    ) {}

    notificarEvento(socio: Socio) {
        socio._notificaciones.push(`Evento: ${this.nombre} - ${this.descripcion} (Fecha: ${this.fecha.toDateString()})`);
    }
}