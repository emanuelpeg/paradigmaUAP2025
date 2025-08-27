import { Socio } from "./Socio";


export class EventoBiblioteca {
    nombreEvento: string;
    fecha: Date;
    descripcion: string;
    socios: Socio[];

    constructor(nombreEvento: string, fecha: Date, descripcion: string) {
        this.nombreEvento = nombreEvento;
        this.fecha = fecha;
        this.descripcion = descripcion;
        this.socios = [];
    }

    //vencimiento
    static notificarVencimientoProximo(socioNombre: string, libroTitulo: string, diasRestantes: number) {
        console.log(`\nNotificación: ${socioNombre}, el libro '${libroTitulo}' que tienes prestado vencerá en ${diasRestantes} días. Por favor, devuélvelo a tiempo para evitar multas.`);
    }

    static notificarVencimiento(socioNombre: string, libroTitulo: string) {
        console.log(`\nNotificación: ${socioNombre}, el libro '${libroTitulo}' que tienes prestado ha vencido. Por favor, devuélvelo lo antes posible para evitar multas adicionales.`);
    }
    //Reserva disponible
    static notificarReserva(socioNombre: string, libroTitulo: string) {
        console.log(`\nNotificación: ${socioNombre}, el libro '${libroTitulo}' que reservaste está ahora disponible.`);
    }

    static notificarMulta(socioNombre: string, monto: number) {
        console.log(`\nNotificación: ${socioNombre}, tienes una multa de $${monto} por la devolución tardía de un libro.`);
    }

    static notificarPrestamo(socioNombre: string, libroTitulo: string, fechaVencimiento: Date) {
        console.log(`\nNotificación: ${socioNombre}, has prestado el libro '${libroTitulo}'. Debes devolverlo antes del ${fechaVencimiento.toDateString()}.`);
    }

    static notificarDevolucion(socioNombre: string, libroTitulo: string) {
        console.log(`\nNotificación: ${socioNombre}, has devuelto el libro '${libroTitulo}'. ¡Gracias!`);
    }

    static notificarEventoProximo(socioNombre: string, eventoNombre: string, fechaEvento: Date) {
        console.log(`\nNotificación: ${socioNombre}, el evento '${eventoNombre}' al cual estas anotado se llevará a cabo el ${fechaEvento.toDateString()}. ¡No te lo pierdas!`);
    }
    
}