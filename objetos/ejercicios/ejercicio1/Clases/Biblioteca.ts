import { Libro } from './Libro';
import { Socio } from './Socio';
import { Autor } from './Autor';
import { EventoBiblioteca } from './EventoBiblioteca';

export class Biblioteca {
    private inventario: Libro[];
    private socios: Socio[];
    private duracion: number = 7;
    private reservas: Map<string, Socio[]> = new Map(); // isbn -> fila de reservas

    constructor() {
        this.inventario = [];
        this.socios = [];
      this.reservas = new Map();
    }

    //Funciones de Libro
    agregarLibro(titulo: string, autor: Autor, isbn: string){
        const libro = new Libro(titulo, autor, isbn);
        this.inventario.push(libro);
        return libro;
    }

    buscarLibro(isbn: string): Libro | null {
        //return this.inventario.find(libro => libro.titulo === titulo); --------Nono
        const libroEncontrado = this.inventario.find((libro) => libro.isbn === isbn);
        if (!libroEncontrado) {
            return null;
        }
        return libroEncontrado;
    }

    //Funciones de Socio
    registrarSocio(id: number, nombre: string, apellido: string): Socio{
        const socio = new Socio(id, nombre, apellido);
        this.socios.push(socio);
        return socio;
    }

    buscarSocio(id: number): Socio | null{
        return this.socios.find((socio) => socio.id == id) ?? null;
    }

    //Funciones de Libros
    retirarLibro(socioId: number, libroISBN: string): void {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);

    if (!socio || !libro) {
      throw new Error("No se encontró");
    }
    if (socio.calcularMulta(new Date()) > 0) {
      throw new Error("No podés retirar libros hasta saldar tus multas.");
    }

    // Verificar si el libro está prestado
    const libroPrestado = this.socios.some(s => s.tienePrestadoLibro(libro));
    if (libroPrestado) {
      // Si el libro no está disponible, reservar y notificar
      this.reservarLibro(socioId, libroISBN);
      EventoBiblioteca.notificarReserva(
        socio,
        libro.titulo
      );
      throw new Error("El libro no está disponible. Se ha realizado una reserva");
    }

    // Si está disponible, realizar el préstamo y notificar
    socio.retirar(libro, this.duracion);
    EventoBiblioteca.notificarPrestamo(
      socio,
      libro.titulo,
      new Date(Date.now() + this.duracion * 24 * 60 * 60 * 1000)
    );
  }

  devolverLibro(socioId: number, libroISBN: string) {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);

    if (!socio || !libro) {
      throw new Error("No se encontró");
    }

      socio.devolver(libro);
      EventoBiblioteca.notificarDevolucion(
        socio,
        libro.titulo
      );

      // Verificar si hay reservas para un libro
      const cola = this.reservas.get(libroISBN);
      if (cola && cola.length > 0) {
        const siguienteSocio = cola.shift();
        if (siguienteSocio) {
            EventoBiblioteca.notificarReserva(
              siguienteSocio,
              libro.titulo
            );
          // El socio puede retirar el libro automáticamente si se desea
          // this.retirarLibro(siguienteSocio.id, libroISBN); ------- No va
        }
        // Actualizar la fila de reservas
        this.reservas.set(libroISBN, cola);
      }
  }

    reservarLibro(socioId: number, libroISBN: string) {
      const socio = this.buscarSocio(socioId);
      if (!socio) throw new Error("Socio no encontrado");
      let cola = this.reservas.get(libroISBN);
      if (!cola) cola = [];
      // Evitar reservas duplicadas
      if (!cola.some(s => s.id === socioId)) {
        cola.push(socio);
        this.reservas.set(libroISBN, cola);
        // La notificación de reserva solo se hace cuando el libro no está disponible, no aquí
      }
    }
    
     //Funciones de Autor
    private autores: Autor[] = [];
    registrarAutor(autor: Autor) {
      this.autores.push(autor);
    }

    buscarAutorPorNombre(nombre: string): Autor | undefined {
      return this.autores.find(a => a.nombre === nombre);
    }

    //Funciones varias
    buscarLibrosPorAutor(autor: Autor): Libro[] {
      return this.inventario.filter(libro => libro.autor === autor);
    }

    // Buscar libros por nombre de autor
    buscarLibrosPorNombreAutor(nombre: string): Libro[] {
      return this.inventario.filter(libro => libro.autor.nombre === nombre);
    }

    recomendarLibros(socio: Socio): Libro[] {
    const autoresLeidos = socio.historialLectura.map(l => l.autor);
    return this.inventario.filter(libro =>
      autoresLeidos.includes(libro.autor) && !socio.historialLectura.includes(libro)
    );
    }
}
export const biblioteca = new Biblioteca();