import { Libro } from "./Libro";
import { Socio } from "./Socio";
import { Autor } from "./Autor";

export class Biblioteca {
  private inventario: Libro[] = [];
  private socios: Socio[] = [];
  private DURACION = 14;

  agregarLibro(titulo: string, autor: Autor, isbn: string): Libro {
    const libro = new Libro(titulo, autor, isbn);
    this.inventario.push(libro);
    return libro;
  }

  buscarLibro(isbn: string): Libro | null {
    return this.inventario.find(libro => libro.isbn === isbn) ?? null;
  }

  registrarSocio(id: number, nombre: string, apellido: string): Socio {
    const socio = new Socio(id, nombre, apellido);
    this.socios.push(socio);
    return socio;
  }

  buscarSocio(id: number): Socio | null {
    return this.socios.find(s => s.id === id) ?? null;
  }

  // -------------------- RETIRAR LIBRO --------------------
  retirarLibro(socioId: number, libroISBN: string) {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);
    if (!socio || !libro) throw new Error("No se encontró");

    for (const s of this.socios) {
      if (s.tienePrestadoLibro(libro)) {
        libro.agregarReserva(socio);
        console.log(`${socio.nombreCompleto} reservó el libro "${libro.titulo}"`);
        return;
      }
    }

    socio.retirar(libro, this.DURACION);
  }

  // -------------------- DEVOLVER LIBRO --------------------
  devolverLibro(socioId: number, libroISBN: string) {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);
    if (!socio || !libro) throw new Error("No se encontró");

    socio.devolver(libro);

    const proximo = libro.obtenerProximaReserva();
    if (proximo) {
      console.log(`Notificación: ${proximo.nombreCompleto}, el libro "${libro.titulo}" está disponible.`);
      libro.eliminarReserva(proximo);
    }
  }
}
