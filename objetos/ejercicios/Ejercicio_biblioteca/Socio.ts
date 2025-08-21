import { Libro } from './Libro';

type Duracion = number; // Duracion en días que el socio puede tener el libro retirado.


class Prestamo{ // o podria haber hecho un type Prestamo = { libro: Libro, vencimiento: Date };. Ya que es un objeto simple.
    constructor(public libro: Libro, public vencimiento: Date) {}
}


export class Socio{

    private prestamos: Prestamo[] = []; // Array para almacenar los préstamos del socio.

    constructor(
        private _id: number,
        private _nombre: string,
        private _apellido: string,
    ) {}

    get id(): number {  
        return this.id;
    }
    set id(id: number) {
        this._id = id;
    }
    get nombre(): string {
        return this._nombre;
    }
    set nombre(nombre: string) {
        this._nombre = nombre;
    }
    get apellido(): string {
        return this._apellido;
    }
    set apellido(apellido: string) {
        this._apellido = apellido;
    }
    get nombreCompleto(): string {
        return `${this._nombre} ${this._apellido}`;
    }


    retirar(libro: Libro,  duracion: Duracion){
        const vencimiento = new Date();
        vencimiento.setDate(vencimiento.getDate() + duracion); // Calcula la fecha de vencimiento sumando la duración al día actual.
        this.prestamos.push(new Prestamo(libro, vencimiento)); // Agrega el libro y su fecha de vencimiento al array de préstamos.
    }

    devolver(libro: Libro) {
        const prestamo = this.prestamos.find(p => p.libro === libro);

        if (!prestamo) {
            console.log("El libro no está prestado a este socio.");
            return;
        }
        const indice = this.prestamos.indexOf(prestamo); // deuvle el indice del prestamo prestado.
        this.prestamos.splice(indice, 1); // Elimina el préstamo del array de préstamos.

        return prestamo;
    }

    tienePrestadoLibro(libro: Libro): Prestamo | null {
        return this.prestamos.find(p => p.libro === libro) ?? null; // Devuelve el préstamo si el libro está prestado, o null si no lo está.
    }
}
