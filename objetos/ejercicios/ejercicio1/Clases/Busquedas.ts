// objetos/ejercicios/ejercicio1/Clases/Busquedas.ts
import type { Libro } from "./Libro";

export type CriterioBusqueda = {
  titulo?: string;
  autor?: string;
  isbn?: string;
};

export function buscarEnLibros(libros: Libro[], c: CriterioBusqueda): Libro[] {
  const t = c.titulo?.toLowerCase();
  const a = c.autor?.toLowerCase();
  const i = c.isbn?.toLowerCase();

  return libros.filter((l: Libro) => {
    const okT = t ? l.titulo.toLowerCase().includes(t) : true;
    const okA = a ? l.autor.toLowerCase().includes(a) : true;
    const okI = i ? l.isbn.toLowerCase().includes(i) : true;
    return okT && okA && okI;
  });
}
