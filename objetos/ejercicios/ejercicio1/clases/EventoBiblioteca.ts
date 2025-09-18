import { Socio } from "./Socio";

export class EventoBiblioteca {
  private participantes: Socio[] = [];

  constructor(
    public nombre: string,
    public descripcion: string,
    public fecha: Date
  ) {}

  registrarSocio(socio: Socio) {
    if (!this.participantes.includes(socio)) {
      this.participantes.push(socio);
      socio.notificar(`Te has registrado al evento: ${this.nombre}`);
    }
  }

  notificarParticipantes(mensaje: string) {
    this.participantes.forEach(socio => socio.notificar(`[Evento] ${mensaje}`));
  }
}