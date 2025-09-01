import { Libro } from "./Libro";
import { Socio, SocioFactory, TipoSocio } from "./Socio";
import { PoliticaEstricta, PoliticaPrestamo } from "./PoliticaPrestamo";
import { BuscadorUniversal, CatalogoBiblioteca, IBuscable } from "./Buscador";
import { TipoPrestamo, PrestamoRegular, PrestamoCorto, PrestamoReferencia, PrestamoDigital, Prestamo } from "./Prestamo";

class Biblioteca {
  private inventario: Libro[] = [];
  private socios: Socio[] = [];
  private politicaPrestamo: PoliticaPrestamo = new PoliticaEstricta;
  private buscador: BuscadorUniversal = new BuscadorUniversal();


  constructor(){
    this.buscador.agregarSistema(new CatalogoBiblioteca(this.inventario));
  }

  setPoliticaPrestamo(politica: PoliticaPrestamo): void {
    this.politicaPrestamo = politica;
  }

  getPoliticaPrestamo(): PoliticaPrestamo {
    return this.politicaPrestamo;
  }

  // Funciones de búsqueda
  buscar(criterio: string): Libro[] {
    return this.buscador.buscarEnTodos(criterio);
  }

  agregarSistemaBusqueda(sistema: IBuscable): void {
    this.buscador.agregarSistema(sistema);
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
  }

  public procesarPrestamo(
    socio: Socio,
    libro: Libro,
    tipoPrestamo: TipoPrestamo
  ): void {
    let prestamo;

    switch (tipoPrestamo) {
      case TipoPrestamo.CORTO:
        prestamo = new PrestamoCorto(libro);
        break;

      case TipoPrestamo.REFERENCIA:
        prestamo = new PrestamoReferencia(libro);
        break;

      case TipoPrestamo.DIGITAL:
        prestamo = new PrestamoDigital(libro);
        break;

      default:
        prestamo = new PrestamoRegular(libro);
    }

    const dias = this.politicaPrestamo.getDuracionPrestamo(socio, libro);
    socio.retirar(libro, dias);
  }


  devolverLibro(socioId: number, libroISBN: string) {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);

    if (!socio || !libro) {
      throw new Error("No se encontro");
    }

    const prestamo = socio.devolver(libro);

    const multa = prestamo.calcularMulta();
    if (multa > 0) {
      console.log(`Multa aplicada es: $${multa} `);
    }

    socio.devolver(libro);
  }
}

export const biblioteca = new Biblioteca();
export type { Biblioteca };
