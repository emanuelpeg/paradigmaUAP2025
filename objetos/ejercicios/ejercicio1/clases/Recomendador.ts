import { Socio } from "./Socio";
import { Biblioteca } from "./Biblioteca";
import { Libro } from "./Libro";

export class Recomendador {
  recomendar(socio: Socio, biblioteca: Biblioteca): Libro[] {
    const historial = socio.historial;
    const autoresLeidos = historial.map(l => l.autor.nombre);
    return biblioteca.librosPorAutor(autoresLeidos[0] || "").filter(
      l => !historial.includes(l)
    );
  }
}
