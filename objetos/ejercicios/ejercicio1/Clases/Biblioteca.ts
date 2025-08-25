import { Libro } from './Libro';
import { Socio } from './Socio';

class Biblioteca {
    private inventario: Libro[];
    private socios: Socio[];
    private duracion: number = 7;

    constructor() {
        this.inventario = [];
        this.socios = [];
    }
        //Funciones de Libro
    agregarLibro(titulo: string, _autor: string, isbn: string){
        const libro = new Libro(titulo, _autor, isbn);
        this.inventario.push(libro);
        return libro;
    }

    buscarLibro(isbn: string): Libro | null {
        //return this.inventario.find(libro => libro.titulo === titulo);
        const libroEncontrado = this.inventario.find((libro) => libro.isbn === isbn);
        if (!libroEncontrado) {
            return null;
        }
        return libroEncontrado;
    }

        //Funciones de Socio
    registrarSocio(id: number, nombre: string, apellido: string): Socio{
        const socio = new Socio(id, nombre, apellido);
        this.socios.push(socio);
        return socio;
    }

    buscarSocio(id: number): Socio | null{
        return this.socios.find((socio) => socio.id == id) ?? null;
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

    socio.retirar(libro, this.duracion);
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