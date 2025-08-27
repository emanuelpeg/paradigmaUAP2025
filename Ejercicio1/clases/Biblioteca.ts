  
import { Libro } from "./Libro";
import { Socio } from "./Socio";
import { Autor } from "./Autor";

class Biblioteca {
  
  private inventario: Libro[] = [];
  private socios: Socio[] = [];
  private DURACION = 14;
  private Multa = 50;

  // Funciones de libros
  agregarLibro(titulo: string, autor: Autor, isbn: string): Libro {
    const libroCreado = new Libro(titulo, autor, isbn);
    
    this.inventario.push(libroCreado);
    return libroCreado;
  }

  buscarLibro(isbn: string): Libro | null {
    return this.inventario.find(libro => libro.isbn === isbn) ?? null;
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

  obtenerDuracion(): number {
    return this.DURACION;
  }

  obtenerMulta(): number {
    return this.Multa;
  }

  retirarLibro(socioId: number, libroISBN: string): void {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);

    if (!socio || !libro) {
      throw new Error("No se encontro");
    }
    // fijarse si esta disponible
    for (const socio of this.socios) {
      if (libro.tienePrestadoLibro(socio)) {
        throw new Error("El libro ya lo tiene usted");
      }
      if (socio.verificarMultas()) {
        throw new Error("El socio tiene multas pendientes");
      }
      if (libro.libroPrestado()) {
        libro.agregarAColaDeEspera(socio);
        socio.agregarNotificacion(`El libro '${libro.titulo}' no está disponible. Te agregamos a la lista de espera.`);
        throw new Error("El libro no esta disponible, lo agregaremos a la lista de espera");
      }
      
    }

    libro.nuevoPrestamo(this.DURACION, socio);
    socio.agregarNotificacion(`Has retirado el libro '${libro.titulo}'.`);
  }

  devolverLibro(socioId: number, libroISBN: string) {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);

    if (!socio || !libro) {
      throw new Error("No se encontro");
    }
    
    const diasPasados = libro.prestamoVencido();
    if (diasPasados) {
      const multaTotal = diasPasados * this.Multa;
      socio.agregarNotificacion(`Tienes una multa de $${multaTotal} por el libro '${libro.titulo}'.`);
      console.log(`El socio ${socio.nombreCompleto} tiene una multa de $${multaTotal}`);
    }
    if (socio.pagarMulta()) {
      libro.devolver(socio);
      socio.agregarNotificacion(`Has devuelto el libro '${libro.titulo}'.`);
    }
  }

  recomendarLibrosParaSocio(socioId: number): Libro[] {
    const socio = this.buscarSocio(socioId);
    if (!socio) return [];
    return socio.recomendarLibros(this.inventario);
  }
}

export const biblioteca = new Biblioteca();
export type { Biblioteca };