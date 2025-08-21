import { Libro } from "./Libro";
import {Socio} from "./Socio";

class Biblioteca {
    private inventario: Libro[] = [];
    private socios: Socio[] = [];
    private DURACION: number = 30; // Duración del préstamo en días.


    agregarLibro(titulo: string, autor: string, isbn: string) {
        const nuevoLibro = new Libro(titulo, autor, isbn);
        this.inventario.push(nuevoLibro);
        return nuevoLibro;
    }

    buscarLibro(isbn: string): Libro | null {
        //return this.inventario.find(libro => libro.isbn === isbn) ?? null;
        const libroEncontrado = this.inventario.find(libro => libro.isbn === isbn);
        if (libroEncontrado) {
            return libroEncontrado;
        }
        return null;
    }

    registrarSocio(id: number, nombre: string, apellido: string) {
        const nuevoSocio = new Socio(id, nombre, apellido); 
        this.socios.push(nuevoSocio);
        return nuevoSocio;
    }

    buscarSocio(id: number): Socio | null {
        const socioEncontrado = this.socios.find(socio => socio.id === id);
        if (socioEncontrado) {
            return socioEncontrado;
        }
        return null;
    }

    retirarLibro(socioId: number, libroISBM: string): void {
        // TODO: fijrase si está disponible el libro en el inventario

        const socio = this.buscarSocio(socioId);
        const libro = this.buscarLibro(libroISBM);

        if (!socio || !libro) {
            console.log("No se puede retirar el libro. Socio o libro no encontrado.");
            return;
        }
               for (const socio of this.socios) {
            if (socio.tienePrestadoLibro(libro)){
                throw new Error("El libro ya está prestado a otro socio.");
            }
        }
        socio.retirar(libro, this.DURACION); // Retira el libro y establece la duración del préstamo.
    }

    devolverLibro(socioId: number, libroISBM: string): void {
        const socio = this.buscarSocio(socioId);
        const libro = this.buscarLibro(libroISBM);

        if (!socio || !libro) {
            console.log("No se puede devolver el libro. Socio o libro no encontrado.");
            return;
        }

        socio.devolver(libro); // Devuelve el libro al socio.
    }
}

export const biblioteca = new Biblioteca(); // Exportamos una instancia de Biblioteca para que pueda ser utilizada en otros módulos. 
// Solo se puede crear una instancia de Biblioteca, ya que no se permite la creación de más instancias. Una forma de singleton.
export type { Biblioteca }; // Exportamos el tipo Biblioteca para que pueda ser utilizado en otros módulos.

