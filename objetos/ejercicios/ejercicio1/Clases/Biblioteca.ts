import { Libro } from './Libro';
import { Socio } from './Socio';

class Biblioteca {
    private inventario: Libro[];
    private socios: Socio[];

    constructor() {
        this.inventario = [];
        this.socios = [];
    }
        //Funciones de Libro
    agregarLibro(titulo: string, _autor: string, isbn: string){
        const libro = new Libro(titulo, _autor, isbn);
        this.inventario.push(libro);
        return libro;
    }

    buscarLibro(isbn: string): Libro | null {
        //return this.inventario.find(libro => libro.titulo === titulo);
        const libroEncontrado = this.inventario.find((libro) => libro.isbn === isbn);
        if (!libroEncontrado) {
            return null;
        }
        return libroEncontrado;
    }


        //Funciones de Socio
    registrarSocio(id: number, nombre: string, apellido: string): Socio{
        const socio = new Socio(id, nombre, apellido);
        this.socios.push(socio);
        return socio;
    }
}

export const biblioteca = new Biblioteca();