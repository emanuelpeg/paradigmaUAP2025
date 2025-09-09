import { Libro } from './Libro';
import { Socio } from './Socio';
import { Autor } from './Autor';
import { EventoBiblioteca } from './EventoBiblioteca';
import { MULTA_POR_DIA } from './constantes';

export class Biblioteca {
    public nombre: string;
    public libros: Map<string, Libro>;
    public socios: Map<number, Socio>;
    public autores: Map<string, Autor>;
    public eventos: Map<number, EventoBiblioteca>;

    constructor(nombre: string) {
        this.nombre = nombre;
        this.libros = new Map();
        this.socios = new Map();
        this.autores = new Map();
        this.eventos = new Map();
    }

    public agregarLibro(libro: Libro): boolean {
        if (this.libros.has(libro.isbn)) return false;
        this.libros.set(libro.isbn, libro);
        this.autores.set(libro.autor.nombre, libro.autor);
        return true;
    }

    public agregarSocio(socio: Socio): boolean {
        if (this.socios.has(socio.id)) return false;
        this.socios.set(socio.id, socio);
        return true;
    }

    public reservarLibro(isbn: string, socioId: number): boolean {
        const libro = this.libros.get(isbn);
        const socio = this.socios.get(socioId);
        if (!libro || !socio) return false;
        
        if (libro.reservar(socioId)) {
            socio.agregarReserva(isbn);
            return true;
        }
        return false;
    }

    public prestarLibro(isbn: string, socioId: number): boolean {
        const libro = this.libros.get(isbn);
        const socio = this.socios.get(socioId);
        
        if (!libro || !socio) return false;
        if (!socio.puedeTomarPrestado()) return false;
        
        if (libro.prestar(socioId)) {
            socio.agregarLibro(isbn);
            return true;
        }
        return false;
    }

    public devolverLibro(isbn: string, socioId: number): boolean {
        const libro = this.libros.get(isbn);
        const socio = this.socios.get(socioId);
        
        if (!libro || !socio || libro.socioId !== socioId) return false;
        
        if (libro.estaVencido()) {
            const multa = libro.diasVencido() * MULTA_POR_DIA;
            socio.agregarMulta(multa);
        }
        
        const siguienteSocio = libro.devolver();
        socio.removerLibro(isbn);
        
        if (siguienteSocio) {
            console.log(`Libro ${libro.titulo} disponible para socio ${siguienteSocio}`);
        }
        
        return true;
    }

    public calcularMultas(): void {
        this.libros.forEach(libro => {
            if (libro.estaVencido() && libro.socioId) {
                const socio = this.socios.get(libro.socioId);
                if (socio) {
                    const multa = libro.diasVencido() * MULTA_POR_DIA;
                    socio.agregarMulta(multa);
                }
            }
        });
    }

    public getLibrosPorAutor(autor: Autor): Libro[] {
        return Array.from(this.libros.values()).filter(libro => libro.autor === autor);
    }

    public buscarAutor(nombre: string): Autor | undefined {
        return this.autores.get(nombre);
    }

    public agregarEvento(evento: EventoBiblioteca): boolean {
        if (this.eventos.has(evento.id)) return false;
        this.eventos.set(evento.id, evento);
        return true;
    }

    public registrarSocioEnEvento(socioId: number, eventoId: number): boolean {
        const evento = this.eventos.get(eventoId);
        if (!evento) return false;
        return evento.registrarSocio(socioId);
    }

    public notificarLibrosVencidos(): void {
        this.libros.forEach(libro => {
            if (libro.estaVencido() && libro.socioId) {
                const socio = this.socios.get(libro.socioId);
                if (socio) {
                    console.log(`Libro vencido: ${libro.titulo} - Socio: ${socio.nombre}`);
                }
            }
        });
    }

    public notificarEventosProximos(): void {
        this.eventos.forEach(evento => {
            if (evento.esProximo()) {
                console.log(`Evento próximo: ${evento.nombre} - ${evento.fecha.toDateString()}`);
            }
        });
    }

    public recomendarLibros(socioId: number): Libro[] {
        const socio = this.socios.get(socioId);
        if (!socio) return [];
        
        const autoresLeidos = new Set<Autor>();
        
        socio.historialLectura.forEach(isbn => {
            const libro = this.libros.get(isbn);
            if (libro) {
                autoresLeidos.add(libro.autor);
            }
        });
        
        const recomendaciones: Libro[] = [];
        autoresLeidos.forEach(autor => {
            const librosDelAutor = this.getLibrosPorAutor(autor);
            librosDelAutor.forEach(libro => {
                if (!socio.historialLectura.includes(libro.isbn) && 
                    !socio.librosPrestados.includes(libro.isbn)) {
                    recomendaciones.push(libro);
                }
            });
        });
        
        return recomendaciones;
    }
}
