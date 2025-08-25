import { Libro } from "./Libro";
import { Socio } from "./Socio";
import { Reserva } from "./Reserva";
import { EventoBiblioteca } from "./EventoBiblioteca";

export class Biblioteca {
    private libros: Libro[] = [];
    private socios: Socio[] = [];
    private reservas: Reserva[] = [];
    private eventos: EventoBiblioteca[] = [];

    agregarLibro(libro: Libro) {
        this.libros.push(libro);
    }

    registrarSocio(socio: Socio) {
        this.socios.push(socio);
    }

    prestarLibro(libro: Libro, socio: Socio) {
        if (!libro.disponible) {
            this.reservarLibro(libro, socio);
            return false;
        }
        if (socio.multasPendientes > 0) {
            socio.recibirNotificacion("No puede retirar libros hasta pagar sus multas.");
            return false;
        }
        libro.disponible = false;
        socio.prestarLibro(libro);
        return true;
    }

    devolverLibro(libro: Libro, socio: Socio, diasRetraso: number = 0) {
        libro.disponible = true;
        socio.devolverLibro(libro);

        if (diasRetraso > 0) {
            const multa = diasRetraso * 50;
            socio.agregarMulta(multa);
            socio.recibirNotificacion(`Multa de $${multa} por devolución tardía.`);
        }

        // Ver si hay reservas en cola
        const reserva = this.reservas.find(r => r.libro === libro);
        if (reserva) {
            reserva.socio.recibirNotificacion(`El libro '${libro.titulo}' ya está disponible para retiro.`);
            this.reservas = this.reservas.filter(r => r !== reserva);
        }
    }

    reservarLibro(libro: Libro, socio: Socio) {
        this.reservas.push(new Reserva(socio, libro));
        socio.recibirNotificacion(`Se reservó el libro '${libro.titulo}'. Será notificado cuando esté disponible.`);
    }

    organizarEvento(evento: EventoBiblioteca) {
        this.eventos.push(evento);
        evento.sociosRegistrados.forEach(s => s.recibirNotificacion(`Nuevo evento: ${evento.titulo}`));
    }

    recomendarLibros(socio: Socio): Libro[] {
        const autoresLeidos = socio.historialLectura.map(l => l.autor);
        return this.libros.filter(
            l => autoresLeidos.includes(l.autor) && !socio.historialLectura.includes(l)
        );
    }
}
