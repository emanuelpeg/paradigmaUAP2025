import { Socio } from "./Socio";

export class EventoBiblioteca {
  private inscritos: Socio[] = [];

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

  // Inscribir socio al evento
  inscribirSocio(socio: Socio) {
    if (!this.inscritos.includes(socio)) {
      this.inscritos.push(socio);
      console.log(`✅ ${socio.nombreCompleto} se inscribió al evento "${this._nombre}".`);
    }
  }

  // Notificar evento próximo
  notificarEvento() {
    const hoy = new Date();
    const diff = Math.ceil((this._fecha.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24));
    if (diff >= 0) {
      this.inscritos.forEach((socio) =>
        console.log(
          `Notificación para ${socio.nombreCompleto}: El evento "${this._nombre}" será en ${diff} día(s).`
        )
      );
    }
  }
}