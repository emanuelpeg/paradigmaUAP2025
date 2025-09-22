import { Autor } from './Autor';
import { EstadoLibro } from './tipos';
import { DIAS_PRESTAMO } from './constantes';

export class Libro {
    private _titulo: string;
    private _autor: Autor;
    private _isbn: string;
    private _estado: EstadoLibro;
    private _fechaPrestamo?: Date;
    private _fechaVencimiento?: Date;
    private _socioId?: number;
    private _colaReservas: number[];

    constructor(titulo: string, autor: Autor, isbn: string) {
        this._titulo = titulo;
        this._autor = autor;
        this._isbn = isbn;
        this._estado = EstadoLibro.DISPONIBLE;
        this._colaReservas = [];
    }

    // Getters
    public get titulo(): string { return this._titulo; }
    public get autor(): Autor { return this._autor; }
    public get isbn(): string { return this._isbn; }
    public get estado(): EstadoLibro { return this._estado; }
    public get socioId(): number | undefined { return this._socioId; }
    public get colaReservas(): number[] { return [...this._colaReservas]; }

    // Métodos de préstamo
    public prestar(socioId: number): boolean {
        if (this._estado !== EstadoLibro.DISPONIBLE) return false;
        
        this._estado = EstadoLibro.PRESTADO;
        this._socioId = socioId;
        this._fechaPrestamo = new Date();
        this._fechaVencimiento = new Date();
        this._fechaVencimiento.setDate(this._fechaVencimiento.getDate() + DIAS_PRESTAMO);
        
        return true;
    }

    public devolver(): number | null {
        if (this._estado !== EstadoLibro.PRESTADO) return null;
        
        this._estado = EstadoLibro.DISPONIBLE;
        this._socioId = undefined;
        this._fechaPrestamo = undefined;
        this._fechaVencimiento = undefined;
        
        // Si hay reservas, retornar el siguiente socio
        if (this._colaReservas.length > 0) {
            return this._colaReservas.shift()!;
        }
        
        return null;
    }

    // Métodos de reserva
    public reservar(socioId: number): boolean {
        if (this._colaReservas.includes(socioId)) return false;
        
        this._colaReservas.push(socioId);
        return true;
    }

    // Métodos de multa
    public estaVencido(): boolean {
        if (!this._fechaVencimiento) return false;
        return new Date() > this._fechaVencimiento;
    }

    public diasVencido(): number {
        if (!this.estaVencido() || !this._fechaVencimiento) return 0;
        
        const diferencia = new Date().getTime() - this._fechaVencimiento.getTime();
        return Math.ceil(diferencia / (1000 * 60 * 60 * 24));
    }
}
