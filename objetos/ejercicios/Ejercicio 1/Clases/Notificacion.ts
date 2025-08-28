    
import { Socio } from "./Socio";

export class Notificacion {
    private static ultimoId: number = 0;
    private id: number;
    private fecha: Date;
    private texto: string;

    private constructor(texto: string) {
        Notificacion.ultimoId++;
        this.id = Notificacion.ultimoId;
        this.fecha = new Date();
        this.texto = texto;
    }

    public static crearNotificacionMulta(socio: Socio, libro: string, monto: number): Notificacion {
        const texto = `Multa generada: El libro "${libro}" fue devuelto tarde. Monto: $${monto}.`;
        return new Notificacion(texto);
    }

    public static crearNotificacionReservaDisponible(socio: Socio, libro: string): Notificacion {
        const texto = `Reserva disponible: El libro "${libro}" ya está disponible para que lo retire.`;
        return new Notificacion(texto);
    }

    // Puedes agregar más métodos estáticos para otros tipos de notificación

    public static enviarNotificacion(texto: string, socio: Socio): Notificacion {
        const notificacion = new Notificacion(texto);
        socio.agregarNotificacion(notificacion);
        return notificacion;
    }
    // Notifica a un socio que un libro reservado está disponible
    public static NotificacionLibroDisponible(socio: Socio, libro: string): void {
        const texto = `NOTIFICACION ENVIADA: Buenos días ${socio.nombre}, el libro "${libro}" ya está disponible para que lo venga a retirar.`;
        Notificacion.enviarNotificacion(texto, socio);
        console.log(texto);
    }

    // Notifica a un socio sobre un evento de la biblioteca
    public static NotificacionEvento(socio: Socio, nombreEvento: string, descripcion: string, expositor: string | null): void {
        let texto = `Evento: ${nombreEvento}. ${descripcion}`;
        if (expositor) {
            texto += ` | Expositor: ${expositor}`;
        }
        Notificacion.enviarNotificacion(texto, socio);
        console.log(`NOTIFICACION ENVIADA a ${socio.nombre}: ${texto}`);
    }

     // Notifica a un socio que un préstamo está por vencer (faltan 2 días)
    public static NotificacionVencimientoProximo(socio: Socio, libro: string, fechaVencimiento: Date): void {
        const texto = `Aviso: El libro "${libro}" que tienes prestado vence el ${fechaVencimiento.toLocaleDateString()}. Por favor, devuélvelo a tiempo.`;
        Notificacion.enviarNotificacion(texto, socio);
        console.log(`NOTIFICACION ENVIADA a ${socio.nombre}: ${texto}`);
    }

    // Notifica a un socio que un préstamo ya se venció
    public static NotificacionPrestamoVencido(socio: Socio, libro: string, fechaVencimiento: Date): void {
        const texto = `Aviso: El libro "${libro}" que tienes prestado venció el ${fechaVencimiento.toLocaleDateString()}. Por favor, realiza la devolución lo antes posible.`;
        Notificacion.enviarNotificacion(texto, socio);
        console.log(`NOTIFICACION ENVIADA a ${socio.nombre}: ${texto}`);
    }
    
    // Notifica una recomendación de libro al socio
    public static NotificacionRecomendaciones(socio: Socio, libro: string, autor: string): void {
        const texto = `Recomendación: Te sugerimos leer "${libro}" de ${autor}, basado en tus lecturas previas.`;
        Notificacion.enviarNotificacion(texto, socio);
        console.log(`NOTIFICACION ENVIADA a ${socio.nombre}: ${texto}`);
    }
    public getId(): number {
        return this.id;
    }

    public getFecha(): Date {
        return this.fecha;
    }

    public getTexto(): string {
        return this.texto;
    }
}
