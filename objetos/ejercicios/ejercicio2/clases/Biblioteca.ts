import { Libro } from "./Libro";
import { Socio, SocioFactory, TipoSocio } from "./Socio";
import { Prestamo, PrestamoFactory, TipoPrestamo } from "./Prestamo";
import { IPoliticaPrestamo, GestorPoliticas, PoliticaEstricta } from "./PoliticaPrestamo";
import { 
  IBuscable, 
  ResultadoBusqueda, 
  CatalogoBiblioteca, 
  BibliotecaDigital, 
  ArchivoHistorico, 
  BaseConocimiento, 
  BuscadorUniversal,
  RecursoDigital,
  DocumentoHistorico,
  ArticuloAcademico
} from "./SistemaBusqueda";

class Biblioteca {
  private inventario: Libro[] = [];
  private socios: Socio[] = [];
  private prestamosActivos: Prestamo[] = [];
  private renovaciones: Map<Prestamo, number> = new Map();
  private gestorPoliticas: GestorPoliticas;
  private catalogoBiblioteca: CatalogoBiblioteca;
  private bibliotecaDigital: BibliotecaDigital;
  private archivoHistorico: ArchivoHistorico;
  private baseConocimiento: BaseConocimiento;
  private buscadorUniversal: BuscadorUniversal;

  constructor(politicaInicial: IPoliticaPrestamo = new PoliticaEstricta()) {
    this.gestorPoliticas = new GestorPoliticas(politicaInicial);
    this.catalogoBiblioteca = new CatalogoBiblioteca();
    this.bibliotecaDigital = new BibliotecaDigital();
    this.archivoHistorico = new ArchivoHistorico();
    this.baseConocimiento = new BaseConocimiento();
    
    this.buscadorUniversal = new BuscadorUniversal();
    this.buscadorUniversal.agregarSistema(this.catalogoBiblioteca);
    this.buscadorUniversal.agregarSistema(this.bibliotecaDigital);
    this.buscadorUniversal.agregarSistema(this.archivoHistorico);
    this.buscadorUniversal.agregarSistema(this.baseConocimiento);
  }

  agregarLibro(titulo: string, autor: string, isbn: string): Libro {
    const libroCreado = new Libro(titulo, autor, isbn);
    this.inventario.push(libroCreado);
    this.catalogoBiblioteca.agregarLibro(libroCreado);
    return libroCreado;
  }

  buscarLibro(isbn: string): Libro | null {
    const libroEncontrado = this.inventario.find(
      (libro) => libro.isbn === isbn
    );
    return libroEncontrado ?? null;
  }

  registrarSocio(tipo: TipoSocio, id: number, nombre: string, apellido: string): Socio {
    const socioCreado = SocioFactory.crearSocio(tipo, id, nombre, apellido);
    this.socios.push(socioCreado);
    return socioCreado;
  }

  buscarSocio(id: number): Socio | null {
    return this.socios.find((socio) => socio.id === id) ?? null;
  }

  crearPrestamo(socioId: number, libroISBN: string, tipoPrestamo: TipoPrestamo): Prestamo {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);

    if (!socio || !libro) {
      throw new Error("Socio o libro no encontrado");
    }

    if (this.estaLibroPrestado(libro)) {
      throw new Error("Libro no está disponible");
    }

    if (!this.gestorPoliticas.evaluarPrestamo(socio, libro, this.prestamosActivos)) {
      throw new Error("No se puede realizar el préstamo según la política actual");
    }

    const prestamo = PrestamoFactory.crearPrestamo(tipoPrestamo, libro, socioId);
    
    if (!prestamo.puedeSerLlevado()) {
      console.warn("Este es un préstamo de referencia. El libro debe consultarse en la biblioteca.");
    }

    this.prestamosActivos.push(prestamo);
    this.renovaciones.set(prestamo, 0);
    
    return prestamo;
  }

  retirarLibro(socioId: number, libroISBN: string, tipoPrestamo: TipoPrestamo = TipoPrestamo.REGULAR): void {
    this.crearPrestamo(socioId, libroISBN, tipoPrestamo);
  }

  devolverLibro(socioId: number, libroISBN: string): number {
    const libro = this.buscarLibro(libroISBN);
    if (!libro) {
      throw new Error("Libro no encontrado");
    }

    const prestamoIndex = this.prestamosActivos.findIndex(
      prestamo => prestamo.getSocioId() === socioId && prestamo.getLibro() === libro
    );

    if (prestamoIndex === -1) {
      throw new Error("No se encontró el préstamo");
    }

    const prestamo = this.prestamosActivos[prestamoIndex];
    const multa = prestamo.calcularMulta();

    this.prestamosActivos.splice(prestamoIndex, 1);
    this.renovaciones.delete(prestamo);

    return multa;
  }

  renovarPrestamo(socioId: number, libroISBN: string): boolean {
    const libro = this.buscarLibro(libroISBN);
    if (!libro) {
      throw new Error("Libro no encontrado");
    }

    const prestamo = this.prestamosActivos.find(
      p => p.getSocioId() === socioId && p.getLibro() === libro
    );

    if (!prestamo) {
      throw new Error("No se encontró el préstamo");
    }

    const renovacionesActuales = this.renovaciones.get(prestamo) || 0;
    
    if (this.gestorPoliticas.evaluarRenovacion(prestamo, renovacionesActuales)) {
      this.renovaciones.set(prestamo, renovacionesActuales + 1);
      return true;
    }

    return false;
  }

  cambiarPoliticaPrestamo(nuevaPolitica: IPoliticaPrestamo): void {
    this.gestorPoliticas.setPolitica(nuevaPolitica);
  }

  obtenerPrestamosVencidos(): Prestamo[] {
    return this.prestamosActivos.filter(prestamo => prestamo.estaVencido());
  }

  obtenerPrestamosPorSocio(socioId: number): Prestamo[] {
    return this.prestamosActivos.filter(prestamo => prestamo.getSocioId() === socioId);
  }

  calcularMultaTotal(socioId: number): number {
    return this.obtenerPrestamosPorSocio(socioId)
      .reduce((total, prestamo) => total + prestamo.calcularMulta(), 0);
  }

  estaLibroPrestado(libro: Libro): boolean {
    return this.prestamosActivos.some(prestamo => prestamo.getLibro() === libro);
  }

  buscarEnCatalogo(criterio: string): ResultadoBusqueda[] {
    return this.catalogoBiblioteca.buscarPor(criterio);
  }

  buscarEnTodos(criterio: string): ResultadoBusqueda[] {
    return this.buscadorUniversal.buscarEnTodos(criterio);
  }

  filtrarLibros(condicion: (libro: Libro) => boolean): ResultadoBusqueda[] {
    return this.catalogoBiblioteca.filtrar(condicion);
  }

  agregarRecursoDigital(titulo: string, formato: string, url: string, palabrasClave: string[]): void {
    const recurso = new RecursoDigital(titulo, formato, url, palabrasClave);
    this.bibliotecaDigital.agregarRecurso(recurso);
  }

  agregarDocumentoHistorico(titulo: string, periodo: string, descripcion: string): void {
    const documento = new DocumentoHistorico(titulo, periodo, descripcion);
    this.archivoHistorico.agregarDocumento(documento);
  }

  agregarArticuloAcademico(
    titulo: string, 
    autores: string[], 
    año: number, 
    resumen: string, 
    palabrasClave: string[]
  ): void {
    const articulo = new ArticuloAcademico(titulo, autores, año, resumen, palabrasClave);
    this.baseConocimiento.agregarArticulo(articulo);
  }

  getPrestamosActivos(): Prestamo[] {
    return [...this.prestamosActivos];
  }

  getSocios(): Socio[] {
    return [...this.socios];
  }

  getInventario(): Libro[] {
    return [...this.inventario];
  }
}

export const biblioteca = new Biblioteca();
export type { Biblioteca };
