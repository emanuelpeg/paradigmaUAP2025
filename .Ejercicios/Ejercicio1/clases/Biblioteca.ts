import { Libro } from "./Libro"; // A través de la leyenda de "Libro[]"
import { Prestamo, Socio } from "./Socio";
import { Reserva } from "./Reserva";
import { Multa } from "./Multa";
import { Autor } from "./Autor";
import { EventoBiblioteca } from "./EventoBiblioteca";
import { Notificacion } from "./Notificacion";

class Biblioteca {
    private inventario: Libro[] = [];
    private socios: Socio[] = [];
    private eventos: EventoBiblioteca[] = [];
    private DURACION = 14;

    get libros()
    {
        return this.inventario;
    }
    // Funciones de libros
    agregarLibro(titulo: string, autor: Autor, isbn: string): Libro {
        const libroCreado = new Libro(titulo,autor,isbn);
        this.inventario.push(libroCreado);
        return libroCreado;
    }

    buscarLibro(isbn: string): Libro | null {
        //return this.inventario.find(libro => libro.isbn === isbn);
        const libroEncontrado = this.inventario.find(libro => libro.isbn === isbn);
        if (libroEncontrado) {
            return libroEncontrado;
        }   
        return null;

        //return this.inventario.find(libro => libro.isbn === isbn) ?? null;
    }

    // Funciones de socios
    agregarSocio(id: number, nombre: string, apellido: string): Socio {
        const socioCreado = new Socio(id, nombre, apellido);
        this.socios.push(socioCreado);
        return socioCreado;
    }

    buscarSocio(id: number): Socio | null {
        return this.socios.find(socio => socio.id === id) ?? null;
    }

    agregarAutor(nombre: string, apellido: string, biografia: string, dob: Date): Autor {
        const autorCreado = new Autor(nombre, apellido, biografia, dob);
        return autorCreado;
    }

    // Funciones de biblioteca
    retirarLibro(socioId: number, libroISBN: string): void {
        //ToDo: Fijarse si está disponible
        const socio = this.buscarSocio(socioId);
        const libro = this.buscarLibro(libroISBN);
        const reservas = libro?.obtenerReservasSocio(socioId);
        if (!socio) {
            throw new Error(`Socio con ID ${socioId} no encontrado.`);
        }
        if (!libro) {
            throw new Error(`Libro con ISBN ${libroISBN} no encontrado.`);
        }
        if (socio.obtenerMultas.length > 0) {
            throw new Error(`El socio ${socio.nombreCompleto} tiene multas pendientes y no puede retirar libros.`);
        }
        if (reservas && reservas.length > 0) {
            // El socio tiene una reserva para este libro
            // Eliminar la reserva
            for (const reserva of reservas) {
                libro.eliminarReserva(reserva);
            }
        } else if (libro.obtenerReservas.length > 0) {
            // El libro está reservado por otro socio
            throw new Error(`El libro "${libro.titulo}" está reservado por otro socio y no puede ser retirado.`);
        }

        // Verificar si el libro ya está prestado a otro socio
        for (const socio of this.socios) {
            if (socio.tienePrestadoLibro(libro)) {
                throw new Error(`El libro "${libro.titulo}" ya está prestado a ${socio.nombreCompleto}.`);
            }
        }
        socio.retirarLibro(libro, this.DURACION);
    }

    devolverLibro(socioId: number, libroISBN: string): Multa | void {
        const socio = this.buscarSocio(socioId);
        const libro = this.buscarLibro(libroISBN);
        if (!socio) {
            throw new Error(`Socio con ID ${socioId} no encontrado.`);
        }
        if (!libro) {
            throw new Error(`Libro con ISBN ${libroISBN} no encontrado.`);
        }
        // Verificar si el libro se devolvió con retraso
        const prestamo = socio.tienePrestadoLibro(libro);
        if (prestamo) {
            const hoy = new Date();
            if (hoy > prestamo.obtenerVencimiento) {
                const diasRetraso = Math.ceil((hoy.getTime() - prestamo.obtenerVencimiento.getTime()) / (1000 * 60 * 60 * 24));
                const montoMulta = Multa.calcularMulta(diasRetraso);
                const descripcion = `Multa por retraso de ${diasRetraso} días en la devolución del libro "${libro.titulo}".`;
                const multa = this.multarSocio(socioId, descripcion, montoMulta);
                console.log(`El socio ${socio.nombreCompleto} ha sido multado con $${montoMulta} por retraso en la devolución del libro "${libro.titulo}".`);
                socio.devolverLibro(libro);
                return multa;
            }
        }
        socio.devolverLibro(libro);
        socio.agregarAlHistorial(libro);
        for (const s in this.socios) {
            const reserva = biblioteca.buscarLibro(libroISBN)?.obtenerReservas[0];
            if (reserva) {
                const socioReservador = reserva.obtenerSocio;
                this.notificar(socioReservador.id, new Notificacion(`El libro "${libro.titulo}" que reservaste ya está disponible para su retiro.`));
            }
        }
    }

    reservarLibro(socioId: number, libroISBN: string) {
        const socio = this.buscarSocio(socioId);
        const libro = this.buscarLibro(libroISBN);
        if (!socio) {
            throw new Error(`Socio con ID ${socioId} no encontrado.`);
        }
        if (!libro) {
            throw new Error(`Libro con ISBN ${libroISBN} no encontrado.`);
        }

        // Verificar si el libro ya está prestado a otro socio
        for (const s of this.socios) {
            if (s.tienePrestadoLibro(libro)) {
                const reserva = new Reserva(libro, socio);
                libro.agregarReserva(reserva);
                this.notificar(s.id, new Notificacion(`Has reservado el libro "${libro.titulo}". Te notificaremos cuando esté disponible.`));
                return reserva;
            }
        }
        if (!socio.tienePrestadoLibro(libro)) {
           throw console.log(`El libro "${libro.titulo}" no está prestado a nadie. Se puede retirar como préstamo.`);
        }
    }



    multarSocio(socioId: number, descripcion: string, monto: number): Multa {
        const socio = this.buscarSocio(socioId);
        if (!socio) {
            throw new Error(`Socio con ID ${socioId} no encontrado.`);
        }
        const multa = new Multa(Date.now(), descripcion, monto);
        socio.agregarMulta(multa);
        this.notificar(socioId, new Notificacion(`Se ha generado una multa de $${monto} por: ${descripcion}`));
        return multa;
    }
    pagoMulta(socioId: number, multa: Multa): void {
        const socio = this.buscarSocio(socioId);
        if (!socio) {
            throw new Error(`Socio con ID ${socioId} no encontrado.`);
        }
        const indice = socio.obtenerMultas.indexOf(multa);
        if (indice === -1) {
            throw new Error(`La multa no pertenece al socio con ID ${socioId}.`);
        }
        socio.obtenerMultas.splice(indice, 1); // Eliminar el elemento en el índice encontrado
        this.notificar(socioId, new Notificacion(`La multa de $${multa.getMonto} ha sido pagada.`));
    }


    obtenerLibrosPorAutor(autor: Autor): Libro[] {
        return this.inventario.filter(libro => libro.autor === autor);
    }

    notificar(socioId: number, notificacion: Notificacion): void {
        const socio = this.buscarSocio(socioId);
        if (!socio) {
            throw new Error(`Socio con ID ${socioId} no encontrado.`);
        }
        socio.agregarNotificacion(notificacion);
    }

    vencimientoPrestamo(socioId: number){
        const socio = this.buscarSocio(socioId);
        if (!socio)
        {
            throw new Error(`Socio con ID ${socioId} no encontrado.`);
        }
        const prestamos = socio.obtenerPrestamos
        const hoy = new Date;
        for (const p of prestamos)
        {
            const diferenciaFecha = Math.ceil(((hoy.getTime() - p.obtenerVencimiento.getTime()) / (1000 * 60 * 60 * 24)) + this.DURACION);
            if (diferenciaFecha >>> this.DURACION)
            {
                const notificacion = new Notificacion(`El prestamo de ${p.obtenerLibro.titulo} está vencido por ${diferenciaFecha} días`);
                this.notificar(socioId, notificacion);
            }
        }
    }
    agregarEvento(evento: EventoBiblioteca)
    {
        this.eventos.push(evento);
        this.notificarEvento(evento);
    }
    notificarEvento(evento: EventoBiblioteca)
    {
        for (const s of this.socios)
        {
            const notificacion = new Notificacion(`Anunciamos el evento: ${evento.getDescripcion} en la fecha de ${evento.getFecha.getDay()}`);
            this.notificar(s.id, notificacion);
        }
    }
}
export const biblioteca = new Biblioteca(); // Patrón Singleton
export type { Biblioteca }; // Exportar el tipo Biblioteca para su uso en otros archivos
export type { Reserva };