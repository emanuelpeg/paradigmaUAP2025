import { biblioteca } from "./biblioteca";
import { Libro } from "./libro"

export class Autor {
    constructor(
        private _nombre: string,
        private _biografia: string,
        private _nacimiento: number
    ) {}

    listarLibros(): Libro[] {
        const libros: Libro[] = [];
        biblioteca.libros.forEach(libro => {
            if (libro.autor == this) {
                libros.push(libro);
            }
        });
        return libros;
    }

    get nombre() { return this._nombre }
    get biografia() { return this._biografia }
    get nacimiento() { return this._nacimiento }
}