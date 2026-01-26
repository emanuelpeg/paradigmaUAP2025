import { Libro } from "./Libro";
import { Socio } from "./Socio";
import { Autor } from "./Autor";
import { EventoBiblioteca } from "./EventoBiblioteca";

export class Biblioteca {
    private inventario: Libro[] = [];
    private socios: Socio[] = [];
    private autores: Autor[] = [];
    private prestamos: Map<string, number> = new Map();
    private reservas: Map<string, number[]> = new Map();
    private multas: Map<number, number> = new Map();
    private fechasPrestamo: Map<string, Date> = new Map();
    private eventos: EventoBiblioteca[] = [];
    // Notificaciones por socio (idSocio -> mensajes)
    private notificaciones: Map<number, string[]> = new Map();
    private historialLectura: Map<number, Libro[]> = new Map(); // idSocio -> Libros leídos

    agregarAutor(nombre: string, biografia: string, anioNacimiento: number): Autor {
        const autor = new Autor(nombre, biografia, anioNacimiento);
        this.autores.push(autor);
        return autor;
    }

    agregarLibro(titulo: string, autor: Autor, isbn: string) {
        const libroCreado = new Libro(titulo, autor, isbn);
        this.inventario.push(libroCreado);
        console.log(`Libro agregado: ${libroCreado.titulo} de ${libroCreado.autor.nombre}`);
        return libroCreado;
    }

    registrarSocio(id: number, nombre: string, apellido: string) {
        const socioCreado = new Socio(id, nombre, apellido);
        this.socios.push(socioCreado);
        console.log(`Socio registrado: ${socioCreado.nombre} ${socioCreado.apellido}`);
        return socioCreado;
    }

    retirar(isbn: string, idSocio: number): boolean {
        // Verificar si el socio tiene multas pendientes
        if (this.multas.get(idSocio) && this.multas.get(idSocio)! > 0) {
            console.log(`El socio ${idSocio} tiene multas pendientes y no puede retirar libros.`);
            return false;
        }
        const libro = this.inventario.find(l => l.isbn === isbn);
        if (!libro) {
            console.log("Libro no encontrado");
            return false;
        }
        if (this.prestamos.has(isbn)) {
            // Si el libro está prestado, permitir reservar
            this.reservar(isbn, idSocio);
            console.log("El libro ya está prestado. Se agregó una reserva para el socio " + idSocio);
            return false;
        }
        this.prestamos.set(isbn, idSocio);
        this.fechasPrestamo.set(isbn, new Date());
        console.log(`Libro prestado a socio ${idSocio}`);
        return true;
    }

    devolver(isbn: string): boolean {
        if (!this.prestamos.has(isbn)) {
            console.log("El libro no está prestado");
            return false;
        }
        // Calcular multa si el libro está vencido
        const fechaPrestamo = this.fechasPrestamo.get(isbn);
        if (fechaPrestamo) {
            const hoy = new Date();
            const diasPrestamo = Math.floor((hoy.getTime() - fechaPrestamo.getTime()) / (1000 * 60 * 60 * 24));
            const diasPermitidos = 7; // Por ejemplo, 7 días de préstamo
            if (diasPrestamo > diasPermitidos) {
                const idSocio = this.prestamos.get(isbn);
                const diasRetraso = diasPrestamo - diasPermitidos;
                const multa = diasRetraso * 50;
                if (idSocio) {
                    const multaActual = this.multas.get(idSocio) || 0;
                    this.multas.set(idSocio, multaActual + multa);
                    const mensaje = `Tienes una multa de $${multa} por devolver tarde el libro con ISBN ${isbn}.`;
                    this.agregarNotificacion(idSocio, mensaje);
                    console.log(`El socio ${idSocio} tiene una multa de $${multa} por ${diasRetraso} días de retraso.`);
                }
            }
            this.fechasPrestamo.delete(isbn);
        }
        this.prestamos.delete(isbn);
        console.log(`Libro con ISBN ${isbn} devuelto`);
        // Notificar al primer socio en la cola de reservas
        const cola = this.reservas.get(isbn);
        if (cola && cola.length > 0) {
            const siguienteSocio = cola.shift();
            this.reservas.set(isbn, cola); // Actualizar la cola
            const mensaje = `¡Tu reserva del libro con ISBN ${isbn} está disponible!`;
            this.agregarNotificacion(siguienteSocio!, mensaje);
            console.log(`Notificación: El libro con ISBN ${isbn} está disponible para el socio ${siguienteSocio}`);
        }
        const idSocio = this.prestamos.get(isbn);
        const libro = this.inventario.find(l => l.isbn === isbn);
        if (idSocio && libro) {
            if (!this.historialLectura.has(idSocio)) {
                this.historialLectura.set(idSocio, []);
            }
            this.historialLectura.get(idSocio)!.push(libro);
        }
        return true;
    }

    // Reservar libro (agrega socio a la cola de reservas)
    reservar(isbn: string, idSocio: number): void {
        if (!this.reservas.has(isbn)) {
            this.reservas.set(isbn, []);
        }
        const cola = this.reservas.get(isbn);
        if (cola && !cola.includes(idSocio)) {
            cola.push(idSocio);
        }
    }

    // Verificar si un libro está prestado
    tienePrestadoLibro(isbn: string): boolean {
        return this.prestamos.has(isbn);
    }

    // Buscar libro por título, autor o ISBN
    buscarLibro(query: string): Libro[] {
        const resultado = this.inventario.filter(l =>
            l.titulo.toLowerCase().includes(query.toLowerCase()) ||
            l.autor.nombre.toLowerCase().includes(query.toLowerCase()) ||
            l.isbn.toLowerCase().includes(query.toLowerCase())
        );
        if (resultado.length === 0) {
            console.log("No se encontraron libros con ese criterio.");
        } else {
            console.log(`Libros encontrados: ${resultado.map(l => l.titulo).join(", ")}`);
        }
        return resultado;
    }

    buscarLibrosPorAutor(nombreAutor: string): Libro[] {
        const resultado = this.inventario.filter(l => l.autor.nombre.toLowerCase() === nombreAutor.toLowerCase());
        if (resultado.length === 0) {
            console.log("No se encontraron libros para ese autor.");
        } else {
            console.log(`Libros de ${nombreAutor}: ${resultado.map(l => l.titulo).join(", ")}`);
        }
        return resultado;
    }

    consultarMulta(idSocio: number): number {
        return this.multas.get(idSocio) || 0;
    }

    saldarMulta(idSocio: number): void {
        this.multas.set(idSocio, 0);
        console.log(`El socio ${idSocio} ha saldado su deuda.`);
    }

    agregarEvento(nombre: string, descripcion: string, fecha: Date): EventoBiblioteca {
        const evento = new EventoBiblioteca(nombre, descripcion, fecha);
        this.eventos.push(evento);
        return evento;
    }

    registrarSocioEnEvento(idSocio: number, nombreEvento: string): void {
        const evento = this.eventos.find(e => e.nombre === nombreEvento);
        if (evento && !evento.sociosRegistrados.includes(idSocio)) {
            evento.sociosRegistrados.push(idSocio);
            this.agregarNotificacion(idSocio, `Te has registrado al evento: ${evento.nombre}`);
        }
    }

    agregarNotificacion(idSocio: number, mensaje: string): void {
        if (!this.notificaciones.has(idSocio)) {
            this.notificaciones.set(idSocio, []);
        }
        this.notificaciones.get(idSocio)!.push(mensaje);
    }

    obtenerNotificaciones(idSocio: number): string[] {
        return this.notificaciones.get(idSocio) || [];
    }

    obtenerHistorialLectura(idSocio: number): Libro[] {
        return this.historialLectura.get(idSocio) || [];
    }

    recomendarLibros(idSocio: number): Libro[] {
        const historial = this.historialLectura.get(idSocio) || [];
        if (historial.length === 0) return [];
        // Buscar autores y títulos leídos
        const autoresLeidos = historial.map(l => l.autor.nombre.toLowerCase());
        const titulosLeidos = historial.map(l => l.titulo.toLowerCase());
        // Sugerir libros del inventario que no estén en el historial y coincidan por autor o título
        return this.inventario.filter(l =>
            !titulosLeidos.includes(l.titulo.toLowerCase()) &&
            (autoresLeidos.includes(l.autor.nombre.toLowerCase()) ||
             titulosLeidos.some(t => l.titulo.toLowerCase().includes(t)))
        );
    }
}