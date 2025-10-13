import { Libro } from "../Libro";
import { Socio } from "../Socio";
import { Prestamo, TipoPrestamo } from "./Prestamo";

export abstract class PrestamoStrategy {
    tieneVencidos(socio: Socio) {
        const ahora = new Date();
        return socio.prestamosActuales.some(prestamo => ahora > prestamo.calcularVencimiento());
    }
    abstract validarIncremento(socio: Socio): boolean 

    abstract conseguirIncremento(socio: Socio, tiempoExamenes: boolean): number

    abstract puedeRenovar(): boolean;

    // abstract crearPrestamo(tipoPrestamo: TipoPrestamo, libro: Libro);
}