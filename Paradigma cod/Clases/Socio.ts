// Socio.ts
import { Libro } from "./Libro";
import { EventoBiblioteca } from "./EventoBiblioteca"; //  Asegurate que este archivo exista

export class Socio {
    librosPrestados: Libro[] = [];
    historialLectura: Libro[] = [];
    multa: number = 0;
    notificaciones: string[] = [];
    eventosRegistrados: EventoBiblioteca[] = [];

    constructor(public idSocio: number, public nombre: string) {}

    puedePrestar(): boolean {
        return this.multa === 0;
    }

    agregarMulta(monto: number): void {
        this.multa += monto;
    }

    pagarMulta(monto: number): void {
        if (monto >= this.multa) {
            this.multa = 0;
        } else {
            this.multa -= monto;
        }
    }

    registrarLibroDevuelto(libro: Libro): void {
        this.historialLectura.push(libro);
        const index = this.librosPrestados.indexOf(libro);
        if (index !== -1) {
            this.librosPrestados.splice(index, 1);
        }
    }

    recibirNotificacion(mensaje: string): void {
        this.notificaciones.push(mensaje);
    }

    verNotificaciones(): string[] {
        return [...this.notificaciones];
    }

    limpiarNotificaciones(): void {
        this.notificaciones = [];
    }

    toString(): string {
        return `Socio(${this.idSocio}): ${this.nombre} | Multa: $${this.multa} | Libros prestados: ${this.librosPrestados.length}`;
    }
}