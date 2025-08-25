import { Socio } from "./Socio";
import { Libro } from "./Libro";

export class Reserva {
    constructor(
        public socio: Socio,
        public libro: Libro,
        public fechaReserva: Date = new Date()
    ) {}
}
