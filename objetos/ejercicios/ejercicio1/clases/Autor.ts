export class Autor {
  private _nombre: string;
  private _biografia: string;
  private _anioNacimiento: number;

  constructor(nombre: string, biografia: string, anioNacimiento: number) {
    this._nombre = nombre;
    this._biografia = biografia;
    this._anioNacimiento = anioNacimiento;
  }

  public get nombre(): string {
    return this._nombre;
  }
  public set nombre(value: string) {
    this._nombre = value;
  }

  public get biografia(): string {
    return this._biografia;
  }
  public set biografia(value: string) {
    this._biografia = value;
  }

  public get anioNacimiento(): number {
    return this._anioNacimiento;
  }
  public set anioNacimiento(value: number) {
    this._anioNacimiento = value;
  }
}
