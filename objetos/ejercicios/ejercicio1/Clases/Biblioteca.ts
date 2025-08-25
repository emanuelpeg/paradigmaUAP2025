import { Libro } from './Libro';
import { Socio } from './Socio';

export class Biblioteca {
    private inventario: Libro[];
    private socios: Socio[];
    private duracion: number = 7;
    private reservas: Map<string, Socio[]> = new Map(); // isbn -> cola de reservas

    constructor() {
        this.inventario = [];
        this.socios = [];
      this.reservas = new Map();
    }

    //Funciones de Libro
    agregarLibro(titulo: string, _autor: string, isbn: string){
        const libro = new Libro(titulo, _autor, isbn);
        this.inventario.push(libro);
        return libro;
    }

    buscarLibro(isbn: string): Libro | null {
        //return this.inventario.find(libro => libro.titulo === titulo);
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

    retirarLibro(socioId: number, libroISBN: string): void {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);

    if (!socio || !libro) {
      throw new Error("No se encontro");
    }
    if (socio.calcularMulta(new Date()) > 0) {
      throw new Error("No puedes retirar libros hasta saldar tus multas.");
    }
    // fijarse si esta disponible
    for (const socio of this.socios) {
      if (socio.tienePrestadoLibro(libro)) {
    // Si el libro no está disponible, reservar
    this.reservarLibro(socioId, libroISBN);
    throw new Error("Libro no está disponible. Se ha realizado una reserva si no existía previamente.");
      }
    }
    socio.retirar(libro, this.duracion);
  }

  devolverLibro(socioId: number, libroISBN: string) {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);

    if (!socio || !libro) {
      throw new Error("No se encontro");
    }

    socio.devolver(libro);

      // Verificar si hay reservas para este libro
      const cola = this.reservas.get(libroISBN);
      if (cola && cola.length > 0) {
        const siguienteSocio = cola.shift();
        if (siguienteSocio) {
          siguienteSocio.notificar(`El libro '${libro.titulo}' ahora está disponible para ti.`);
          // El socio puede retirar el libro automáticamente si se desea
          // this.retirarLibro(siguienteSocio.id, libroISBN);
        }
        // Actualizar la cola
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
        socio.notificar(`Has reservado el libro con ISBN ${libroISBN}. Se te avisará cuando esté disponible.`);
      }
    }
}

export const biblioteca = new Biblioteca();