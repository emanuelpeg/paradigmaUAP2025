export class Socio{
    constructor(
        private _id: number,
        private _nombre: string,
        private _apellido: string
    ) {}
    get id() {
        return this._id;
    }
    get nombre() {
        return this._nombre;
    }
    get apellido() {
        return `${this._nombre} ${this._apellido}`;
    }
    get nombreCompleto() {
        return `${this._nombre} ${this._apellido}`;

    
    }
}