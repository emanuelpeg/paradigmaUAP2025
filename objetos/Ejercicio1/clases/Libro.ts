import { Socio } from "./Socio";

 export class Libro {
   
    private reservas: Socio[] = []; // Array de reservas de este libro
    private disponible: boolean = true; // Indica si el libro está disponible para préstamo

    // Propiedades privadas para encapsular los datos
    constructor(
        private _titulo: string, //Protected solo se puede acceder desde la misma clase o clases que heredan de ella
        private _autor: any,
        private _isbn: string
    ) {}

    get titulo(){ return this._titulo; }
    get autor(){ return this._autor; }
    get isbn(){ return this._isbn; }


    estaDisponible():
    boolean{
        return this.disponible;
    }

    prestarLibro(): boolean{
        if(this.disponible)
        {
            this.disponible = false;
            return true;
        }
        return false;
    }

    devolver(): Socio | null
    {
        this.disponible = true;
        if(this.reservas.length > 0)
        {
            const siguiente = this.reservas.shift()!;
            this.disponible = false; // inmediatamente se lo lleva el siguiente
            return siguiente;
        }
        return null;
    }

    reservar(socio: Socio) {
        if (!this.reservas.includes(socio)) {
            this.reservas.push(socio);
        }
    }
}






/*
class Revista extends Libro {
    hola(){
        this._titulo;
    }
}*/