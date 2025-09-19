import { Socio, SocioRegular } from "./Socio";
import { Prestamo, PrestamoRegular } from "./Prestamo";
import { Libro } from "./Libro";
import { PoliticaEstricta, PoliticaEstudiantil, PoliticaPrestamo } from "./PoliticaPrestamo";

class Biblioteca {
  private politica: PoliticaPrestamo;
    constructor(politica: PoliticaPrestamo = new PoliticaEstricta()) {
      this.politica = politica;
    }
  setPolitica(politica: PoliticaPrestamo) {
      this.politica = politica;
  }
    puedePrestar(socio: Socio, prestamos: Prestamo[]): boolean {
    return this.politica.permitirPrestamo(socio, prestamos);
  }
  private socios: Socio[] = [];
  private prestamos: Prestamo[] = [];
  private libros: Libro[] = [];

  // --- Gestión de Socios ---
  agregarSocio(socio: Socio): void {
    this.socios.push(socio);
  }

  listarSocios(): Socio[] {
    return this.socios;
  }

  buscarSocioPorNombre(nombre: string): Socio | undefined {
    return this.socios.find(s => s.nombre === nombre);
  }

  // --- Gestión de Libros ---
  agregarLibro(libro: Libro): void {
    this.libros.push(libro);
  }

  listarLibros(): Libro[] {
    return this.libros;
  }

  buscarLibroPorTitulo(titulo: string): Libro | undefined {
    return this.libros.find(l => l.titulo === titulo);
  }

  // --- Gestión de Préstamos ---
  registrarPrestamo(prestamo: Prestamo): boolean {
    const socio = prestamo.socio;

    // Verificamos que el socio pueda tener más préstamos
    if (socio.getPrestamos().length < socio.maxLibros()) {
      // Asociar el préstamo al socio
      socio.agregarPrestamo(prestamo);

      // Guardar en la biblioteca
      this.prestamos.push(prestamo);
      return true;
    }

    return false;
  }

  listarPrestamos(): Prestamo[] {
    return this.prestamos;
  }
}

export { Biblioteca };
