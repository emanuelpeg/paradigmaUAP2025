import { biblioteca } from "./Bibiblioteca";
import { Libro } from "./Libro";

type Duracion = number;

class Prestamo{
    constructor(
        public libro: Libro,
        private duracion: Duracion
    ){}
}

export class Socio {
    

    constructor(
        private _id: number,
        private _nombre: string,
        private _apellido: string,
        private librosRetirados: Prestamo[] = []
    ){}

    get id() {return this._id;}
    get nombre() {return this._nombre;}
    get apellido() {return this._apellido;}
    get nombreCompleto() {return `${this._nombre} ${this._apellido}`;}

    retirar(libro: Libro, duracion: Duracion, usurio: Socio) {
        const vencimiento = new Date();
        vencimiento.setDate(vencimiento.getDate() + duracion);
        usurio.librosRetirados.push(new Prestamo(libro, duracion)); 
        
        //eliminar el socio de la cola de espera del libro
        const i = libro.colaEspera.indexOf(usurio);
        libro.colaEspera.splice(i, 1); // Elimina 1 elemento en la posición 'index'
        libro._disponible = false;
    }

    devolver(libro: Libro, usurio: Socio): Prestamo {
        const prestamo = this.librosRetirados.find(p => p.libro === libro);
        if (!prestamo) {
            throw new Error("El libro no fue retirado por este socio.");
        } 
        const index = this.librosRetirados.indexOf(prestamo);
        usurio.librosRetirados.splice(index, 1);

        biblioteca.notificarDisponibilidad(libro);
        libro._disponible = true;

        return prestamo;
    }
    tienePrestadoLibro(libro: Libro): Prestamo | null {
        return this.librosRetirados.find(p => p.libro.isbn === libro.isbn) || null ;
    }
    
}