import { Autor } from "./Autor.js";
import { Libro } from "./Libro.js";
import { Socio } from "./Socio.js";
import {EventoBiblioteca} from "./EventoBiblioteca.js"

export class Biblioteca {
  private inventario: Libro[] = [];
  private socios: Socio[] = [];
  private autores: Autor[] = [];
  private DURACION = 1;
  private eventos: EventoBiblioteca[] = [];

  crearEvento(nombre: string, descripcion: string, fecha: Date): EventoBiblioteca {
    const evento = new EventoBiblioteca(nombre, descripcion, fecha);
    this.eventos.push(evento);
    return evento;
  }

  registrarSocioEnEvento(evento: EventoBiblioteca, socioId: number) {
    evento.registrarSocio(socioId);
    const socio = this.buscarSocio(socioId);
    if (socio) {
      socio.recibirNotificacion(`Te has registrado al evento: ${evento.nombre} el ${evento.fecha.toLocaleDateString()}`);
    }
  }

  notificarEventosProximos() {
    const hoy = new Date();
    this.eventos.forEach(evento => {
      if ((evento.fecha.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24) <= 3) { // 3 días o menos
        evento.sociosRegistros.forEach(socioId => {
          const socio = this.buscarSocio(socioId);
          if (socio) {
            socio.recibirNotificacion(`El evento "${evento.nombre}" es pronto: ${evento.fecha.toLocaleDateString()}`);
          }
        });
      }
    });
  }

  agragarAutor(nombre: string, bibliografia: string, nacimiento: number): Autor {
    const autor = new Autor(nombre, bibliografia, nacimiento);
    this.autores.push(autor);
    return autor;
  }

  buscarAutor(nombre: string): Autor | null {
    return this.autores.find(a => a.nombre === nombre) ?? null;
  }

  mostrarAutores(): void {
  console.log("Autores en la biblioteca:");
  this.autores.forEach(a => {
    console.log(`Nombre: ${a.nombre}, Nacimiento: ${a.nacimiento}`);
  });
}
  // Funciones de libros
  agregarLibro(titulo: string, autor: Autor, isbn: string): Libro {
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
      throw new Error("No se encontro");
    }
    // fijarse si esta disponible
    for (const socio of this.socios) {
      if (socio.tienePrestadoLibro(libro)) {
        throw new Error("Libro no esta disponible");
      }
    }

    socio.retirar(libro, this.DURACION);
  }

   recervarLibro(socioId: number, libroISBN: string): void {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);

    if(!socio || !libro){
      throw new Error("No se encontro");
    }

    if (socio.tienePrestadoLibro(libro)){
      throw new Error("Ya tines el libro prestado");
    }

    // Si ya está en la cola de reservas, no puede reservar de nuevo
    if (libro.reservas.includes(socio)) {
      throw new Error("Ya tiene una reserva para este libro");
    }

    libro.reservas.push(socio);
    console.log(`Reserva exitosa: socio ${socioId} reservo el libro con ISBN ${libroISBN}.`);
    console.log(`Hay ${libro.reservas.length} reservas en la cola para este libro.`);
   }

  devolverLibro(socioId: number, libroISBN: string) {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);
    if(socio && libro){
      socio.registrarLectura(libro);
    }

    if (!socio || !libro) {
      throw new Error("No se encontro");
    }

    socio.devolver(libro);
  }

  recomendarLibros(socioId: number): Libro[] {
  const socio = this.buscarSocio(socioId);
  if (!socio) return [];

  const autoresLeidos = socio.HistorialLector.map(l => l.autor);
  const titulosLeidos = socio.HistorialLector.map(l => l.titulo.toLowerCase());

  // Recomienda libros del mismo autor o con títulos similares que el socio no haya leído
  return this.inventario.filter(libro =>
    !socio.HistorialLector.includes(libro) &&
    (
      autoresLeidos.includes(libro.autor) ||
      titulosLeidos.some(titulo => libro.titulo.toLowerCase().includes(titulo))
    )
  );
}
}


export const biblioteca = new Biblioteca();