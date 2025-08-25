import { Libro } from "./Libro";

export class Reserva
{
    private id : number;
    private libro: Libro;
    private fechaReserva: Date;
    private fechaDevolucion: Date;
    private socioId: number;

    //constructor
     constructor(
        id: number,
        libro: Libro,
        fechaReserva: Date,
        fechaDevolucion: Date,
        socioId: number
    ) {
        this.id = id;
        this.libro = libro;
        this.fechaReserva = fechaReserva;
        this.fechaDevolucion = fechaDevolucion;
        this.socioId = socioId;
    }
    //---
    get Id(): number {
        return this.id;
    }

    get Libro(): Libro {
        return this.libro;
    }

    get FechaReserva(): Date {
        return this.fechaReserva;
    }

    get FechaDevolucion(): Date {
        return this.fechaDevolucion;
    }

    get SocioId(): number {
        return this.socioId;
    }
   

}