import { Autor } from "./AutoresA";
import { Libro } from "./LibrosA";

export class Biblioteca {
    constructor (
        private inventario : Libro[] = [],
        private escritores : Autor[] = []
    ){}

    agregarLibro(titulo: string, Autor, isbn: number){
        const libroCreado = new Libro(titulo, Autor, isbn);
        this.inventario.push(libroCreado);
        return libroCreado;
    }

    agregarAutor(nombre: string, nacimiento: number){
        const autorCreado = new Autor(nombre, nacimiento);
        this.escritores.push(autorCreado)
        return autorCreado;
    }
    getInventario(){
        return this.inventario;
    }
}