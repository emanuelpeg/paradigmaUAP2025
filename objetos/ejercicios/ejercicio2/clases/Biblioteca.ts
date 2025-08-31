import { Libro } from "./Libro";
import { Socio, SocioFactory, TipoSocio } from "./Socio";
import { PoliticaPrestamo, PoliticaEstricta } from "./politica";




class Biblioteca {
  private inventario: Libro[] = [];
  private socios: Socio[] = [];
  private politica: PoliticaPrestamo = new PoliticaEstricta();

  
  setPolitica(politica: PoliticaPrestamo) {
    this.politica = politica;
  }

  // Funciones de libros
  agregarLibro(titulo: string, autor: string, isbn: string): Libro {
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
  registrarSocio(tipo: TipoSocio, id: number, nombre: string, apellido: string): Socio {
    const socioCreado = SocioFactory.crearSocio(tipo, id, nombre, apellido);
    this.socios.push(socioCreado);
    return socioCreado;
  }

  buscarSocio(id: number): Socio | null {
    return this.socios.find((socio) => socio.id === id) ?? null;
  }

retirarLibro(socioId: number, libroISBN: string, tipo: "regular" | "corto" | "referencia" | "digital" = "regular"): void {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);

    if (!socio || !libro) {
      throw new Error("No se encontro");
    }
    for (const socio of this.socios) {
      if (socio.tienePrestadoLibro(libro)) {
        throw new Error("Libro no esta disponible");
      }
    }
    if (!this.politica.puedePrestar(socio)) {
      throw new Error("No puede retirar libros según la política actual");
    }

    // Usa la duración definida por la política
    const duracion = this.politica.getDuracionPrestamo(socio);
    // Puedes pasar la duración al tipo de préstamo si lo necesitas
    socio.retirar(libro, tipo); // Si tu lógica lo requiere, adapta para usar la duración
  }
  


  devolverLibro(socioId: number, libroISBN: string) {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);

    if (!socio || !libro) {
      throw new Error("No se encontro");
    }

    socio.devolver(libro);
  }
}

export const biblioteca = new Biblioteca();
export type { Biblioteca };
