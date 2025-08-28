import { Autor } from "./Autor";

export class Libro {
    private reservas: any[] = []; // mantengo lo de reservas de la tarea 1

    constructor(
        private _titulo: string,
        private _autor: Autor,   // ahora es un objeto Autor
        private _isbn: string
    ) {}

    get titulo() { return this._titulo }
    get autor() { return this._autor }  // devuelve el objeto
    get isbn() { return this._isbn }

    agregarReserva(socio: any): void { // lo que siempre recibe es un objeto Socio
        if (!this.reservas.includes(socio)) { 
            this.reservas.push(socio);
        }
    }

    atenderReserva(): any | null { // devuelve el primer socio de la lista. Ya que unlibro puede terner muchas reservas de socios,
                                    // pero se les va otorgando el libro por orden de reserva.
        return this.reservas.shift() ?? null;
    }

    tieneReservas(): boolean { // devuelve true o false dependiendo si el libro tiene reservas o no
        return this.reservas.length > 0; // verifica que la lsita de reservas tenga al menos un socio 
    }
}
