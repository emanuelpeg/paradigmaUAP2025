export class Socio{
    constructor(private _id: number, private _nombre: string, private _apellido: string) {}

    get id(): number {
        return this._id;
    }

    get nombre(): string {
        return this._nombre;
    }

    get apellido(): string {
        return this._apellido;
    }

    get nombreCompleto(): string {
        return `${this._nombre} ${this._apellido}`;
    }
}