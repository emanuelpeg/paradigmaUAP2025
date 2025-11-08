import { Libro } from "./Libro";

export class Socio {
    private _librosPrestados: { libro: Libro; fechaPrestamo: Date; fechaDevolucion?: Date }[] = [];
    private _historialLectura: Libro[] = [];
    private _multasPendientes: number = 0;
    private _notificaciones: string[] = [];
    private _nombre: string;

    constructor(nombre: string) {
        this._nombre = nombre;
    }

    get nombre(): string {
        return this._nombre;
    }

    get librosPrestados(): { libro: Libro; fechaPrestamo: Date; fechaDevolucion?: Date }[] {
        return [...this._librosPrestados];
    }

    get historialLectura(): Libro[] {
        return [...this._historialLectura];
    }

    get multasPendientes(): number {
        return this._multasPendientes;
    }

    get notificaciones(): string[] {
        return [...this._notificaciones];
    }

    prestarLibro(libro: Libro): void {
        this._librosPrestados.push({ libro, fechaPrestamo: new Date() });
        this._historialLectura.push(libro);
    }

    devolverLibro(libro: Libro): void {
        const prestamo = this._librosPrestados.find(p => p.libro === libro && !p.fechaDevolucion);
        if (prestamo) {
            prestamo.fechaDevolucion = new Date();
        }
    }

    agregarMulta(monto: number): void {
        this._multasPendientes += monto;
    }

    pagarMultas(): void {
        this._multasPendientes = 0;
    }

    recibirNotificacion(mensaje: string): void {
        this._notificaciones.push(mensaje);
    }
}