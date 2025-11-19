import { Libro } from "./Libro";
import { Socio, SocioFactory, TipoSocio } from "./socio";
import { IPoliticaTransaccion, PoliticaRigida } from "./politicaPrestamo";
import { IConsultable, CatalogoGeneral, BuscadorTotal } from "./buscador";

class Biblioteca {
  private inventario: Libro[] = [];
  private socios: Socio[] = [];
  private politicaActual: IPoliticaTransaccion = new PoliticaRigida();
  private fuentesDeBusqueda: IConsultable[] = [];

  constructor() {
    this.fuentesDeBusqueda.push(new CatalogoGeneral(this.inventario));
  }

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
    return this.socios.find((socio) => socio.codigo === id) ?? null;
  }

  retirarLibro(socioId: number, libroISBN: string): void {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);

    if (!socio || !libro) {
      throw new Error("No se encontro");
    }

    if (!this.politicaActual.esTransaccionPermitida(socio, libro)) {
      throw new Error("El prestamo no es permitido segun la politica actual.");
    }

    for (const s of this.socios) {
      if (s.tieneLibroPrestado(libro)) {
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

  setPoliticaPrestamo(politica: IPoliticaTransaccion): void {
    this.politicaActual = politica;
  }

  buscarEnBiblioteca(criterio: string): Libro[] {
    const buscador = new BuscadorTotal(this.fuentesDeBusqueda);
    return buscador.buscarEnTodasLasFuentes(criterio);
  }
}

export const biblioteca = new Biblioteca();
export type { Biblioteca };