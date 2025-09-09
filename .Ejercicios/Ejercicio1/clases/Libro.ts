import type { Reserva } from "./Biblioteca";
import type { Autor } from "./Autor";
export class Libro {
    //private _titulo: string;
    //private _autor: string;
    //private _isbn: string;

    //constructor(titulo: string, autor: string, isbn: string) {
    //    this._titulo = titulo;
    //    this._autor = autor;
    //    this._isbn = isbn;
    //}
    private reservas: Reserva[] = [];
    constructor(
        private _titulo: string, //Protected solo se puede acceder desde la misma clase o clases que heredan de ella
        private _autor: Autor,
        private _isbn: string
    ) {}

    get titulo(){ return this._titulo; }
    get autor(){ return this._autor; }
    get isbn(){ return this._isbn; }
    get obtenerReservas(){ return this.reservas; }

    agregarReserva(reserva: Reserva){
        this.reservas.push(reserva);
    }
    eliminarReserva(reserva: Reserva){
        const indice = this.reservas.indexOf(reserva);
        if (indice !== -1) {
            this.reservas.splice(indice, 1);
        }
    }
    obtenerReservasSocio(socioId: number): Reserva[] {
        return this.reservas.filter(reserva => reserva.obtenerSocio.id === socioId);
    }
    
}

/*
class Revista extends Libro {
    hola(){
        this._titulo;
    }
}*/
