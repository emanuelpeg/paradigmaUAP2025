// TAREA 3: Clase Autor
export class Autor {
    private _nombre: string;
    private _biografia: string;
    private _anoNacimiento: number;

    constructor(nombre: string, biografia: string, anoNacimiento: number) {
        this._nombre = nombre;
        this._biografia = biografia;
        this._anoNacimiento = anoNacimiento;
    }

    public get nombre(): string { return this._nombre; }
    public get biografia(): string { return this._biografia; }
    public get anoNacimiento(): number { return this._anoNacimiento; }
}
