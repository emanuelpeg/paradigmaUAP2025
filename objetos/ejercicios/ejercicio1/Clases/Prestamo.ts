// objetos/ejercicios/ejercicio1/Clases/Prestamo.ts
import type { Libro } from "./Libro";
import type { Socio } from "./Socio";

export class Prestamo {
  constructor(
    public socio: Socio,
    public libro: Libro,
    public esReferencia: boolean = false
  ) {}
}

