import { Autor } from "./AutorA";
import { Libro } from "./LibroA";
import { Socio } from "./SocioA";

class Biblioteca {
  private inventario: Libro[] = [];
  private socios: Socio[] = [];
  private reservas: Map<string, Socio[]> = new Map();
  private DURACION = 14;

  agregarLibro(titulo: string, autorNombre: string, isbn: string): Libro {
    const autor = this.crearAutor(autorNombre, "Biografía", 1900);
    const libroCreado = new Libro(titulo, autor, isbn);
    this.inventario.push(libroCreado);
    return libroCreado;
  }

  private crearAutor(nombre: string, biografia: string, añoNacimiento: number): Autor {
    const newAutor = new Autor(nombre, biografia, añoNacimiento);
    return newAutor;
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

  buscarLibrosPorAutor(nombreAutor: string): Libro[] {
    return this.inventario.filter(
      (libro) => libro.autor.nombre.toLowerCase() === nombreAutor.toLowerCase()
    );
  }

  registrarSocio(id: number, nombre: string, apellido: string): Socio {
    const socioCreado = new Socio(id, nombre, apellido);
    this.socios.push(socioCreado);
    return socioCreado;
  }

  buscarSocio(id: number): Socio | null {
    return this.socios.find((socio) => socio.id === id) ?? null;
  }

  consultarDeuda(socioId: number): number {
    const socio = this.buscarSocio(socioId);
    if (!socio) throw new Error("Socio no encontrado");
    return socio.deuda;
  }

  retirarLibro(socioId: number, libroISBN: string): void {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);

    if (!socio || !libro) {
      throw new Error("No se encontro");
    }
    for (const otroSocio of this.socios) {
      if (otroSocio.tienePrestadoLibro(libro)) {
        console.log(
          `El libro "${libro.titulo}" no está disponible. El socio ${socio.nombreCompleto} fue agregado a la lista de reservas.`
        );
        this.reservarLibro(socio, libro);
        return;
      }
    }

    socio.retirar(libro, this.DURACION);
    console.log(`${socio.nombreCompleto} retiró "${libro.titulo}".`);
  }

  devolverLibro(socioId: number, libroISBN: string) {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);

    if (!socio || !libro) {
      throw new Error("No se encontro");
    }

    const prestamo = socio.devolver(libro);

    const cola = this.reservas.get(libro.isbn);
    if (cola && cola.length > 0) {
      const siguienteSocio = cola.shift();
      if (siguienteSocio) {
        siguienteSocio.recibirNotificacion(
          `El libro "${libro.titulo}" que reservaste ya está disponible.`
        );
      }
    }

    console.log(`${socio.nombreCompleto} devolvió "${libro.titulo}".`);
  }

  private reservarLibro(socio: Socio, libro: Libro) {
    if (!this.reservas.has(libro.isbn)) {
      this.reservas.set(libro.isbn, []);
    }
    const cola = this.reservas.get(libro.isbn)!;

    if (!cola.includes(socio)) {
      cola.push(socio);
    }
  }

  recomendarLibros(socioId: number): Libro[] {
    const socio = this.buscarSocio(socioId);
    if (!socio) throw new Error("Socio no encontrado");

    return socio.recomendar(this.inventario);
  }
}

export const biblioteca = new Biblioteca();
export type { Biblioteca };