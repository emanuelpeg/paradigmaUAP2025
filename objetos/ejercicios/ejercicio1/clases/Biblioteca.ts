import { Libro } from "./Libro";
import { Socio } from "./Socio";
import { Autor } from "./Autor";
import { EventoBiblioteca } from "./EventoBiblioteca";

class Biblioteca {
  private inventario: Libro[] = [];
  private socios: Socio[] = [];
  private DURACION = 14;
  private eventos: EventoBiblioteca[] = [];

   /**
   * Agrega un libro al inventario.
   * @param titulo Título del libro
   * @param autor Autor del libro (objeto Autor)
   * @param isbn ISBN del libro
   */
  // Funciones de libros
  agregarLibro(titulo: string, autor: Autor, isbn: string): Libro {
    const libroCreado = new Libro(titulo, autor, isbn);
    this.inventario.push(libroCreado);
    return libroCreado;
  }

  agregarEvento(evento: EventoBiblioteca) {
    this.eventos.push(evento);
    // Notifica a los socios registrados
    evento.sociosRegistrados.forEach(id => {
      const socio = this.buscarSocio(id);
      if (socio) {
        socio.agregarNotificacion(`Tienes un evento próximo: ${evento.nombre} el ${evento.fecha.toLocaleDateString()}`);
      }
    });
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
 /**
   * Busca todos los libros de un autor específico.
   * @param autor Autor a buscar
   * @returns Array de libros escritos por ese autor
   */
  buscarLibrosPorAutor(autor: Autor): Libro[] {
    return this.inventario.filter(libro => libro.autor === autor);
  }


  //Busca el socio y el libro por sus identificadores.
  reservarLibro(socioId: number, libroISBN: string): void {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);

    if (!socio || !libro) {
      throw new Error("No se encontro");
    }//Si no encuentra el socio o el libro, lanza un error.

    // Si el libro está disponible, no se puede reservar
    if (!this.socios.some(s => s.tienePrestadoLibro(libro))) {
      throw new Error("El libro está disponible, no se puede reservar");
    }

    //Si el libro está disponible (nadie lo tiene prestado), no permite reservarlo.
    if (libro.agregarReserva(socio)) {
      console.log(`Reserva agregada para ${socio.nombreCompleto} en el libro ${libro.titulo}`);
    } else {
      console.log(`El socio ya tiene una reserva para este libro`);
    }
  }
  //Intenta agregar la reserva. Si es exitosa, muestra un mensaje; si no, indica que el socio ya reservó ese libro.
  devolverLibro1(socioId: number, libroISBN: string) {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);

    if (!socio || !libro) {
      throw new Error("No se encontro");
    }

    socio.devolver(libro);

    // Si hay reservas, notificar al próximo socio
    if (libro.tieneReservas()) {
      const siguienteSocio = libro.quitarReserva();
      if (siguienteSocio) {
        const mensaje = `El libro "${libro.titulo}" está disponible para ti.`;
        console.log(`Notificación: ${mensaje}`);
        siguienteSocio.agregarNotificacion(mensaje);
      }
    }
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

  retirarLibro(socioId: number, libroISBN: string): void {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);

    if (!socio || !libro) {
      throw new Error("No se encontro");
    }

    // Bloquear préstamo si tiene deuda
    if (socio.deudaPendiente > 0) {
      throw new Error(
        `El socio tiene una deuda de $${socio.deudaPendiente}. Debe pagar antes de retirar nuevos libros.`
      );
    }

    for (const socio of this.socios) {
      if (socio.tienePrestadoLibro(libro)) {
        throw new Error("Libro no esta disponible");
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

    socio.devolver(libro);
  }

  recomendarLibros(socioId: number): Libro[] {
    const socio = this.buscarSocio(socioId);
    if (!socio) return [];

    // Obtiene autores del historial de lectura
    const autoresLeidos = socio.historialLectura.map(libro => libro.autor);

    // Recomienda libros del mismo autor que no estén en el historial
    return this.inventario.filter(libro =>
      autoresLeidos.includes(libro.autor) &&
      !socio.historialLectura.includes(libro)
    );
  }

  
}

export const biblioteca = new Biblioteca();
export type { Biblioteca };
