import { Libro } from "./Libro";

export class Socio {
    public librosPrestados: { libro: Libro; fechaPrestamo: Date; fechaDevolucion?: Date }[] = [];
    public historialLectura: Libro[] = [];
    public multasPendientes: number = 0;
    public notificaciones: string[] = [];

    constructor(public nombre: string) {}

    prestarLibro(libro: Libro) {
        this.librosPrestados.push({ libro, fechaPrestamo: new Date() });
        this.historialLectura.push(libro);
    }

    devolverLibro(libro: Libro) {
        const prestamo = this.librosPrestados.find(p => p.libro === libro && !p.fechaDevolucion);
        if (prestamo) {
            prestamo.fechaDevolucion = new Date();
        }
    }

    agregarMulta(monto: number) {
        this.multasPendientes += monto;
    }

    pagarMultas() {
        this.multasPendientes = 0;
    }

    recibirNotificacion(mensaje: string) {
        this.notificaciones.push(mensaje);
    }
}

