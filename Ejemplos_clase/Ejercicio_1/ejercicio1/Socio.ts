import { Libro } from "./libro"

/** Duracion en dia de un prestamo */
type Duracion =number;

class Prestamo{
    constructor(public libro: Libro, public vencimiento: Date){}
}

export class Socio{
    private prestamos: Prestamo []= [];
    private Reserva: Prestamo []=[];
    private librosRetirados: Libro[] = [];
    private vencimientoPrestamo: Date[] = [];
    constructor(
        private _id : number,
        private _nombre: string,
        private _apellido: string,
    ){}
    get id(){return this._id}
    get nombre(){return this._nombre}
    get apellido(){return this._apellido}
    get NombreCompleto(){return `${this.nombre} ${this.apellido}`}

    retirar(libro:Libro, duracion:Duracion){
        this.librosRetirados.push(libro);
        const vencimiento = new Date()
        vencimiento.setDate(vencimiento.getDate() + duracion);
        this.prestamos.push(new Prestamo(libro, vencimiento));
    }
    devolver (libro: Libro){
        const prestamo = this.prestamos.find(p => p.libro === libro)
        if (!prestamo){
            throw new Error ("No esta prestado");
        }
        //indice toma el indice del array prestamo
        const indice = this.prestamos.indexOf(prestamo);
        //elimina el elemento en el indice
        this.prestamos.splice(indice,1);

        return prestamo;
    }
    tienePrestadoLibro(libro: Libro): Prestamo | null{
        return this.prestamos.find((p) => p.libro === libro) ?? null;
    }
    reservaLibro(libro:Libro) : Libro | null{
        return this.Reserva.find((p) =>p.prestamos === this.prestamos) ?? null;
    }
}