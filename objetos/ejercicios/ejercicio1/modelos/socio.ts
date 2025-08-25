import { Autor } from "./Autor";
import { biblioteca } from "./biblioteca";
import { EventoBiblioteca } from "./EventoBiblioteca";
import { Libro, LibroPrioridad } from "./libro";
import { Notificacion } from "./Notificacion";

// duracion en dias de un prestamo
type Duracion = number;

class Prestamo {
    constructor(public libro: Libro, public vencimiento: Date) { }
}

export class Socio {
    private prestamos: Prestamo[] = [];
    private notificaciones: Notificacion[] = [];
    private eventos: EventoBiblioteca[] = [];
    constructor(
        private _id: number,
        private _nombre: string,
        private _apellido: string,
        private _multa: number = 0,
    ) { }

    retirar(libro: Libro, duracion: Duracion) {
        libro.disponible = false;

        const vencimiento = new Date();
        vencimiento.setDate(vencimiento.getDate() + duracion)
        this.prestamos.push(new Prestamo(libro, vencimiento));
    }

    devolver(libro: Libro) {
        libro.disponible = true;
        const prestamo = this.prestamos.find(prestamo => prestamo.libro.isbn === libro.isbn);

        if (!prestamo) {
            throw new Error("No esta prestado");
        }

        const idx = this.prestamos.indexOf(prestamo);
        this.prestamos.splice(idx, 1); // removes one element starting from the provided index

        return prestamo;
    }

    tienePrestadoLibro(libro: Libro): Prestamo | null {
        return this.prestamos.find(prestamo => prestamo.libro.isbn === libro.isbn) ?? null;
    }

    subscribirseEvento(evento: EventoBiblioteca) {
        evento.registrarSocio(this);
        this.eventos.push(evento);
    }

    salirEvento(evento: EventoBiblioteca) {
        evento.eliminarSocio(this);
        // eliminar notificaciones
        this.notificaciones.forEach(notificacion => {
            if (notificacion.Evento.nombreEvento === evento.nombreEvento) {
                const idx = this.notificaciones.indexOf(notificacion);
                this.notificaciones.splice(idx, 1);
            }
        })
    }

    agregarNotificacion(notificacion: Notificacion) {
        this.notificaciones.push(notificacion);
    }

    eliminarNotificacion(notificacion: Notificacion) {
        const idx = this.notificaciones.indexOf(notificacion);

        if (idx !== -1) {
            this.notificaciones.splice(idx, 1);
        }
    }

    listarNotificaciones() {
        if (this.notificaciones.length) {
            console.log('--NOTIFICACIONES--');
            this.eventos.forEach(evento => {
                if (this.notificaciones.filter(n => n.Evento.nombreEvento === evento.nombreEvento).length) {
                    console.log(` -${evento.nombreEvento}- `);
                    this.notificaciones.forEach(notificacion => {
                        // si la notificacion esta vencida, actualizar el evento y notificaciones
                        if (notificacion.vencida()) {
                            evento.eliminarNotificacion(notificacion);
                        } else {
                            if (notificacion.Evento.nombreEvento === evento.nombreEvento) {
                                console.log(`  ${notificacion.mensaje} - vence en ${Math.ceil((notificacion.fechaVencimiento.getTime() - Date.now()) / (1000 * 60 * 60))} horas`);
                            }
                        }
                    });
                }
            })
        } else {
            console.log('--NO TIENE NOTIFICACIONES--');
        }
    }

    recomendar() {
        const bibliotecaSinPrestados = biblioteca.libros.filter(libro => !this.librosPrestados.some(l => l === libro));
        const libros: LibroPrioridad[] = [];
        const autores = {};
        const categorias = {};

        this.librosPrestados.forEach(libro => {
            // establecer importancia de autor
            const nombreAutor: string = libro.autor.nombre;
            autores[nombreAutor] = autores[nombreAutor] ? autores[nombreAutor] + 1 : 1;
            // establecer importancia de categoria
            const categoria: string = libro.categoria;
            categorias[categoria] = categorias[categoria] ? categorias[categoria] + 1 : 1;
        });

        for (const nombreAutor in autores) {
            bibliotecaSinPrestados.forEach(libro => {
                if (libro.autor.nombre == nombreAutor) {
                    const libroPrioridad: LibroPrioridad = new LibroPrioridad(libro, autores[nombreAutor]);
                    libros.push(libroPrioridad);
                }
            });
        }

        // buscar por categoria
        for (const categoria in categorias) {
            bibliotecaSinPrestados.forEach(libro => {
                if (libro.categoria === categoria) {
                    // si el libroprioridad ya esta en el array, incrementar 
                    if (libros.some(l => l.isbn === libro.isbn)) {
                        libros.filter(l => l.isbn === libro.isbn)[0].incrementarPrioridad(categorias[categoria]);
                    } else {
                        // crear nuevo libro prioridad
                        const libroPrioridad: LibroPrioridad = new LibroPrioridad(libro, categorias[categoria]);
                        libros.push(libroPrioridad);
                    }
                }
            });
        }

        for (const libro of libros) {
            console.log(`${libro.tituloLibro} - ${libro.prioridad}`)
        }
    }

    get id() { return this._id; }
    get nombre() { return this._nombre; }
    get apellido() { return this._apellido; }

    get multa() { return this._multa; }
    set multa(multa: number) { this._multa = multa; }

    get nombreCompleto() { return this._nombre + " " + this._apellido; }

    get librosPrestados() {
        const libros: Libro[] = [];
        this.prestamos.map(prestamo => {
            libros.push(prestamo.libro)
        });
        return libros;
    }
}