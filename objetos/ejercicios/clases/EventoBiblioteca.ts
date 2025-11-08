import { Socio } from "./Socio";

export class EventoBiblioteca {
    private _titulo: string;
    private _descripcion: string;
    private _fecha: Date;
    private _sociosRegistrados: Socio[];

    constructor(titulo: string, descripcion: string, fecha: Date) {
        this._titulo = titulo;
        this._descripcion = descripcion;
        this._fecha = fecha;
        this._sociosRegistrados = [];
    }

    get titulo(): string {
        return this._titulo;
    }

    get descripcion(): string {
        return this._descripcion;
    }

    get fecha(): Date {
        return this._fecha;
    }

    get sociosRegistrados(): Socio[] {
        return [...this._sociosRegistrados]; // Return a copy to maintain encapsulation
    }

    public registrarSocio(socio: Socio): void {
        this._sociosRegistrados.push(socio);
    }
}