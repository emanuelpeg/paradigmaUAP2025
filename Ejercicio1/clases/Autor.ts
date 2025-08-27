export class Autor {
  constructor(private _nombre: string, private _apellido: string, private _biografia: string, private _fechaNacimiento: Date) {}

  get nombreCompleto(): string {
    return `${this._nombre} ${this._apellido}`;
  }

  get nombre(): string {
    return this._nombre;
  }

    get apellido(): string {
        return this._apellido;
    }

    get biografia(): string {
        return this._biografia;
    }
    get fechaNacimiento(): Date {
        return this._fechaNacimiento;
    }

}