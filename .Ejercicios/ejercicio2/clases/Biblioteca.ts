import { Libro } from "./Libro";
import { TipoPrestamo } from "./PrestamoBase";
import { Socio, SocioFactory, TipoSocio } from "./Socio";
import { IPoliticaPrestamo } from "../interfaces/IPoliticaPrestamo";
import { PoliticaFlexible, PoliticaDocente, PoliticaEstricta, PoliticaEstudiante } from "./Politicas";
import { CatalogoBiblioteca } from "./CatalogoBiblioteca";
import { BibliotecaDigital } from "./BibliotecaDigital";
import { ArchivoHistorico, Documento } from "./ArchivoHistorico";
import { Articulo, BaseConocimiento } from "./BaseConocimiento";


class Biblioteca {
  private catalogo: CatalogoBiblioteca = new CatalogoBiblioteca([]);
  private digital: BibliotecaDigital = new BibliotecaDigital([]);
  private archivoHistorico: ArchivoHistorico = new ArchivoHistorico([]);
  private baseConocimiento: BaseConocimiento = new BaseConocimiento([]);

  private socios: Socio[] = [];

  constructor(private politica: IPoliticaPrestamo) {
    this.politica = politica;
  }

  get libros() {
    return this.catalogo;
  }
  get digitalLibros() {
    return this.digital;
  }
  get archivo() {
    return this.archivoHistorico;
  }
  get baseDeConocimiento() {
    return this.baseConocimiento;
  }


  get sociosRegistrados() {
    return this.socios;
  }

  setPoliticaPrestamo(politica: IPoliticaPrestamo) {
    this.politica = politica;
  }

  // Funciones de libros
  agregarLibroCatalogo(titulo: string, autor: string, isbn: string): Libro {
    const libroCreado = new Libro(titulo, autor, isbn);
    this.catalogo.agregar(libroCreado);
    return libroCreado;
  }

  agregarLibroDigital(url: string): string {
    this.digital.agregarRecurso(url);
    return url;
  }

  agregarDocumentoHistorico(titulo: string, fecha: number, descripcion: string): Documento {
    const documentoCreado = new Documento(titulo, fecha, descripcion);
    this.archivoHistorico.agregarDocumento(documentoCreado);
    return documentoCreado;
  }

  agregarArticuloBase(titulo: string, autor: string, texto: string): Articulo {
    const articuloCreado = new Articulo(titulo, autor, texto);
    this.baseConocimiento.agregarArticulo(articuloCreado);
    return articuloCreado;
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

  retirarLibro(socioId: number, libroISBN: string, tipo?: TipoPrestamo): void {
    const socio = this.buscarSocio(socioId);
    const libro = this.catalogo.buscar((isbn) => isbn === libroISBN);
    if (!socio || !libro) throw new Error("No se encontro");
    const prestamo = this.politica.generarPrestamo(socio, libro, tipo);
    if (!prestamo) throw new Error("No se pudo generar el prestamo");
    socio.retirarLibro(prestamo);
  }
    

  devolverLibro(socioId: number, libroISBN: string) {
    const socio = this.buscarSocio(socioId);
    const libro = this.catalogo.buscar((isbn) => isbn === libroISBN);

    if (!socio || !libro) {
      throw new Error("No se encontro");
    }

    socio.devolver(libro);
  }
}

export const biblioteca = new Biblioteca(new PoliticaEstricta());
export type { Biblioteca };
