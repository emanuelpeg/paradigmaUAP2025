//clase para representar los avisos o notificaciones enviadas a los socios
export class Aviso {
  public mensaje: string;
  public fecha: Date;
  
  constructor(mensaje: string, fecha: Date = new Date()) {
    this.mensaje = mensaje;
    this.fecha = fecha;
  }
}
