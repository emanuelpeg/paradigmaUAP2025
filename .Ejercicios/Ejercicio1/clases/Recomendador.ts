// Recomendador.ts
import { Socio } from "./Socio";
import { Biblioteca } from "./Biblioteca";
import { Libro } from "./Libro";

export class Recomendador {
  constructor(private biblioteca: Biblioteca) {}

  recomendarLibros(socio: Socio, maxRecomendaciones: number = 5): Libro[] {
    const historial = socio.obtenerHistorial();

    if (historial.length === 0) {
      // si nunca leyó nada, recomendamos libros al azar
      return this.biblioteca.libros.slice(0, maxRecomendaciones);
    }

    // Tomamos el último libro leído como base de recomendación
    const ultimoLibro = historial[historial.length - 1];

    return this.biblioteca.libros
      .filter(libro =>
        libro.isbn !== ultimoLibro.isbn && // no recomendar el mismo
        (
          libro.autor === ultimoLibro.autor || // mismo autor
          libro.titulo.includes(ultimoLibro.titulo.split(" ")[0]) // palabra clave simple
        )
      )
      .slice(0, maxRecomendaciones);
  }
}