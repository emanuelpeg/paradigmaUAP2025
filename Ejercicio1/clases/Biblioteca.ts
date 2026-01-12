  
import { Libro } from "./Libro";
import { Socio } from "./Socio";
import { Autor } from "./Autor";

class Biblioteca {
  
  private inventario: Libro[] = [];
  private socios: Socio[] = [];
  private DURACION = 14;
  private Multa = 50;


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
      throw new Error("Socio o libro no encontrado");
    }
    
    // Verificar si el socio tiene multas pendientes
    if (socio.verificarMultas()) {
      throw new Error("El socio tiene multas pendientes");
    }
    
    // Verificar si el socio ya tiene este libro
    if (libro.tienePrestadoLibro(socio)) {
      throw new Error("El socio ya tiene este libro prestado");
    }
    
    // Si el libro está prestado por otro socio, agregar a cola de espera
    if (libro.libroPrestado()) {
      libro.agregarAColaDeEspera(socio);
      socio.agregarNotificacion(`El libro '${libro.titulo}' no está disponible. Te agregamos a la lista de espera.`);
      throw new Error("El libro no está disponible, lo agregaremos a la lista de espera");
    }

    // Crear el préstamo
    libro.nuevoPrestamo(this.DURACION, socio);
    socio.agregarNotificacion(`Has retirado el libro '${libro.titulo}'.`);
  }

  devolverLibro(socioId: number, libroISBN: string) {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);

    if (!socio || !libro) {
      throw new Error("Socio o libro no encontrado");
    }
    
    const diasPasados = libro.prestamoVencido();
    if (diasPasados && diasPasados > 0) {
      const multaTotal = diasPasados * this.Multa;
      socio.agregarMulta(multaTotal);
      socio.agregarNotificacion(`Tienes una multa de $${multaTotal} por el libro '${libro.titulo}'.`);
      console.log(`El socio ${socio.nombreCompleto} tiene una multa de $${multaTotal}`);
    }
    
    libro.devolver(socio, this.DURACION);
    socio.agregarNotificacion(`Has devuelto el libro '${libro.titulo}'.`);
  }

  recomendarLibrosParaSocio(socioId: number): Libro[] {
    const socio = this.buscarSocio(socioId);
    if (!socio) return [];
    return socio.recomendarLibros(this.inventario);
  }

  // Método para obtener estadísticas de la biblioteca
  obtenerEstadisticas(): {
    totalLibros: number;
    librosPrestados: number;
    librosDisponibles: number;
    totalSocios: number;
    sociosConMultas: number;
  } {
    const totalLibros = this.inventario.length;
    const librosPrestados = this.inventario.filter(libro => libro.libroPrestado()).length;
    const librosDisponibles = totalLibros - librosPrestados;
    const totalSocios = this.socios.length;
    const sociosConMultas = this.socios.filter(socio => socio.verificarMultas()).length;

    return {
      totalLibros,
      librosPrestados,
      librosDisponibles,
      totalSocios,
      sociosConMultas
    };
  }

  // Método para mostrar el estado de un libro específico
  estadoLibro(isbn: string): string {
    const libro = this.buscarLibro(isbn);
    if (!libro) return "Libro no encontrado";
    
    if (libro.libroPrestado()) {
      return `Prestado. Cola de espera: ${(libro as any).colaDeEspera.length} personas`;
    }
    return "Disponible";
  }
}

export const biblioteca = new Biblioteca();
export type { Biblioteca };