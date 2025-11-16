import { Libro } from "./Libro";
import { Socio } from "./Socio";
import { Autor } from "./Autor";
import { EventoBiblioteca } from "./EventoBiblioteca";

class Biblioteca {
    private inventario: Libro[] = [];
    private socios: Socio[] = [];
    private DURACION = 14;
    private autores: Autor[] = [];
    private eventos: EventoBiblioteca[] = [];

    agregarAutor(nombre: string, biografia: string, añoNacimiento: number): Autor {
        const autor = new Autor(nombre, biografia, añoNacimiento);
        this.autores.push(autor);
        return autor;
    }

    buscarAutor(nombre: string): Autor | null {
        return this.autores.find((autor) => autor.nombre === nombre) ?? null;
    }

    agregarLibro(titulo: string, autor:Autor, isbn: string): Libro {
        const libroCreado = new Libro(titulo, autor, isbn);
        this.inventario.push(libroCreado);
        return libroCreado;
    }

    buscarLibro(isbn: string): Libro | null {
        const libroEncontrado = this.inventario.find(
            (libro) => libro.isbn === isbn
        );
        if (libroEncontrado) {
            return libroEncontrado;
        }
        return null;
    }

    registrarSocio(id: number, nombre: string, apellido: string) {
        const socioCreado = new Socio(id, nombre, apellido);
        this.socios.push(socioCreado);
        return socioCreado;
    }

    buscarSocio(id: number): Socio | null {
        return this.socios.find((socio) => socio.id === id) ?? null;
    }

    retirarLibro(socioId: number, libroIsbn: string): void {
        const socio = this.buscarSocio(socioId);
        const libro = this.buscarLibro(libroIsbn);

        if (!socio || !libro) {
            throw new Error("No se encontro");
        }

        if (socio.deuda > 0) {
            throw new Error(`El socio ${socio.nombreCompleto} tiene deuda pendiente de $${socio.deuda}`);
        }

        for(const socio of this.socios) {
            if (socio.tienePrestadoLibro(libro)) {
                throw new Error("Libro no disponible")
            }
        }

        if (!libro.disponible) {
        throw new Error("Libro no disponible");
}

        socio.retirar(libro, this.DURACION);
        libro.marcarComoPrestado();
    }

    devolverLibro(socioId: number, libroIsbn: string) {
        const socio = this.buscarSocio(socioId);
        const libro = this.buscarLibro(libroIsbn);

        if (!socio || !libro) {
            throw new Error("No se encontro");
        }

        socio.devolver(libro);

        if(libro.tieneReservas()) {
            const siguienteSocio = libro.obtenerProximaReserva();
            if (siguienteSocio) {
                siguienteSocio.retirar(libro, this.DURACION);
                libro.marcarComoPrestado();
                console.log(`Aviso: ${siguienteSocio.nombreCompleto} recibió el libro reservado "${libro.titulo}"`);
            } else {
                libro.marcarComoDisponible();
            }
        }
    }
    
    consultarEstadoLibro(libroIsbn: string): string {
        const libro = this.buscarLibro(libroIsbn);
        if (!libro) {
            return "El libro no existe";
        }
        return libro.disponible ? "Disponible" : "Prestado";
    }

    consultarEstadoSocio(id: number): string {
        const socio = this.buscarSocio(id);
        if (!socio) return "El socio no existe";

        const prestamos = socio.prestamosActuales;
        if (prestamos.length === 0) {
            return `${socio.nombreCompleto} no tiene libros prestados.`;
        }

        //mostrar detalle de cada préstamo
        let detalle = prestamos.map((p) => `- ${p.libro.titulo} (vence el ${p.vencimiento.toLocaleDateString()})`).join("\n");
        return `Estado de ${socio.nombreCompleto}:\n${detalle}`;
    }

    crearEvento(nombre: string, descripcion: string, fecha: Date): EventoBiblioteca {
        const evento = new EventoBiblioteca(nombre, descripcion, fecha);
        this.eventos.push(evento);
        return evento;
    }

    listarEventos(): EventoBiblioteca[] {
        return this.eventos;
    }

    notificarVencimientos() {
        const hoy = new Date();
        this.socios.forEach((socio) => {
            socio.prestamosActuales.forEach((prestamo) => {
                if (hoy > prestamo.vencimiento) {
                    socio.notificar(`⚠️ El libro "${prestamo.libro.titulo}" está vencido desde el ${prestamo.vencimiento.toLocaleDateString()}`);
                }
            });
        });
    }

    recomendarLibros(socioId: number): Libro[] {
        const socio = this.buscarSocio(socioId);
        if (!socio) throw new Error("Socio no encontrado");

        const historial = socio.historialLectura;
        if (historial.length === 0) return [];

        const autoresLeidos = new Set(historial.map(l => l.autor));

        const recomendaciones = this.inventario.filter(libro => 
            autoresLeidos.has(libro.autor) &&
            !historial.includes(libro) &&
            !socio.tienePrestadoLibro(libro)
        );

        return recomendaciones;
    }

}

export const biblioteca = new Biblioteca();
export type { Biblioteca };