import { Notificacion } from "./Notificacion";
import { Socio } from "./socio";



export class EventoBiblioteca {
    private _notificaciones: Notificacion[] = [];
    private _sociosEnEvento: Socio[] = [];
    constructor(
        private _nombreEvento: string,
    ) { }

    registrarSocio(socio: Socio) {
        this.sociosEnEvento.push(socio);
    }

    eliminarSocio(socio: Socio) {
        const idxSocio: number = this._sociosEnEvento.indexOf(socio);
        if (idxSocio === -1) throw new Error("Socio no esta en evento");

        this._sociosEnEvento.splice(idxSocio, 1);
    }

    agregarNotificacion(mensaje: string, fechaVencimiento: Date) {
        const ahora = new Date();
        const notificacion = new Notificacion(mensaje, ahora, fechaVencimiento, this);
        this._notificaciones.push(notificacion);

        this._sociosEnEvento.forEach(socio => {
            socio.agregarNotificacion(notificacion);
        });
    }

    eliminarNotificacion(notificacion: Notificacion) {
        const idx = this._notificaciones.indexOf(notificacion);

        if (idx !== -1) {
            this._notificaciones.splice(idx, 1);

            this._sociosEnEvento.forEach(socio => {
                socio.eliminarNotificacion(notificacion);
            })
        }
    }


    get nombreEvento() { return this._nombreEvento }
    get sociosEnEvento() { return this._sociosEnEvento }
    get notificaciones() { return this._notificaciones }
}