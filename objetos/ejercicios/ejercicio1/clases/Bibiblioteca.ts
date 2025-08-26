import { Libro } from "./Libro";
import { Socio } from "./Socio";

export class Biblioteca {
    private inventario: Libro[] = [];
    private socios: Socio[] = [];

    agregarLibro(titulo: string, autor: string, isbn: string): Libro {
        const libro = new Libro(titulo, autor, isbn);
        this.inventario.push(libro);
        return libro;
    }
    agregarSocio(id: number, nombre: string, apellido: string): Socio {
        const socio = new Socio(id, nombre, apellido);
        this.socios.push(socio);
        return socio;
    }
    buscarLibro(isbn: string): Libro | null {
        
        const libroEncontrado = this.inventario.find(libro => libro.isbn === isbn);
        if (libroEncontrado) {
            return libroEncontrado;
        }
        return null;
    }
    buscarSocio(id: number): Socio | null {
        const socioEncontrado = this.socios.find(socio => socio.id === id);
        if (socioEncontrado) {
            return socioEncontrado;
        }
        return null;
    }
    retirarLibro(libroISBN: string, socioId: number): Libro | null {
        const libro = this.buscarLibro(libroISBN);
        const socio = this.buscarSocio(socioId);
        
        if (libro && socio) {
            socio.retirar(libro, 14, socio); // Duración fija de 14 días para el ejemplo
            return libro;
        }
        return null;
    }
    devolverLibro(libroISBN: string, socioId: number): Libro | null {
        const libro = this.buscarLibro(libroISBN);
        const socio = this.buscarSocio(socioId);
        
        if (libro && socio) {
            // Aquí podrías implementar la lógica para devolver el libro
            // Por ejemplo, podrías agregarlo de nuevo al inventario
            return libro;
        }
        return null;
    } 
    generarReserva(libroISBN: string, socioId: number): string {
        const libro = this.buscarLibro(libroISBN);
        const socio = this.buscarSocio(socioId);
        
        if (libro && socio) {
            if (libro.isDisponible) {
                return `El libro "${libro.titulo}" está disponible para retiro.`;
            } else {
                libro.colaEspera.push(socio);
                return `El libro "${libro.titulo}" no está disponible. Has sido agregado a la cola de espera.`;
            }
        }
        return `No se pudo generar la reserva. Verifica el ISBN del libro y el ID del socio.`;
    }

}

export const biblioteca = new Biblioteca();