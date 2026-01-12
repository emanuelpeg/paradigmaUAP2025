import { PoliticaPrestamo } from "./PoliticaPrestamo";
import { Libro } from "./Libro";
import { Socio, SocioFactory, TipoSocio } from "./Socio";



class Biblioteca {

  prestarLibro(socio: Socio, libro: Libro, politica: PoliticaPrestamo): void {
    if (!politica.puedePrestar(socio)) {
       throw new Error("No se puede prestar el libro según la política actual");
    }
    for (const s of this.socios) {
      if (s.tienePrestadoLibro(libro)) {
         throw new Error("Libro no está disponible");
      }
    }
    const duracion = politica.calcularDuracion(socio);
     socio.retirar(libro, duracion);
  }
  private inventario: Libro[] = [];
   private socios: Socio[] = [];


  agregarLibro(titulo: string, autor: string, isbn: string): Libro {
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

  registrarSocio(tipo: TipoSocio, id: number, nombre: string, apellido: string): Socio {
    const socioCreado = SocioFactory.crearSocio(tipo, id, nombre, apellido);
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
    for (const socio of this.socios) {
      if (socio.tienePrestadoLibro(libro)) {
        throw new Error("Libro no esta disponible");
      }
    }

    socio.retirar(libro);
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
