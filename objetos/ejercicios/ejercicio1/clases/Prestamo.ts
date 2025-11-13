import { Libro } from "./Libro";

export class Prestamo {
  constructor(public libro: Libro, public vencimiento: Date) {}
}
