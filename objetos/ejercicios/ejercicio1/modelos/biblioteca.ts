import { Libro } from "./libro";
import { Socio } from "./socio";

class Biblioteca {
    private inventario: Libro[] = [];
    private socios: Socio[] = [];
    private DURACION = 14;

    agregarLibro(titulo: string, autor: string, isbn: string) {
        const libro: Libro = new Libro(titulo, autor, isbn);
        this.inventario.push(libro);
        return libro;
    }

    buscarLibro(isbn: string): Libro | null {
        return this.inventario.find(libro => libro.isbn.toLowerCase().trim() == isbn.toLowerCase().trim()) ?? null;
    }

    buscarSocio(id: number): Socio | null {
        return this.socios.find(socio => socio.id == id) ?? null;
    }

    retrarLibro(socioId: number, libroISBN: string) {
        const socio = this.buscarSocio(socioId);
        const libro = this.buscarLibro(libroISBN);

        if (!socio || !libro) {
            throw new Error("Socio o libro no existe");
        }
        /** HACER SISTEMA DE RESERVA SI ESTA reservado */

        for (const socio of this.socios) {
            if (socio.tienePrestadoLibro(libro)) {
                throw new Error("Libro no esta disponible");
            }
        }

        socio.retirar(libro, this.DURACION);
    }

    devolverLibro(socioId: number, libroISBN: string) {
        const socio = this.buscarSocio(socioId);
        const libro = this.buscarLibro(libroISBN);

        if (!socio || !libro) {
            throw new Error("Socio o libro no existe");
        }

        socio.devolver(libro);
    }

    agregarSocio(nombre: string, apellido: string) {
        // conseguir el ultimo id
        const ultimoSocio: Socio | undefined = this.socios.shift();
        const id = ultimoSocio ? ultimoSocio.id + 1 : 1;

        const socio: Socio = new Socio(id, nombre, apellido);
        this.socios.push(socio);
        return socio;
    }


}

export const biblioteca = new Biblioteca();
