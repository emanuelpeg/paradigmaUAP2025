import { Libro } from "./Libro";
import { Socio } from "./Socio";

/**
 * Clase abstracta Prestamo
 */
export abstract class Prestamo {
  constructor(
    public libro: Libro,
    public socio: Socio,
    public fechaPrestamo: Date = new Date()
  ) {}

  abstract calcularVencimiento(): Date | null;
  abstract calcularMulta(fechaDevolucion: Date): number;
}