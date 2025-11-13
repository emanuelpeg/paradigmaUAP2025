import { Socio } from "./Socio";

export class EventoBiblioteca {
  private inscritos: Socio[] = [];

  constructor(public nombre: string, public fecha: Date) {}

  inscribir(socio: Socio) {
    if (!this.inscritos.includes(socio)) this.inscritos.push(socio);
  }

  notificar() {
    for (const s of this.inscritos) {
      console.log(`Notificación a ${s.nombreCompleto}: Evento "${this.nombre}" el ${this.fecha.toLocaleDateString()}`);
    }
  }
}
