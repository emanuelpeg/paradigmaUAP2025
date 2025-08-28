
import { Notificacion } from "./Notificacion";
import {Libro} from './Libro';
import {Autor} from './Autor';
import {Socio} from './Socio';

// Clase Prestamo
class Prestamo {
    constructor(
        private libro: Libro,
        private socio: Socio,
        private _vencimiento: Date
    ) {}
    get vencimiento() {
        return this._vencimiento;
    }
    esLibro(isbn: string): boolean {
        return this.libro.isbn === isbn;
    }
    esSocio(id: number): boolean {
        return this.socio.id === id;
    }
    getSocioId(): number {
        return this.socio.id;
    }
    getSocioNombreCompleto(): string {
        return this.socio.nombreCompleto;
    }
    getLibroTitulo(): string {
        return this.libro.titulo;
    }
}

// Clase Reserva
class Reserva {
    constructor(
        private libro: Libro,
        private socio: Socio,
        private fechaReserva: Date = new Date()
    ) {}
    getSocioId(): number {
        return this.socio.id;
    }
    getSocioNombre(): string {
        return this.socio.nombre;
    }
    getLibroTitulo(): string {
        return this.libro.titulo;
    }
    mensajeReserva(): string {
        return `SGB: Reserva registrada para ${this.socio.nombreCompleto} del libro "${this.libro.titulo}".`;
    }

    notificarLibroDisponible(): void {
        Notificacion.NotificacionLibroDisponible(this.socio, this.libro.titulo);
    }
    
}


// Clase Multa
class Multa {
    constructor(
        private prestamo: Prestamo,
        private fechaDevolucion: Date
    ) {}

    get valor(): number {
        const diasRetraso = Math.ceil((this.fechaDevolucion.getTime() - this.prestamo.vencimiento.getTime()) / (1000 * 60 * 60 * 24));
        return diasRetraso > 0 ? diasRetraso * 50 : 0;
    }

    estaActiva(): boolean {
        return this.valor > 0;
    }

    static socioTieneMultaActiva(multas: Multa[], socioId: number): boolean {
        return multas.some(m => m.getSocioId() === socioId && m.estaActiva());
    }

    getSocioId(): number {
        return this.prestamo.getSocioId();
    }

    mensajeMulta(): string {
        return `SGB: Multa creada para ${this.prestamo.getSocioNombreCompleto()} por el libro "${this.prestamo.getLibroTitulo()}": $${this.valor}`;
    }
}


class Biblioteca {
    
    
    private inventario: Libro[] = [];
    private socios: Socio[] = [];
    private autores: Autor[] = [];
    private static ultimoIdSocio: number = 0;
    // Registro de préstamos activos
    private prestamos: Prestamo[] = [];
    // Registra un autor y devuelve la referencia única (evita duplicados por nombre)
    registrarAutor(nombre: string, biografia: string, anioNacimiento: number): Autor {
        let autor = this.autores.find(a => a.getNombre() === nombre);
        if (!autor) {
            autor = new Autor(nombre, biografia, anioNacimiento);
            this.autores.push(autor);
        }
        return autor;
    }
    // Registro de reservas: Map ISBN -> array de reservas (cola)
    private reservas: Map<string, Reserva[]> = new Map();
    // Registro de multas activas
    private multas: Multa[] = [];

        //funciones de libros
    agregarLibro(titulo: string, autor: Autor, isbn: string) {
        const nuevoLibro = new Libro(titulo, autor, isbn);
        this.inventario.push(nuevoLibro);
        return nuevoLibro;
    }

    

    buscarLibro(isbn: string): Libro | null {
        const libro = this.inventario.find(libro => libro.isbn === isbn);
        if (libro) {
            return libro;
        }
        return null;
    }


        //funciones de socios 
    registrarSocio(nombre: string, apellido: string) {
        Biblioteca.ultimoIdSocio++;
        const nuevoSocio = new Socio(Biblioteca.ultimoIdSocio, nombre, apellido);
        this.socios.push(nuevoSocio);
        return nuevoSocio;
    }

    buscarSocio (id: number): Socio | null {
        const socio = this.socios.find(socio => socio.id === id);
        if (socio) {
            return socio;
        }
        return null;
    }

    //retirarLibro(socio: Socio, libro: Libro) )

    retirarLibro(socioId: number, libroISBN: string, duracion: number): void {
        // Verificar si el socio tiene multas activas
        if (this.tieneMultaActiva(socioId)) {
            throw new Error(`SGB: El socio con ID ${socioId} tiene multas pendientes y no puede retirar libros.`);
        }
        const socio = this.buscarSocio(socioId);
        const libro = this.buscarLibro(libroISBN);

        if (!socio) {
            throw new Error(`SGB: Socio con ID ${socioId} no encontrado.`);
        }
        if (!libro) {
            throw new Error(`SGB: Libro con ISBN ${libroISBN} no encontrado.`);
        }

        // Verificar si el libro ya está prestado
        const prestamoExistente = this.prestamos.find(p => p.esLibro(libroISBN));
        if (prestamoExistente) {
            throw new Error(`SGB: El libro con ISBN ${libroISBN} ya está prestado.`);
        }

        // Si hay reservas, solo el primero de la cola puede retirar
        const cola = this.reservas.get(libroISBN);
        if (cola && cola.length > 0) {
            if (cola[0].getSocioId() !== socioId) {
                throw new Error(`SGB: El libro tiene reservas. Solo el primer socio en la cola puede retirarlo.`);
            } else {
                // El socio es el primero en la cola, puede retirar y se elimina la reserva
                cola.shift();
                if (cola.length === 0) {
                    this.reservas.delete(libroISBN);
                } else {
                    this.reservas.set(libroISBN, cola);
                }
            }
        }

        // Registrar el préstamo con vencimiento
        const vencimiento = new Date();
        vencimiento.setDate(vencimiento.getDate() + duracion);
        this.prestamos.push(new Prestamo(libro, socio, vencimiento));
        console.log(`SGB: El socio ${socio.nombreCompleto} ha retirado el libro "${libro.titulo}" hasta el ${vencimiento.toLocaleDateString()}.`);
    }

    reservarLibro(socioId: number, libroISBN: string): void {
        // Verificar si el socio tiene multas activas
        if (this.tieneMultaActiva(socioId)) {
            throw new Error(`SGB: El socio con ID ${socioId} tiene multas pendientes y no puede reservar libros.`);
        }
        const socio = this.buscarSocio(socioId);
        const libro = this.buscarLibro(libroISBN);

        if (!socio) {
            throw new Error(`SGB: Socio con ID ${socioId} no encontrado.`);
        }
        if (!libro) {
            throw new Error(`SGB: Libro con ISBN ${libroISBN} no encontrado.`);
        }

        // Verificar si el libro está disponible
        const prestamoExistente = this.prestamos.find(p => p.esLibro(libroISBN));
        if (!prestamoExistente) {
            throw new Error(`SGB: El libro con ISBN ${libroISBN} está disponible, no es necesario reservarlo.`);
        }

        // Verificar si el socio ya está en la cola de reservas
        const cola = this.reservas.get(libroISBN) || [];
        if (cola.find(r => r.getSocioId() === socioId)) {
            throw new Error(`SGB: El socio ya tiene una reserva para este libro.`);
        }
        // Agregar reserva a la cola
    const reserva = new Reserva(libro, socio);
    cola.push(reserva);
    this.reservas.set(libroISBN, cola);
    console.log(reserva.mensajeReserva());
    }

    devolverLibro(socioId: number, libroISBN: string): void {
        const index = this.prestamos.findIndex(p => p.esLibro(libroISBN) && p.esSocio(socioId));
        if (index === -1) {
            throw new Error(`SGB: No hay préstamo registrado para el libro con ISBN ${libroISBN} y socio ID ${socioId}.`);
        }
        const prestamo = this.prestamos[index];
        const fechaDevolucion = new Date();
        if (fechaDevolucion > prestamo.vencimiento) {
            // Devolución tarde, calcular multa
            const multa = new Multa(prestamo, fechaDevolucion);
            this.multas.push(multa);
            console.log(multa.mensajeMulta());
            this.prestamos.splice(index, 1);
            console.log(`SGB: El socio con ID ${socioId} devolvió el libro con ISBN ${libroISBN} tarde. Multa generada.`);
        } else {
            this.prestamos.splice(index, 1);
            console.log(`SGB: El socio con ID ${socioId} devolvió el libro con ISBN ${libroISBN} a tiempo.`);
        }

        // Notificar al siguiente en la cola de reservas, si existe
        const cola = this.reservas.get(libroISBN);
        if (cola && cola.length > 0) {
            const siguienteReserva = cola[0];
            siguienteReserva.notificarLibroDisponible();
        }
    }

    private tieneMultaActiva(socioId: number): boolean {
        return Multa.socioTieneMultaActiva(this.multas, socioId);
    }
        pagarMulta(multa: Multa): void {
        const index = this.multas.indexOf(multa);
        if (index !== -1) {
            this.multas.splice(index, 1);
            console.log('SGB: Multa eliminada correctamente.');
        } else {
            console.log('SGB: La multa no se encontró en la lista.');
        }
    }
    // Devuelve todos los libros de un autor específico (por objeto Autor o id)
    buscarLibrosPorAutor(autor: Autor): Libro[] {
        return this.inventario.filter(libro => libro.autor.getId() === autor.getId());
    }

    // Alternativamente, por id de autor
    buscarLibrosPorAutorId(idAutor: number): Libro[] {
        return this.inventario.filter(libro => libro.autor.getId() === idAutor);
    }

    // Revisa todos los préstamos y notifica a los socios si el vencimiento es próximo o ya venció
    public RevisarPrestamos(): void {
        const hoy = new Date();
        for (const prestamo of this.prestamos) {
            const socio = prestamo["socio"];
            const libro = prestamo["libro"];
            const fechaVencimiento = prestamo.vencimiento;
            const diffDias = Math.ceil((fechaVencimiento.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24));
            if (diffDias === 2) {
                // Notificar vencimiento próximo
                Notificacion.NotificacionVencimientoProximo(socio, libro.titulo, fechaVencimiento);
            } else if (diffDias < 0) {
                // Notificar préstamo vencido
                Notificacion.NotificacionPrestamoVencido(socio, libro.titulo, fechaVencimiento);
            }
        }
    }
    // Recomienda libros a los socios basándose en autores ya leídos
    public RecomendarContenido(): void {
        for (const socio of this.socios) {
            const leidos = socio.getLibrosLeidos();
            if (leidos.length === 0) continue;
            // Elegir un libro leído al azar
            const libroBase = leidos[Math.floor(Math.random() * leidos.length)];
            const autor = libroBase.autor;
            // Buscar libros del mismo autor que no haya leído
            const recomendables = this.inventario.filter(l => l.autor.getId() === autor.getId() && !leidos.includes(l));
            if (recomendables.length > 0) {
                const libroRecomendado = recomendables[Math.floor(Math.random() * recomendables.length)];
                Notificacion.NotificacionRecomendaciones(socio, libroRecomendado.titulo, autor.getNombre());
            }
        }
    }
    
}



export const biblioteca = new Biblioteca();//solo puedo crear una instancia de Biblioteca
export type BibliotecaType = typeof biblioteca;