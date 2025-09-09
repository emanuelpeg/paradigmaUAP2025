import { Socio } from "./Socio";

export class EventoBiblioteca {
  private _nombre: string;
  private _fecha: Date;
  private _descripcion: string;
  private _sociosRegistrados: Socio[];

  constructor(
    nombre: string,
    fecha: Date,
    descripcion: string,
    sociosRegistrados: Socio[] = []
  ) {
    this._nombre = nombre;
    this._fecha = fecha;
    this._descripcion = descripcion;
    this._sociosRegistrados = sociosRegistrados;
  }

  
  public get nombre(): string {
    return this._nombre;
  }
  public set nombre(value: string) {
    this._nombre = value;
  }

  public get fecha(): Date {
    return this._fecha;
  }
  public set fecha(value: Date) {
    this._fecha = value;
  }

  public get descripcion(): string {
    return this._descripcion;
  }
  public set descripcion(value: string) {
    this._descripcion = value;
  }

  public get sociosRegistrados(): Socio[] {
    return [...this._sociosRegistrados];
  }

  public registrarSocio(socio: Socio): void {
    if (!this._sociosRegistrados.includes(socio)) {
      this._sociosRegistrados.push(socio);
      socio.notificar(`Te has registrado al evento: ${this._nombre}`);
    }
  }
}
