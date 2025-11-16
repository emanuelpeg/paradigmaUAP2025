// EventoBiblioteca.ts
import { Socio } from "./Socio";

export class EventoBiblioteca {
    asistentes: Socio[] = [];

    constructor(
        public nombre: string,
        public fecha: Date,
        public descripcion: string = ""
    ) {}

    registrarSocio(socio: Socio): void {
        if (!this.asistentes.includes(socio)) {
            this.asistentes.push(socio);
            socio.eventosRegistrados.push(this);
            socio.recibirNotificacion(`Te has registrado en el evento: ${this.nombre}`);
        }
    }

    estaProximo(dias: number = 7): boolean {
        const ahora = new Date();
        return this.fecha > ahora && (this.fecha.getTime() - ahora.getTime()) / (1000 * 60 * 60 * 24) <= dias;
    }

    toString(): string {
        const fechaStr = this.fecha.toLocaleString();
        return `Evento: ${this.nombre} - ${fechaStr} | ${this.descripcion}`;
    }
}