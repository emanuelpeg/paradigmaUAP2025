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

    static notificarVencimientoProximo(socio: Socio, libroTitulo: string, diasRestantes: number) {
        const mensaje = `El libro '${libroTitulo}' que tienes prestado vencerá en ${diasRestantes} días. Por favor, devuélvelo a tiempo para evitar multas.`;
        socio.notificar(mensaje, "Vencimiento Próximo");
        console.log(`\nNotificación: ${socio.nombreCompleto}, ${mensaje}`);
    }

    static notificarVencimiento(socio: Socio, libroTitulo: string) {
        const mensaje = `El libro '${libroTitulo}' que tienes prestado ha vencido. Por favor, devuélvelo lo antes posible para evitar multas adicionales.`;
        socio.notificar(mensaje, "Vencimiento");
        console.log(`\nNotificación: ${socio.nombreCompleto}, ${mensaje}`);
    }
    //Reserva disponible
    static notificarReserva(socio: Socio, libroTitulo: string) {
        const mensaje = `El libro '${libroTitulo}' que reservaste está ahora disponible.`;
        socio.notificar(mensaje, "Reserva");
        console.log(`\nNotificación: ${socio.nombreCompleto}, ${mensaje}`);
    }

    static notificarMulta(socio: Socio, monto: number) {
        const mensaje = `Tienes una multa de $${monto} por la devolución tardía de un libro.`;
        socio.notificar(mensaje, "Multa");
        console.log(`\nNotificación: ${socio.nombreCompleto}, ${mensaje}`);
    }

    static notificarPrestamo(socio: Socio, libroTitulo: string, fechaVencimiento: Date) {
        const mensaje = `Has prestado el libro '${libroTitulo}'. Debes devolverlo antes del ${fechaVencimiento.toDateString()}.`;
        socio.notificar(mensaje, "Préstamo");
        console.log(`\nNotificación: ${socio.nombreCompleto}, ${mensaje}`);
    }

    static notificarDevolucion(socio: Socio, libroTitulo: string) {
        const mensaje = `Has devuelto el libro '${libroTitulo}'. ¡Gracias!`;
        socio.notificar(mensaje, "Devolución");
        console.log(`\nNotificación: ${socio.nombreCompleto}, ${mensaje}`);
    }

    static notificarEventoProximo(socio: Socio, eventoNombre: string, fechaEvento: Date) {
        const mensaje = `El evento '${eventoNombre}' al cual estas anotado se llevará a cabo el ${fechaEvento.toDateString()}. ¡No te lo pierdas!`;
        socio.notificar(mensaje, "Evento Próximo");
        console.log(`\nNotificación: ${socio.nombreCompleto}, ${mensaje}`);
    }
    
}