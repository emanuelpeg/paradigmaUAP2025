import { Libro } from "./Libro";
import { Socio } from "./Socio";
import { Autor } from "./Autor";

class Biblioteca {
  private inventario: Libro[] = [];
  private socios: Socio[] = [];
  private autores: Autor[] = [];
  private DURACION = 14;

  // Funciones de autores
  agregarAutor(nombre: string, apellido: string, biografia: string, fechaNacimiento: Date): Autor {
    const autor = new Autor(nombre, apellido, biografia, fechaNacimiento);
    this.autores.push(autor);
    return autor;
  }

  buscarAutorPorNombreCompleto(nombreCompleto: string): Autor | null {
    return this.autores.find(a => a.nombreCompleto === nombreCompleto) ?? null;
  }

  // Funciones de libros
  agregarLibro(titulo: string, autor: Autor, isbn: string): Libro {
    const libroCreado = new Libro(titulo, autor, isbn);
    this.inventario.push(libroCreado);
    return libroCreado;
  }

  buscarLibro(isbn: string): Libro | null {
    const libroEncontrado = this.inventario.find(
      (libro) => libro.isbn === isbn
    );
    if (libroEncontrado) {
      return libroEncontrado;
    }
    return null;
  }

  // Buscar todos los libros de un autor específico
  buscarLibrosPorAutor(autor: Autor): Libro[] {
    return this.inventario.filter(libro => libro.autor === autor);
  }

  // Funciones de socios
  registrarSocio(id: number, nombre: string, apellido: string): Socio {
    const socioCreado = new Socio(id, nombre, apellido);
    this.socios.push(socioCreado);
    return socioCreado;
  }

  buscarSocio(id: number): Socio | null {
    return this.socios.find((socio) => socio.id === id) ?? null;
  }

  reservarLibro(socioId: number, libroISBN: string): void {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);

    if (!socio || !libro) {
      throw new Error("No se encontro");
    }

    // Si el libro está disponible, no se puede reservar
    const prestado = this.socios.some(s => s.tienePrestadoLibro(libro));
    if (!prestado) {
      throw new Error("El libro está disponible, no es necesario reservar");
    }

    libro.agregarReserva(socioId);
    console.log(`Socio ${socio.nombreCompleto} reservó el libro "${libro.titulo}"`);
  }

  retirarLibro(socioId: number, libroISBN: string): void {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);

    if (!socio || !libro) {
      throw new Error("No se encontro");
    }

    // Si hay reservas, solo el primer socio puede retirar
    if (libro.tieneReservas()) {
      if (libro.primerReserva() !== socioId) {
        throw new Error("El libro está reservado por otro socio");
      }
      libro.quitarReserva(); // El socio retira y sale de la cola
    } else {
      // Si no hay reservas, verificar que no esté prestado
      for (const socio of this.socios) {
        if (socio.tienePrestadoLibro(libro)) {
          throw new Error("Libro no esta disponible");
        }
      }
    }

    socio.retirar(libro, this.DURACION);
  }

  devolverLibro(socioId: number, libroISBN: string) {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);

    if (!socio || !libro) {
      throw new Error("No se encontro");
    }

    const prestamo = socio.devolver(libro);

    // Notificar si el libro estaba vencido
    const hoy = new Date();
    if (hoy > prestamo.vencimiento) {
      socio.notificar(`Has devuelto el libro "${libro.titulo}" con atraso. Multa generada: $${socio.deuda}.`);
    }

    // Notificar al primer socio en la cola de reservas
    if (libro.tieneReservas()) {
      const siguienteSocioId = libro.primerReserva();
      const siguienteSocio = this.buscarSocio(siguienteSocioId!);
      if (siguienteSocio) {
        siguienteSocio.notificar(
          `El libro "${libro.titulo}" que reservaste está disponible para retirar.`
        );
      }
    }
  }
}

export const biblioteca = new Biblioteca();
export type { Biblioteca };
