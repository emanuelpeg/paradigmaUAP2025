export class Autor {
    private _nombre: string;
    private _biografia: string;
    private _anioNacimiento: number;

    constructor(nombre: string, biografia: string, anioNacimiento: number) {
        this._nombre = nombre;
        this._biografia = biografia;
        this._anioNacimiento = anioNacimiento;
    }

    get nombre(): string {
        return this._nombre;
    }

    get biografia(): string {
        return this._biografia;
    }

    get anioNacimiento(): number {
        return this._anioNacimiento;
    }
}