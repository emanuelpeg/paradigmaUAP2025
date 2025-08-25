import { Libro } from "./Libro";
import { Socio } from "./Socio";
import { Autor } from "./Autor";

class Biblioteca {
    private inventario: Libro[] = [];
    private socios: Socio[] = [];
    private DURACION: number = 14;

    agregarLibro(titulo: string, autor: Autor, isbn: string) { // recibe el titulo, autor (objeto Autor) e isbn
        const libro = new Libro(titulo, autor, isbn); //crea un nuevo objeto libro
        this.inventario.push(libro); // lo agrega al inventario
        return libro;
    }

    buscarLibrosPorAutor(autor: Autor): Libro[] {
        return this.inventario.filter(libro => libro.autor.nombre === autor.nombre);
    }

    buscarLibro(isbn: string): Libro | null { 
        const libroEncontrado = this.inventario.find(libro => libro.isbn === isbn); 
        if (libroEncontrado) {
            return libroEncontrado; 
        } else {
            return null; 
        }
    }

    buscarSocio(id: number): Socio | null {
        return this.socios.find(socio => socio.id === id) ?? null;
    }

    registrarSocio(id: number, nombre: string, apellido: string) { 
        const socio = new Socio(id, nombre, apellido); 
        this.socios.push(socio); 
        return socio;
    }

    retirarLibro(socioId: number, libroISBN: string): void {
        const socio = this.buscarSocio(socioId);
        const libro = this.buscarLibro(libroISBN);

        if (!socio || !libro) {
            console.log("No se puede retirar el libro. Socio o libro no encontrado.");
            return;
        }

        // Bloquear si tiene multas
        if (socio.tieneMultasPendientes()) {
            console.log(`${socio.nombreCompleto} no puede retirar libros hasta pagar sus multas.`);
            return;
        }

        for (const otroSocio of this.socios) {
            if (otroSocio.tienePrestadoLibro(libro)) {
                console.log(`El libro "${libro.titulo}" ya está prestado. Reservado para ${socio.nombreCompleto}.`);
                libro.agregarReserva(socio);
                return;
            }
        }

        socio.retirar(libro, this.DURACION);
        console.log(`${socio.nombreCompleto} retiró "${libro.titulo}".`);
    }

    recomendarLibros(socioId: number): Libro[] {
        const socio = this.buscarSocio(socioId);
        if (!socio) return [];

        const historial = socio.getHistorial();
        if (historial.length === 0) return [];

        const autoresLeidos = historial.map(libro => libro.autor.nombre);

        return this.inventario.filter(libro =>
            autoresLeidos.includes(libro.autor.nombre) &&
            !historial.includes(libro)
        );
    }

    devolverLibro(socioId: number, libroISBM: string): void {
        const socio = this.buscarSocio(socioId);
        const libro = this.buscarLibro(libroISBM);

        if (!socio || !libro) {
            console.log("No se puede devolver el libro. Socio o libro no encontrado.");
            return;
        }
        socio.devolver(libro);
        console.log(`${socio.nombreCompleto} devolvió "${libro.titulo}".`);

        if (libro.tieneReservas()) {
            const proximoSocio = libro.atenderReserva();
            if (proximoSocio) {
                proximoSocio.retirar(libro, this.DURACION);
                console.log(`El libro "${libro.titulo}" fue entregado a ${proximoSocio.nombreCompleto}.`);
            }
        }
    }
}

export const biblioteca = new Biblioteca(); 
export type { Biblioteca }; 
