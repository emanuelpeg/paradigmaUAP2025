import { Libro } from "./Libro";
import { biblioteca } from "./Biblioteca";

type Duracion = number;

class Prestamo{
    constructor(
        public libro: Libro,
        private duracion: Duracion,
        public fechaVencimiento: Date = new Date(new Date().setDate(new Date().getDate() + duracion))
    ){}
}

export class Socio {
    

    constructor(
        private _id: number,
        private _nombre: string,
        private _apellido: string,
        public librosRetirados: Prestamo[] = [],
        public _multa: number = 0
    ){}

    get id() {return this._id;}
    get nombre() {return this._nombre;}
    get apellido() {return this._apellido;}
    get nombreCompleto() {return `${this._nombre} ${this._apellido}`;}

    retirar(libro: Libro, duracion: Duracion, usurio: Socio) {
        usurio.librosRetirados.push(new Prestamo(libro, duracion)); 
        
        //eliminar el socio de la cola de espera del libro
        const i = libro.getCola.indexOf(usurio);
        libro.getCola.splice(i, 1); // Elimina 1 elemento en la posición 'index'
        libro._disponible = false;
    }

    devolver(libro: Libro, usuario: Socio): Prestamo {
        const prestamo = usuario.librosRetirados.find(p => p.libro === libro);
        if (!prestamo) {
            throw new Error("El libro no fue retirado por este socio.");
        } 
        const index = this.librosRetirados.indexOf(prestamo);
        usuario.librosRetirados.splice(index, 1);

        var primerSocio = libro.getCola[0];
        biblioteca.notificarDisponibilidad(primerSocio, libro);

        return prestamo;
    }
    tienePrestadoLibro(libro: Libro): Prestamo | null {
        return this.librosRetirados.find(p => p.libro.getIsbn === libro.getIsbn) || null ;
    }
    
}