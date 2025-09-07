import { Libro } from "./Libro";
import { Socio, SocioFactory, TipoSocio } from "./Socio";
import { PoliticaPrestamo } from "./PoliticaPrestamo";

class Biblioteca {
  private _inventario: Libro[] = [];
  private socios: Socio[] = [];
  private tipoPolitica: PoliticaPrestamo;

  // Funciones de libros
  agregarLibro(titulo: string, autor: string, isbn: string): Libro {
    const libroCreado = new Libro(titulo, autor, isbn);
    this.inventario.push(libroCreado);
    return libroCreado;
  }
  get inventario(){
    return this._inventario;
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
    if (this.tipoPolitica.puedeRetirar(socio, this.inventario)) {
    socio.retirar(libro);
  }
  }

  devolverLibro(socioId: number, libroISBN: string) {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);

    if (!socio || !libro) {
      throw new Error("No se encontro");
    }

    socio.devolver(libro);
  }

  cambiarPoliticaPrestamo(politica:PoliticaPrestamo){
    this.tipoPolitica=politica;
  }
}

export const biblioteca = new Biblioteca();
export type { Biblioteca };
