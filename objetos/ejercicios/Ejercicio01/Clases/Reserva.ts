import { Libro } from "./Libro";

export class Reserva
{
    private libro: Libro;
    private fechaReserva: Date;
    private fechaDevolucion: Date;
    private socioId: number;
    private devolucionReal: Date | null = null; 

    //constructor
     constructor(
    
        libro: Libro,
        fechaReserva: Date,
        fechaDevolucion: Date,
        socioId: number
    ) {

        this.libro = libro;
        this.fechaReserva = fechaReserva;
        this.fechaDevolucion = fechaDevolucion;
        this.socioId = socioId;
    }
    //---


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
    
    updateDevolucionReal(fecha: Date): void {
        this.devolucionReal = fecha;
    }

}