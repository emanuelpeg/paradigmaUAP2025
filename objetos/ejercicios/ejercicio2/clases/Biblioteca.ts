import { Libro } from "./Libro";
import { Socio, SocioFactory, TipoSocio } from "./Socio";
import { IPoliticaPrestamo, PoliticaEstricta } from "../interfaces/IPoliticaPrestamo";
import { IBuscable, CatalogoBiblioteca, BibliotecaDigital, ArchivoHistorico, BaseConocimiento, BuscadorUniversal } from "../interfaces/IBuscable";
interface RecursoOnline {
  url: string;
  titulo: string;
  descripcion?: string;
  autor?: string;
  fechaPublicacion?: number;
}

interface DocumentoAntiguo {
    titulo: string;
  año: number;
  descripcion?: string;
  ubicacionFisica?: string;
}


interface ArticuloAcademico {
 titulo: string;
  autor: string;
  revista: string;
  año: number;
  resumen?: string;
}

class Biblioteca {
  private inventario: Libro[] = [];
  private socios: Socio[] = [];
  private politicaPrestamo: IPoliticaPrestamo = new PoliticaEstricta();
  private catalogo: CatalogoBiblioteca<Libro> = new CatalogoBiblioteca<Libro>();
  private digital: BibliotecaDigital<RecursoOnline> = new BibliotecaDigital<RecursoOnline>();
  private historico: ArchivoHistorico<DocumentoAntiguo> = new ArchivoHistorico<DocumentoAntiguo>();
  private baseConocimiento: BaseConocimiento<ArticuloAcademico> = new BaseConocimiento<ArticuloAcademico>();
  private buscadorUniversal: BuscadorUniversal<any>;

  constructor() {
    this.buscadorUniversal = new BuscadorUniversal(this.catalogo); // por defecto busca en el catálogo físico
  }
  setBuscador(sistema: IBuscable<any>) {
    this.buscadorUniversal.setSistema(sistema);
  }

  buscarUniversalPor(criterio: (item: any) => boolean): any[] {
    return this.buscadorUniversal.buscarPor(criterio);
  }
  filtrarUniversal(condicion: (item: any) => boolean): any[] {
    return this.buscadorUniversal.filtrar(condicion);
  }

  //Funciones de libros
  agregarLibro(titulo: string, autor: string, isbn: string): Libro {
    const libroCreado = new Libro(titulo, autor, isbn);
    this.inventario.push(libroCreado);
    return libroCreado;
  }

  setPoliticaPrestamo(politica: IPoliticaPrestamo) {
    this.politicaPrestamo = politica;
  }

  prestarLibro(socio: Socio, libro: Libro): boolean {
    if (!this.politicaPrestamo.puedePedirPrestamo(socio, libro)) {
      console.log("No se puede prestar el libro según la política actual.");
      return false;
    }
    const duracion = this.politicaPrestamo.getDuracionPrestamo(socio, libro);
    socio.retirar(libro, duracion);
    console.log("Libro prestado correctamente.");
    return true;
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

  //Funciones de socios
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
    //fijarse si esta disponible
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
export type { Biblioteca };
