import { Libro } from "./Libro";
import { Socio, SocioFactory, TipoSocio } from "./Socio";
import { IBuscable } from "../Interface/IBuscable";
import { Prestamo,TipoPrestamo } from "./Prestamo";

import { IPoliticaPrestamo } from "../Interface/IPoliticaPrestamo";
class Biblioteca {
  private inventario: Libro[] = [];
  private socios: Socio[] = [];

  // Funciones de libros
  agregarLibro(titulo: string, autor: string, isbn: string, anioPublicacion: number, genero: string, disponible: boolean = true): Libro {
    const libroCreado = new Libro(titulo, autor, isbn, anioPublicacion, genero, disponible);
    this.inventario.push(libroCreado);
    return libroCreado;
  }

  buscarLibro(isbn: string): Libro | null {
    // return this.inventario.find(libro => libro.isbn === isbn) ?? null;
    const libroEncontrado = this.inventario.find(
      (libro) => libro.isbn === isbn
    );
    if (libroEncontrado) {
      return libroEncontrado;
    }
    return null;
  }

  // Funciones de socios
  registrarSocio(tipo: TipoSocio, id: number, nombre: string, apellido: string): Socio {
    const socioCreado = SocioFactory.crearSocio(tipo, id, nombre, apellido);
    this.socios.push(socioCreado);
    return socioCreado;
  }

  buscarSocio(id: number): Socio | null {
    return this.socios.find((socio) => socio.id === id) ?? null;
  }

  retirarLibro(socioId: number, libroIsbn: string, tipoPrestamo: TipoPrestamo, politica: IPoliticaPrestamo): Prestamo {
        const socio = this.socios.find(s => s.id === socioId);
        const libro = this.inventario.find(l => l.isbn === libroIsbn);

        if (!socio) throw new Error("Socio no encontrado");
        if (!libro) throw new Error("Libro no encontrado");
        if (!this.libroDisponible(libro)) throw new Error("Libro no disponible");

        // Usar el método del socio
        return socio.retirarLibro(libro, tipoPrestamo, politica);
    }

    private libroDisponible(libro: Libro): boolean {
        // Verificar que ningún socio tenga el libro prestado
        return !this.socios.some(socio => 
            socio.tienePrestadoLibro(libro)
        );
    }

    devolverLibro(socioId: number, libroISBN: string) {
      const socio = this.buscarSocio(socioId);
      const libro = this.buscarLibro(libroISBN);

      if (!socio || !libro) {
        throw new Error("No se encontro");
      }

      socio.devolver(libro);
    }
    buscarPor(criterio: string): Libro[] {
        const criterioLower = criterio.toLowerCase();
        return this.inventario.filter(libro => 
            libro.titulo.toLowerCase().includes(criterioLower) ||
            libro.autor.toLowerCase().includes(criterioLower) ||
            libro.isbn.includes(criterio)
        );
    }



    // Métodos específicos del catálogo
    buscarPorAutor(autor: string): Libro[] {
        return this.buscarPor(autor);
    }

    filtrar(predicate: (libro: Libro) => boolean): Libro[] {
        return this.inventario.filter(predicate);
    }

    buscarPorTitulo(titulo: string): Libro[] {
        return this.filtrar(libro => 
            libro.titulo.toLowerCase().includes(titulo.toLowerCase())
        );
    }
}

export const biblioteca = new Biblioteca();
export type { Biblioteca };
