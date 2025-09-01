import { Libro } from "./Libro";
import { Socio } from "./Socio";
import { Autor } from "./Autor";
import { eventoBiblioteca } from "./EventoBiblioteca";

class Biblioteca {
  private inventario: Libro[] = [];
  private socios: Socio[] = [];
  private DURACION = 14;
  private autores: Autor[] = [];
  private eventos: eventoBiblioteca[] = [];

  //Para recomendar los libros a un socio
  recomendarLibros(socioId: number): Libro[] {
    const socio = this.buscarSocio(socioId);
    if (!socio) {
      throw new Error("Socio no encontrado");
    }
    const recomendaciones: Libro[] = [];
    const historial = socio.historialDeLectura;

    //Recorremos el historial para ver los libros leido por el socio
    historial.forEach(isbnLeido => {
      const libroLeido = this.buscarLibro(isbnLeido);
      if (libroLeido) {
        const librosDelMismoAutor = this.inventario.filter
          (libro => libro.autor.nombre === libroLeido.autor.nombre && !socio.haLeidoLibro(libro.isbn) // que el socio no lo haya leido.
          );

        librosDelMismoAutor.forEach
          (libroRecomendado => {
            if (!recomendaciones.includes(libroRecomendado)) {
              recomendaciones.push(libroRecomendado);
            }
          });
      }
    });
    return recomendaciones;
  }

  //Agregar Autor
  agregarAutor(nombre: string, apellido: string, biografia: string, anioNacimiento: number): Autor {
    const autorExistente = this.autores.find(p => p.nombre === nombre);
    if (autorExistente) {
      throw new Error("El autor ya existe");
    }
    const autorCreado = new Autor(nombre, apellido, biografia, anioNacimiento);
    this.autores.push(autorCreado);
    return autorCreado;

  }

  buscarAutor(nombre: string): Autor | null {
    return this.autores.find(n => n.nombre === nombre) ?? null; //Si no encuentra el nombre dentro de la lista de autores retorna un valor nulo
  }

  // Funciones de libros
  agregarLibro(titulo: string, autorNombre: string, isbn: string): Libro {
    const autor = this.buscarAutor(autorNombre);
    if (!autor) {
      throw new Error(`El autor ${autorNombre} no está registrado en la Biblioteca`);
    }

    const libroCreado = new Libro(titulo, autor, isbn);
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
      throw new Error("No se encontro el socio o el libro");
    }
    // fijarse si esta disponible
    let estaPrestado = false;
    for (const socio of this.socios) {
      if (socio.tienePrestadoLibro(libro)) {
        estaPrestado = true;
        break;//si un socio tiene el libro prestado, lo reserva y sale del ciclo
      }
      if (estaPrestado) {
        //si el libro esta prestado, se le ofrece
        console.log(`El libro ${libro.titulo} no está disponible.`);
        libro.reservar(socioId);
      } else {
        //si el libro esta disponible se le presta al socio por 14 días
        socio.retirar(libro, this.DURACION)
        console.log(`El socio ${socio.nombreCompleto} retiró el libro ${libro.titulo}`);
      }
    }
    //socio.retirar(libro, this.DURACION);
  }

  devolverLibro(socioId: number, libroISBN: string) {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);

    if (!socio || !libro) {
      throw new Error("No se encontro el socio o el librp");
    }

    socio.devolver(libro); //El socio devuelve el libro
    console.log(`El socio ${socio.nombreCompleto} ha devuelto el libro ${libro.titulo}`);

    //se obtiene el objeto prestamo
    const prestamoDevuelto = socio.devolver(libro);

    //se verifica si el libro se devolvio con retraso
    const hoy = new Date();
    const diasDeRetraso = Math.ceil((hoy.getTime() - prestamoDevuelto.vencimiento.getTime())) / (1000 * 60 * 60 * 24);
    /*
     (1000 * 60 * 60 * 24) - Convierte milisegundos a días:
      1000 milisegundos = 1 segundo
      * 60 = 1 minuto
      * 60 = 1 hora
      * 24 = 1 día
      * 
      * Math.ceil - para redondear hacia arriba los dias de retraso
    */

    if (diasDeRetraso > 0) {
      const multaCalculada = diasDeRetraso * 50; //Es el monto de la multa por día
      socio.agregarMulta(multaCalculada);
      console.log(`¡Atención! El libro se devolvió con ${diasDeRetraso} días de retraso. Se ha aplicado una multa de $${multaCalculada}.`);
    }

    //Validacion para ver si un libro tiene reserva de algun socio
    if (libro.tieneReservas()) {
      const siguienteSocioId = libro.obtenerSiguienteReserva();
      const siguienteSocio = this.buscarSocio(siguienteSocioId!); //es distinto de null

      if (siguienteSocio) {
        console.log(`¡Notificación! El libro ${libro.titulo} está disponible para el socio ${siguienteSocio.nombreCompleto}`);
      }
    }
  }

  //Funciones para los eventos
  crearEventos(nombre: string, fecha: Date, descripcion: string): eventoBiblioteca {
    const eventoCreado = new eventoBiblioteca(nombre, fecha, descripcion);
    this.eventos.push(eventoCreado);
    return eventoCreado;
  }

  buscarEvento(nombre: string): eventoBiblioteca | null {
    return this.eventos.find(e => e.nombre === nombre) ?? null; //Si encuentra el nombre lo retorna, sino retorna null
  }

  registrarSocioEnEvento(socioId: number, eventoNombre: string): void {
    const socio = this.buscarSocio(socioId);
    const evento = this.buscarEvento(eventoNombre);

    if (!socio || !evento) {
      throw new Error("Socio o evento no encontrado")
    }
    evento.registrarSocio(socioId);
    console.log(`El socio ${socio.nombreCompleto} se ha registrado al evento ${eventoNombre}`)
  }

  notificarSocios(): void {
    console.log('--- NOTIFICACIONES ---');
    this.socios.forEach(socio => {
      //Notificacion de libro vencido
      const prestamosVencidos = socio.prestamosVencidos();
      if (prestamosVencidos.length > 0) {
        console.log(`[AVISO] ${socio.nombreCompleto}: Tienes ${prestamosVencidos.length} libros vencidos, por favor, regresalos para evitar multas`);
      }
      //Notificacion para otros eventos
      this.eventos.forEach(evento => {
        console.log(`[EVENTO] ${socio.nombreCompleto}: ¡Recordatorio! Estás registrado en el evento ${evento.nombre} que se realizá el ${evento.fecha.toLocaleDateString()}.`);
      });
    });
    console.log("------------------------------------")
  }
}

export const biblioteca = new Biblioteca();
export type { Biblioteca };
