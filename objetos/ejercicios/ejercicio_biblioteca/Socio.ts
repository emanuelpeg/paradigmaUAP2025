import { Libro } from "./Libro";
import { EventoBiblioteca } from "./EventoBiblioteca";

class Prestamo {
    constructor(public libro: Libro, public vencimiento: Date) {}
}
type Duracion = number;

export class Socio {
    private prestamos: Prestamo[] = [];
    private _multas: number = 0;   //total de multas acumuladas
    private notificaciones: string[] = [];
    private eventosRegistrados: EventoBiblioteca[] = []; //eventos del socio
    private historial: Libro[] = []; //libros que ha retirado alguna vez

    constructor(
        private _id: number,
        private _nombre: string,
        private _apellido: string //No necesito inicializar las listas porque ya lo hice arriba, multas empieza en 0
    ) {}

    get id() { return this._id }
    get nombre() { return this._nombre }
    get apellido() { return this._apellido }
    get nombreCompleto() { return `${this._nombre} ${this._apellido}` }
    get multas() { return this._multas }  //poder consultar multas

    retirar(libro: Libro, duracion : Duracion){
        const vencimiento = new Date(); 
        vencimiento.setDate(vencimiento.getDate() + duracion);
        this.prestamos.push(new Prestamo(libro, vencimiento));
    }

    devolver(libro: Libro){
        const prestamo = this.prestamos.find(p => p.libro === libro);
        if(!prestamo) {
            console.log("No está prestado");
            return;
        }

        const indice = this.prestamos.indexOf(prestamo);
        this.prestamos.splice(indice, 1);

        this.historial.push(libro);

        //cálculo de multa
        const hoy = new Date();
        if (hoy > prestamo.vencimiento) {
            const diasRetraso = Math.ceil(
                (hoy.getTime() - prestamo.vencimiento.getTime()) / (1000 * 60 * 60 * 24)
            );
            const multa = diasRetraso * 50;
            this._multas += multa;
            console.log(`${this.nombreCompleto} devolvió tarde y recibió una multa de $${multa}. Multa total: $${this._multas}`);
        }

        return prestamo;
    }

    getHistorial(): Libro[] {
        return this.historial;
    }

    tienePrestadoLibro(libro: Libro): Prestamo | null {
        return this.prestamos.find((p) => p.libro === libro) ?? null;
    }

    pagarMulta(monto: number) {
        if (monto <= 0) return;
        this._multas -= monto;
        if (this._multas < 0) this._multas = 0;
        console.log(`${this.nombreCompleto} pagó $${monto}. Multa pendiente: $${this._multas}`);
    }

    tieneMultasPendientes(): boolean {
        return this._multas > 0;
    }

    notificar(mensaje: string) {
        this.notificaciones.push(mensaje);
    }

    verNotificaciones(): string[] {
        const pendientes = [...this.notificaciones];
        this.notificaciones = []; //se vacía después de verlas
        return pendientes;
    }

    registrarEvento(evento: EventoBiblioteca) {
        this.eventosRegistrados.push(evento);
        this.notificar(`Te registraste al evento "${evento.titulo}" (${evento.fecha.toDateString()})`);
    }

    getEventos(): EventoBiblioteca[] {
        return this.eventosRegistrados;
    }
}
