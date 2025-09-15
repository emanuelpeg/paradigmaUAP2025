import { Libro } from "./Libro";
import { Socio, SocioFactory, TipoSocio } from "./Socio";
import { TipoPrestamo } from "./Prestamo";
import { PoliticaPrestamo, PoliticaEstricta } from "./PoliticaPrestamo";
import { CatalogoBiblioteca } from "./CatalogoBiblioteca";
import { BibliotecaDigital, RecursoDigital } from "./BibliotecaDigital";
import { ArchivoHistorico, DocumentoHistorico } from "./ArchivoHistorico";
import { BaseConocimiento, ArticuloAcademico } from "./BaseConocimiento";
import { BuscadorUniversal } from "./BuscadorUniversal";

class Biblioteca {
  private inventario: Libro[] = [];
  private socios: Socio[] = [];
  private politica: PoliticaPrestamo = new PoliticaEstricta();

  // Sistemas de búsqueda
  private catalogo: CatalogoBiblioteca;
  private bibliotecaDigital: BibliotecaDigital;
  private archivoHistorico: ArchivoHistorico;
  private baseConocimiento: BaseConocimiento;
  private buscadorUniversal: BuscadorUniversal;

  constructor() {
    this.catalogo = new CatalogoBiblioteca(this.inventario);
    this.bibliotecaDigital = new BibliotecaDigital([]);
    this.archivoHistorico = new ArchivoHistorico([]);
    this.baseConocimiento = new BaseConocimiento([]);
    this.buscadorUniversal = new BuscadorUniversal([
      this.catalogo,
      this.bibliotecaDigital,
      this.archivoHistorico,
      this.baseConocimiento,
    ]);
  }

  setPolitica(politica: PoliticaPrestamo) {
    this.politica = politica;
  }

  // Funciones de libros
  agregarLibro(titulo: string, autor: string, isbn: string): Libro {
    const libroCreado = new Libro(titulo, autor, isbn);
    this.inventario.push(libroCreado);
    // Actualiza el catálogo físico
    this.catalogo = new CatalogoBiblioteca(this.inventario);
    // Actualiza el buscador universal
    this.buscadorUniversal = new BuscadorUniversal([
      this.catalogo,
      this.bibliotecaDigital,
      this.archivoHistorico,
      this.baseConocimiento,
    ]);
    return libroCreado;
  }

  agregarRecursoDigital(recurso: RecursoDigital) {
    this.bibliotecaDigital = new BibliotecaDigital([
      ...this.bibliotecaDigital.buscarPor(() => true),
      recurso,
    ]);
    this.buscadorUniversal = new BuscadorUniversal([
      this.catalogo,
      this.bibliotecaDigital,
      this.archivoHistorico,
      this.baseConocimiento,
    ]);
  }

  agregarDocumentoHistorico(doc: DocumentoHistorico) {
    this.archivoHistorico = new ArchivoHistorico([
      ...this.archivoHistorico.buscarPor(() => true),
      doc,
    ]);
    this.buscadorUniversal = new BuscadorUniversal([
      this.catalogo,
      this.bibliotecaDigital,
      this.archivoHistorico,
      this.baseConocimiento,
    ]);
  }

  agregarArticuloAcademico(art: ArticuloAcademico) {
    this.baseConocimiento = new BaseConocimiento([
      ...this.baseConocimiento.buscarPor(() => true),
      art,
    ]);
    this.buscadorUniversal = new BuscadorUniversal([
      this.catalogo,
      this.bibliotecaDigital,
      this.archivoHistorico,
      this.baseConocimiento,
    ]);
  }

  buscarUniversal(criterio: (item: any) => boolean): any[] {
    return this.buscadorUniversal.buscarEnTodos(criterio);
  }

  filtrarUniversal(condicion: (item: any) => boolean): any[] {
    return this.buscadorUniversal.filtrarEnTodos(condicion);
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

  buscarLibro(isbn: string): Libro | null {
    return this.inventario.find((libro) => libro.isbn === isbn) ?? null;
  }

  retirarLibro(
    socioId: number,
    libroISBN: string,
    tipoPrestamo: TipoPrestamo = "regular"
  ): void {
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

    // Aplica la política
    if (!this.politica.puedePrestar(socio, libro)) {
      throw new Error("Política de préstamo no permite retirar");
    }

    // Puedes pasar la duración personalizada si lo deseas
    // Ejemplo: podrías modificar el constructor de Prestamo para aceptar duración
    socio.retirar(libro, tipoPrestamo);
  }

  devolverLibro(
    socioId: number,
    libroISBN: string,
    fechaDevolucion: Date = new Date()
  ) {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);

    if (!socio || !libro) {
      throw new Error("No se encontro");
    }

    // Devuelve el objeto con multa
    return socio.devolver(libro, fechaDevolucion);
  }
}

export const biblioteca = new Biblioteca();
export { Biblioteca }; // Cambia export type por export de la clase
