
export class Notificacion {
    mensaje: string;
    fecha: Date;
    tipo: string;

    constructor(mensaje: string, tipo: string, fecha?: Date) {
        this.mensaje = mensaje;
        this.tipo = tipo;
        this.fecha = fecha ?? new Date();
    }
}