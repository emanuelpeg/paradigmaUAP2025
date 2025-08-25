import { Libro } from "./Libro";
import { Socio } from "./Socio";
import { Autor } from "./Autor";
import { EventoBiblioteca } from "./EventoBiblioteca";

export class Biblioteca {
    private libros: Libro[] = [];
    private socios: Socio[] = [];
    private eventos: EventoBiblioteca[] = [];
    private multaPorDia: number = 200; // Monto de multa por dia de retraso

    agregarLibro(libro: Libro): void {
        this.libros.push(libro);
    }

    agregarSocio(socio: Socio): void {
        this.socios.push(socio);
    }

    prestarLibro(isbn: string, socioId: number, fechaPrestamo: Date): string {
        const libro = this.libros.find(l => l.isbn === isbn);
        const socio = this.socios.find(s => s.id === socioId);

        if (!libro || !socio) return "Libro o socio no encontrado.";
        if (!socio.puedePedirPrestamo()) return "El socio tiene deudas pendientes.";

        if (libro.estaDisponible()) {
            libro.prestar();
            socio.tomarPrestado(libro, fechaPrestamo);
            return `✔️ Libro "${libro.titulo}" prestado a ${socio.nombre}.`;
        }
        else {
            libro.reservar(socio);
            return `❌ Libro "${libro.titulo}" no disponible. ${socio.nombre} se encuentra ahora en lista de espera.`;
        }
    }

    devolverLibro(isbn: string, socioId: number, fechaDevolucion: Date): string {
        const libro = this.libros.find(l => l.isbn === isbn);
        const socio = this.socios.find(s => s.id === socioId);

        if (!libro || !socio) return "Libro o socio no encontrado.";

        const multa = socio.devolverLibro(libro, fechaDevolucion, this.multaPorDia);
        const siguienteSocio = libro.devolver();

        let mensaje = `✔️ Libro "${libro.titulo}" devuelto por ${socio.nombre}.`;
        if (multa > 0) mensaje += ` Multa aplicada: $${multa}.`;

        if(siguienteSocio) {
            mensaje += ` 📢 Notificación: ${siguienteSocio.nombre}, tu reserva de "${libro.titulo}" ya está disponible.`;
        }

        return mensaje;
    }

    buscarLibrosPorAutor(autor: Autor): Libro[] {
        return this.libros.filter(l => l.autor === autor);
    }

    crearEvento(evento: EventoBiblioteca): void {
        this.eventos.push(evento);
    }

    recomendarLibros(socioId: number): Libro[] {
        const socio = this.socios.find(s => s.id === socioId);
        if (!socio) return [];

        const historial = socio.getHistorial();
        if (historial.length === 0) return [];

        const autoresLeidos = historial.map(l => l.autor);
        return this.libros.filter(l => autoresLeidos.includes(l.autor) && !historial.includes(l));
    }
}