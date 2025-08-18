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
            // Aquí podrías implementar la lógica para retirar el libro
            // Por ejemplo, podrías eliminarlo del inventario o marcarlo como retirado
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
}

export const biblioteca = new Biblioteca();