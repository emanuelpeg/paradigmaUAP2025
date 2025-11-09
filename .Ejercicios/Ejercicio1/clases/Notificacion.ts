export class Notificacion {
    constructor(
        private mensaje: string,
        private fecha: Date = new Date()
    ){}
    get getMensaje(){ return this.mensaje; }
    get getFecha(){ return this.fecha; }
}