export abstract class Usuario {
  constructor(
    protected _id: number,
    protected _nombre: string,
    protected _apellido: string
  ) {}

  get id() { return this._id; }
  get nombre() { return this._nombre; }
  get apellido() { return this._apellido; }
  get nombreCompleto() { return `${this.nombre} ${this.apellido}`; }

  abstract puedeRetirar(): boolean;
  abstract maxLibros(): number;
  abstract periodoPrestamo(): number;
  abstract tieneMulta(): boolean;
}