"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventoBiblioteca = void 0;
class EventoBiblioteca {
    titulo;
    fecha;
    descripcion;
    sociosInscriptos;
    constructor(titulo, fecha, descripcion = "", sociosInscriptos = []) {
        this.titulo = titulo;
        this.fecha = fecha;
        this.descripcion = descripcion;
        this.sociosInscriptos = sociosInscriptos;
    }
    static notificarPrestamo(nombreSocio, tituloLibro, vencimiento) {
        console.log(`${nombreSocio} retiró "${tituloLibro}". Vence: ${vencimiento.toLocaleDateString()}`);
    }
    static notificarDevolucion(nombreSocio, tituloLibro, multa) {
        console.log(`↩${nombreSocio} devolvió "${tituloLibro}". Multa: $${multa}`);
    }
    static notificarReserva(nombreSocio, tituloLibro) {
        console.log(`${nombreSocio}, tu reserva de "${tituloLibro}" está disponible.`);
    }
    static notificarEventoProximo(evento) {
        console.log(`Recordatorio: ${evento.titulo} — ${evento.fecha.toLocaleString()}`);
    }
}
exports.EventoBiblioteca = EventoBiblioteca;
