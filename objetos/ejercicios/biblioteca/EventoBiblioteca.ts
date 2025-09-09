// TAREA 4: Clase EventoBiblioteca
import { TipoEvento } from './tipos';

export class EventoBiblioteca {
    private _id: number;
    private _nombre: string;
    private _descripcion: string;
    private _fecha: Date;
    private _tipo: TipoEvento;
    private _sociosRegistrados: number[];
    private _capacidadMaxima: number;

    constructor(id: number, nombre: string, descripcion: string, fecha: Date, tipo: TipoEvento, capacidadMaxima: number = 50) {
        this._id = id;
        this._nombre = nombre;
        this._descripcion = descripcion;
        this._fecha = fecha;
        this._tipo = tipo;
        this._sociosRegistrados = [];
        this._capacidadMaxima = capacidadMaxima;
    }

    // Getters
    public get id(): number { return this._id; }
    public get nombre(): string { return this._nombre; }
    public get descripcion(): string { return this._descripcion; }
    public get fecha(): Date { return this._fecha; }
    public get tipo(): TipoEvento { return this._tipo; }
    public get sociosRegistrados(): number[] { return [...this._sociosRegistrados]; }
    public get capacidadMaxima(): number { return this._capacidadMaxima; }

    // Métodos
    public registrarSocio(socioId: number): boolean {
        if (this._sociosRegistrados.length >= this._capacidadMaxima) return false;
        if (this._sociosRegistrados.includes(socioId)) return false;
        
        this._sociosRegistrados.push(socioId);
        return true;
    }

    public desregistrarSocio(socioId: number): boolean {
        const index = this._sociosRegistrados.indexOf(socioId);
        if (index === -1) return false;
        
        this._sociosRegistrados.splice(index, 1);
        return true;
    }

    public esProximo(): boolean {
        const hoy = new Date();
        const diferenciaDias = Math.ceil((this._fecha.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24));
        return diferenciaDias >= 0 && diferenciaDias <= 7; // Próximos 7 días
    }

    public hayEspacio(): boolean {
        return this._sociosRegistrados.length < this._capacidadMaxima;
    }
}