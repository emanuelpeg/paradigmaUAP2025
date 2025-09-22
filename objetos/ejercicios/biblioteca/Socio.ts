import { MAX_LIBROS_POR_SOCIO } from './constantes';

export class Socio {
    private _id: number;
    private _nombre: string;
    private _apellido: string;
    private _email: string;
    private _librosPrestados: string[];
    private _fechaRegistro: Date;
    private _multas: number;
    private _historialLectura: string[];
    private _librosReservados: string[];
    private _eventosRegistrados: number[];

    constructor(id: number, nombre: string, apellido: string, email: string) {
        this._id = id;
        this._nombre = nombre;
        this._apellido = apellido;
        this._email = email;
        this._librosPrestados = [];
        this._fechaRegistro = new Date();
        this._multas = 0;
        this._historialLectura = [];
        this._librosReservados = [];
        this._eventosRegistrados = [];
    }

    // Getters
    public get id(): number { return this._id; }
    public get nombre(): string { return this._nombre; }
    public get apellido(): string { return this._apellido; }
    public get email(): string { return this._email; }
    public get librosPrestados(): string[] { return [...this._librosPrestados]; }
    public get fechaRegistro(): Date { return this._fechaRegistro; }
    public get multas(): number { return this._multas; }
    public get historialLectura(): string[] { return [...this._historialLectura]; }
    public get librosReservados(): string[] { return [...this._librosReservados]; }
    public get eventosRegistrados(): number[] { return [...this._eventosRegistrados]; }

    // Métodos de gestión de libros
    public agregarLibro(isbn: string): boolean {
        if (this._librosPrestados.includes(isbn)) return false;
        this._librosPrestados.push(isbn);
        return true;
    }

    public removerLibro(isbn: string): boolean {
        const index = this._librosPrestados.indexOf(isbn);
        if (index === -1) return false;
        
        this._librosPrestados.splice(index, 1);
        this._historialLectura.push(isbn);
        return true;
    }

    public puedeTomarPrestado(): boolean {
        return this._librosPrestados.length < MAX_LIBROS_POR_SOCIO && this._multas === 0;
    }

    // Métodos de reservas
    public agregarReserva(isbn: string): boolean {
        if (this._librosReservados.includes(isbn)) return false;
        this._librosReservados.push(isbn);
        return true;
    }

    public removerReserva(isbn: string): boolean {
        const index = this._librosReservados.indexOf(isbn);
        if (index === -1) return false;
        
        this._librosReservados.splice(index, 1);
        return true;
    }

    // Métodos de multas
    public agregarMulta(cantidad: number): void {
        this._multas += cantidad;
    }

    public pagarMulta(cantidad: number): boolean {
        if (cantidad > this._multas) return false;
        this._multas -= cantidad;
        return true;
    }

    // Métodos de eventos
    public registrarEnEvento(eventoId: number): boolean {
        if (this._eventosRegistrados.includes(eventoId)) return false;
        this._eventosRegistrados.push(eventoId);
        return true;
    }

    public desregistrarDeEvento(eventoId: number): boolean {
        const index = this._eventosRegistrados.indexOf(eventoId);
        if (index === -1) return false;
        
        this._eventosRegistrados.splice(index, 1);
        return true;
    }
}
