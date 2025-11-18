export class Autor {
    constructor(
        private _nombre: string,
        private _biografia: string,
        private _añoNacimiento: number
    ) {}

    get nombre() {
        return this._nombre;
    }

    get biografia() {
        return this._biografia;
    }

    get añoNacimiento() {
        return this._añoNacimiento;
    }

    toString() {
        return `${this.nombre} (n. ${this.añoNacimiento})`;
    }
}
