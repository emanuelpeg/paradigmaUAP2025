import { Libro } from "./libro";

// duracion en dias de un prestamo
type Duracion = number;

class Prestamo {
    constructor(public libro: Libro, public vencimiento: Date) {}
}

export class Socio {
    private prestamos: Prestamo[] = [];
    constructor(
        private _id: number,
        private _nombre: string,
        private _apellido: string,
    ) {}

    retirar(libro: Libro, duracion: Duracion) {
        libro.disponible = false;
        
        const vencimiento = new Date();
        vencimiento.setDate(vencimiento.getDate() + duracion)
        this.prestamos.push(new Prestamo(libro, vencimiento));
    }

    devolver(libro: Libro) {
        libro.disponible = true;
        const prestamo = this.prestamos.find(prestamo => prestamo.libro.isbn === libro.isbn);

        if (!prestamo) {
            throw new Error("No esta prestado");
        }

        const idx = this.prestamos.indexOf(prestamo);
        this.prestamos.splice(idx, 1); // removes one element starting from the provided index
        
        return prestamo;
    }
    
    tienePrestadoLibro(libro: Libro): Prestamo | null {
        return this.prestamos.find(prestamo => prestamo.libro.isbn === libro.isbn) ?? null;
    }

    get id() { return this._id; }
    get nombre() { return this._nombre; }
    get apellido() { return this._apellido; }
    get nombreCompleto() { return this._nombre + " " + this._apellido; }
    get librosPrestados() {
        const libros: Libro[] = [];
        this.prestamos.map(prestamo => {
            libros.push(prestamo.libro)
        });
        return libros;
    }
}