//clase para representar notificaciones
export class Notificacion {
  constructor(
    public mensaje: string,
    public fecha: Date = new Date()
  ) {}
}