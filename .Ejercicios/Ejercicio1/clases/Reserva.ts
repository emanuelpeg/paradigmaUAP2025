import { Libro } from "./Libro";
import { Socio } from "./Socio";
export class Reserva {
    constructor(private libro: Libro, private socio: Socio) {}
    get obtenerLibro() { return this.libro; }
    get obtenerSocio() { return this.socio; }
}