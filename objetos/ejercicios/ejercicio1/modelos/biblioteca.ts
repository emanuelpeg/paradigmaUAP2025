import { Autor } from "./Autor";
import { Libro } from "./libro";
import { Socio } from "./socio";

class Biblioteca {
    private inventario: Libro[] = [];
    private socios: Socio[] = [];
    private DURACION = 14;

    agregarLibro(titulo: string, autor: Autor, isbn: string) {
        const libro: Libro = new Libro(titulo, autor, isbn);
        this.inventario.push(libro);
        return libro;
    }

    buscarLibro(isbn: string): Libro | null {
        return this.inventario.find(libro => libro.isbn.toLowerCase().trim() == isbn.toLowerCase().trim()) ?? null;
    }

    buscarSocio(id: number): Socio | null {
        return this.socios.find(socio => socio.id === id) ?? null;
    }

    retrarLibro(socioId: number, libroISBN: string) {
        const socio = this.buscarSocio(socioId);
        const libro = this.buscarLibro(libroISBN);

        if (!socio || !libro) {
            throw new Error("Socio o libro no existe");
        }
        /** HACER SISTEMA DE RESERVA SI ESTA RESERVADO */
        if (!libro.disponible) {
            console.log("Este libro ya esta prestado. Agregando a cola de espera para devolucion de libro...")
            libro.agregarAColaReserva(socio);
            return;
        }

        // for (const socio of this.socios) {
        //     if (socio.tienePrestadoLibro(libro)) {
        //         throw new Error("Libro no esta disponible");
        //     }
        // }

        socio.retirar(libro, this.DURACION);
    }

    devolverLibro(socioId: number, libroISBN: string) {
        const socio = this.buscarSocio(socioId);
        const libro = this.buscarLibro(libroISBN);

        if (!socio || !libro) {
            throw new Error("Socio o libro no existe");
        }

        socio.devolver(libro);
        this.tomarProximo(libro, socio);
    }

    tomarProximo(libro: Libro, socio: Socio) {
        /** TOMAR PROXIMO EN COLA DE RESERVA */
        const proximoSocio: Socio = libro.colaReserva[0];
        libro.eliminarDeColaReserva(proximoSocio);
        proximoSocio.retirar(libro, this.DURACION);
    }

    agregarSocio(id: number, nombre: string, apellido: string) {
        const socio: Socio = new Socio(id, nombre, apellido);
        this.socios.push(socio);
        return socio;
    }

    get libros() { return this.inventario }

}

export const biblioteca = new Biblioteca();
