import { Libro } from "./Libro";
import { Socio, SocioFactory, TipoSocio } from "./Socio";
import { Prestamo, PrestamoRegular, PrestamoCorto, PrestamoReferencia, PrestamoDigital } from "./Prestamo";

type TipoPrestamo = "regular" | "corto" | "referencia" | "digital";

export class Biblioteca {
  private inventario: Libro[] = [];
  private socios: Socio[] = [];

  agregarLibro(titulo: string, autor: string, isbn: string): Libro {
    const libro = new Libro(titulo, autor, isbn);
    this.inventario.push(libro);
    return libro;
  }

  buscarLibro(isbn: string): Libro | null {
    return this.inventario.find((libro) => libro.isbn === isbn) ?? null;
  }

  registrarSocio(
    id: number,
    nombre: string,
    apellido: string,
    tipo: TipoSocio = TipoSocio.REGULAR
  ): Socio {
    const socio = SocioFactory.crearSocio(tipo, id, nombre, apellido);
    this.socios.push(socio);
    return socio;
  }

  buscarSocio(id: number): Socio | null {
    return this.socios.find((socio) => socio.id === id) ?? null;
  }

  retirarLibro(
    socioId: number,
    libroISBN: string,
    tipoPrestamo: TipoPrestamo = "regular"
  ): void {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);

    if (!socio || !libro) throw new Error("Socio o libro no encontrado");
    if (!socio.puedeRetirar(libro)) throw new Error("No puede retirar este libro");

    // Verificar si el libro ya está prestado
    for (const s of this.socios) {
      if (s.tienePrestadoLibro(libro)) {
        throw new Error("Libro no disponible");
      }
    }

    // Crear el tipo de préstamo adecuado
    let prestamo: Prestamo;
    switch (tipoPrestamo) {
      case "corto":
        prestamo = new PrestamoCorto(libro);
        break;
      case "referencia":
        prestamo = new PrestamoReferencia(libro);
        break;
      case "digital":
        prestamo = new PrestamoDigital(libro);
        break;
      default:
        prestamo = new PrestamoRegular(libro);
    }

    socio.retirar(libro, prestamo);
  }

  devolverLibro(socioId: number, libroISBN: string, fechaDevolucion: Date = new Date()): number {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);

    if (!socio || !libro) throw new Error("Socio o libro no encontrado");

    const prestamo = socio.tienePrestadoLibro(libro);
    if (!prestamo) throw new Error("El libro no está prestado por este socio");

    socio.devolver(libro);
    return prestamo.calcularMulta(fechaDevolucion);
  }
}