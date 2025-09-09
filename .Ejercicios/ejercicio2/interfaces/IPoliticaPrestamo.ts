import { Socio } from "../clases/Socio";
import { Libro } from "../clases/Libro";
import { PrestamoBase, TipoPrestamo } from "../clases/PrestamoBase";

export interface IPoliticaPrestamo {
    generarPrestamo(socio: Socio, libro: Libro, tipo?: TipoPrestamo): PrestamoBase | null;
}