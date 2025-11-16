// Biblioteca.ts
import { Libro } from "./Libro";
import { Socio } from "./Socio";
import { Autor } from "./Autor";
import { EventoBiblioteca } from "./EventoBiblioteca";

export class Biblioteca {
    private libros: Map<string, Libro> = new Map();
    private socios: Map<number, Socio> = new Map();
    private autores: Map<string, Autor> = new Map();
    private reservas: Map<string, { idSocio: number; timestamp: Date }[]> = new Map();
    private eventos: EventoBiblioteca[] = [];

    obtenerOCrearAutor(nombre: string, biografia = "", nacimiento?: number): Autor {
        if (!this.autores.has(nombre)) {
            const autor = new Autor(nombre, biografia, nacimiento);
            this.autores.set(nombre, autor);
        }
        return this.autores.get(nombre)!;
    }

    agregarLibro(titulo: string, nombreAutor: string, isbn: string, biografiaAutor = "", nacimiento?: number): Libro {
        const autor = this.obtenerOCrearAutor(nombreAutor, biografiaAutor, nacimiento);
        const libro = new Libro(titulo, autor, isbn);
        this.libros.set(isbn, libro);
        return libro;
    }

    buscarLibro(isbn: string): Libro | undefined {
        return this.libros.get(isbn);
    }

    agregarSocio(idSocio: number, nombre: string): Socio {
        const socio = new Socio(idSocio, nombre);
        this.socios.set(idSocio, socio);
        return socio;
    }

    buscarSocio(idSocio: number): Socio | undefined {
        return this.socios.get(idSocio);
    }

    prestarLibro(isbn: string, idSocio: number): boolean {
        const libro = this.buscarLibro(isbn);
        const socio = this.buscarSocio(idSocio);

        if (!libro || !socio) return false;
        if (!socio.puedePrestar()) {
            socio.recibirNotificacion("No puedes tomar libros: tienes multas pendientes.");
            return false;
        }

        if (libro.disponible) {
            if (libro.prestar(idSocio)) {
                socio.librosPrestados.push(libro);
                socio.recibirNotificacion(`Has tomado prestado el libro: '${libro.titulo}'`);
                return true;
            }
        } else {
            this.reservarLibro(isbn, idSocio);
            socio.recibirNotificacion(`El libro '${libro.titulo}' no está disponible. Has sido agregado a la cola de reservas.`);
        }
        return false;
    }

    devolverLibro(isbn: string, idSocio: number): boolean {
        const libro = this.buscarLibro(isbn);
        const socio = this.buscarSocio(idSocio);

        if (!libro || !socio || !socio.librosPrestados.includes(libro)) return false;

        if (libro.estaVencido()) {
            const multa = libro.diasRetraso() * 50;
            socio.agregarMulta(multa);
            socio.recibirNotificacion(`Libro devuelto con retraso. Multa: $${multa}`);
        }

        libro.devolver();
        socio.registrarLibroDevuelto(libro);
        this.notificarProximoReserva(isbn);
        return true;
    }

    reservarLibro(isbn: string, idSocio: number): void {
        const socio = this.buscarSocio(idSocio);
        if (socio && this.libros.has(isbn)) {
            if (!this.reservas.has(isbn)) {
                this.reservas.set(isbn, []);
            }
            this.reservas.get(isbn)!.push({ idSocio, timestamp: new Date() });
        }
    }

    private notificarProximoReserva(isbn: string): void {
        const cola = this.reservas.get(isbn);
        if (!cola || cola.length === 0) return;
        const proximo = cola.shift()!;
        const socio = this.buscarSocio(proximo.idSocio);
        const libro = this.buscarLibro(isbn);
        if (socio && libro) {
            socio.recibirNotificacion(`¡El libro '${libro.titulo}' ya está disponible para retirar!`);
        }
    }

    calcularMultasVencidas(): void {
        for (const libro of this.libros.values()) {
            if (!libro.disponible && libro.estaVencido()) {
                const idSocio = libro.idSocioPrestado;
                if (idSocio) {
                    const socio = this.buscarSocio(idSocio);
                    if (socio) {
                        const multa = libro.diasRetraso() * 50;
                        if (socio.multa < multa) {
                            socio.agregarMulta(multa);
                            socio.recibirNotificacion(`Tu libro '${libro.titulo}' está vencido. Multa: $${multa}`);
                        }
                    }
                }
            }
        }
    }

    agregarEvento(evento: EventoBiblioteca): void {
        this.eventos.push(evento);
    }

    registrarSocioAEvento(idSocio: number, nombreEvento: string): void {
        const socio = this.buscarSocio(idSocio);
        const evento = this.eventos.find(e => e.nombre === nombreEvento);
        if (socio && evento) {
            evento.registrarSocio(socio);
        }
    }

    notificarEventosProximos(): void {
        for (const evento of this.eventos) {
            if (evento.estaProximo()) {
                for (const socio of evento.asistentes) {
                    socio.recibirNotificacion(`Próximo evento: ${evento.nombre} el ${evento.fecha.toLocaleDateString()}`);
                }
            }
        }
    }

    recomendarLibros(idSocio: number): Libro[] {
        const socio = this.buscarSocio(idSocio);
        if (!socio || socio.historialLectura.length === 0) return [];

        const autoresFrecuentes = new Map<string, number>();
        for (const libro of socio.historialLectura) {
            const nombreAutor = libro.autor.nombre;
            autoresFrecuentes.set(nombreAutor, (autoresFrecuentes.get(nombreAutor) || 0) + 1);
        }

        if (autoresFrecuentes.size === 0) return [];
        const autorPreferido = [...autoresFrecuentes.entries()]
            .reduce((a, b) => a[1] > b[1] ? a : b)[0];

        const recomendaciones: Libro[] = [];
        for (const libro of this.libros.values()) {
            if (libro.autor.nombre === autorPreferido &&
                !socio.historialLectura.includes(libro) &&
                libro.disponible) {
                recomendaciones.push(libro);
            }
        }
        return recomendaciones;
    }
}