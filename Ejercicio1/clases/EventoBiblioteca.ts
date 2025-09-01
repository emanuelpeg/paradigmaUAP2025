import { Socio, Notificacion } from "./Socio";

class EventoBiblioteca{
  private sociosRegistrados: Socio[] = [];
  constructor(private _tipo: string, public _lugar: string, public _fecha: Date) {}

  registrarSocio(socio: Socio) {
    this.sociosRegistrados.push(socio);
    socio.agregarNotificacion(`Te has registrado al evento '${this._tipo}' en ${this._lugar} el ${this._fecha.toLocaleDateString()}`);
  }

  notificarEventoProximo() {
    for (const socio of this.sociosRegistrados) {
      socio.agregarNotificacion(`Recordatorio: El evento '${this._tipo}' es el ${this._fecha.toLocaleDateString()} en ${this._lugar}.`);
    }
  }

  getInformacion(): string {
    return `Evento: ${this.tipo}, Lugar: ${this.lugar}, Fecha: ${this.fecha.toLocaleDateString()}`;
  }
  get tipo() {
    return this._tipo;
  }
  get lugar() {
    return this._lugar;
  }
  get fecha() {
    return this._fecha;
  }
}

