import { Libro } from "./Libro";
import { Socio, SocioFactory, TipoSocio } from "./socio";
import { IPoliticaPrestamo, PoliticaEstricta } from "./politicaPrestamo";
import { IBuscable, CatalogoBiblioteca, BuscadorUniversal } from "./buscador";

class Biblioteca {
  private inventario: Libro[] = [];
  private socios: Socio[] = [];
  private politicaActual: IPoliticaPrestamo = new PoliticaEstricta();
  private sistemasDeBusqueda: IBuscable[] = [];

  constructor() {
    this.sistemasDeBusqueda.push(new CatalogoBiblioteca(this.inventario));
  }

  // Funciones de libros
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

  // Funciones de socios
  registrarSocio(
    tipo: TipoSocio,
    id: number,
    nombre: string,
    apellido: string
  ): Socio {
    const socioCreado = SocioFactory.crearSocio(tipo, id, nombre, apellido);
    this.socios.push(socioCreado);
    return socioCreado;
  }

  buscarSocio(id: number): Socio | null {
    return this.socios.find((socio) => socio.id === id) ?? null;
  }

  // Funciones de prestamo
  retirarLibro(socioId: number, libroISBN: string): void {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);

    if (!socio || !libro) {
      throw new Error("No se encontro");
    }

    if (!this.politicaActual.esPrestamoPermitido(socio, libro)) {
      throw new Error("El prestamo no es permitido segun la politica actual.");
    }

    for (const s of this.socios) {
      if (s.tienePrestadoLibro(libro)) {
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

  // Funciones de política de prestamo
  setPoliticaPrestamo(politica: IPoliticaPrestamo): void {
    this.politicaActual = politica;
  }

  // Funciones de busqueda
  buscarEnBiblioteca(criterio: string): Libro[] {
    const buscador = new BuscadorUniversal(this.sistemasDeBusqueda);
    return buscador.buscarEnTodosLosSistemas(criterio);
  }
}

export const biblioteca = new Biblioteca();
export type { Biblioteca };