export class EventoBiblioteca {
  constructor(
    public titulo: string,
    public fecha: Date,
    public descripcion: string = ""
  ) {}
}

export type Notificacion = {
  socioId: number;
  mensaje: string;
  fecha: Date;
};
