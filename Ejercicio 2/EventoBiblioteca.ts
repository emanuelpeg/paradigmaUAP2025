 export class EventoBiblioteca {
  private _participantes = new Set<number>(); // ids de socio

  constructor(
    private _id: number,
    private _titulo: string,
    private _fecha: Date,
    private _descripcion: string = ""
  ) {}

  get id() { return this._id; }
  get titulo() { return this._titulo; }
  get fecha() { return this._fecha; }
  get descripcion() { return this._descripcion; }
  get participantes() { return this._participantes; }

  registrarParticipante(socioId: number) {
    this._participantes.add(socioId);
  }
}

