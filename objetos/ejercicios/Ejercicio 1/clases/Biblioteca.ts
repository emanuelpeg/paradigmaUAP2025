import { Libro } from "./Libro";
import { Socio } from "./Socio";

class Biblioteca {
  private inventario: Libro[] = [];
  private socios: Socio[] = [];
  private DURACION = 14;

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
  registrarSocio(id: number, nombre: string, apellido: string): Socio {
    const socioCreado = new Socio(id, nombre, apellido);
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

    socio.retirar(libro, this.DURACION);
  }

  devolverLibro(socioId: number, libroISBN: string) {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);

    if (!socio || !libro) {
      throw new Error("No se encontro");
    }

    socio.devolver(libro);

    const cola = this.obtenerCola(libro.isbn);
  const siguienteId = cola.shift(); // saca al primero
  if (siguienteId !== undefined) {
    const siguienteSocio = this.buscarSocio(siguienteId);
    if (siguienteSocio) {
      // Notificamos
      siguienteSocio.notificarReserva(libro);
      // (Opcional) Prestar automáticamente
      siguienteSocio.retirar(libro, this.DURACION);
      console.log(`El libro "${libro.titulo}" fue asignado a ${siguienteSocio.nombreCompleto} por reserva.`);
    }
  }
  }

  consultarEstadoLibro(isbn: string): string {
    const libro = this.buscarLibro(isbn);
    if (!libro) {
      return "El libro no existe en el inventario.";
    }

    for (const socio of this.socios) {
      const prestamo = socio.tienePrestadoLibro(libro);
      if (prestamo) {
        return `El libro "${libro.titulo}" está prestado a ${socio.nombreCompleto} hasta el ${prestamo.vencimiento.toLocaleDateString()}`;
      }
    }

    return `El libro "${libro.titulo}" está disponible.`;
  }

  consultarEstadoSocio(id: number): string {
    const socio = this.buscarSocio(id);
    if (!socio) {
      return "El socio no está registrado.";
    }

    const prestamos = socio.getPrestamos();
    if (prestamos.length === 0) {
      return `${socio.nombreCompleto} no tiene préstamos activos.`;
    }

    const listado = prestamos.map(
        (p) =>
          `- "${p.libro.titulo}" (vence: ${p.vencimiento.toLocaleDateString()})`
      ).join("\n");

    return `Préstamos de ${socio.nombreCompleto}:\n${listado}`;
  }
  private reservas: Map<string, number[]> = new Map(); // isbn -> cola de ids de socio

  private obtenerCola(isbn: string): number[] {
    if (!this.reservas.has(isbn)) this.reservas.set(isbn, []);
    return this.reservas.get(isbn)!;
  }
  private estaPrestado(libro: Libro): boolean {
    return this.socios.some(s => s.tienePrestadoLibro(libro));
  }
  public reservarLibro(socioId: number, libroISBN: string): string {
  const socio = this.buscarSocio(socioId);
  const libro = this.buscarLibro(libroISBN);
  if (!socio || !libro) {
    throw new Error("No se encontró el socio o el libro.");
  }

  if (!this.estaPrestado(libro)) {
    return `El libro "${libro.titulo}" está disponible; podés retirarlo sin reservar.`;
  }

  const cola = this.obtenerCola(libro.isbn);
  if (cola.includes(socioId)) {
    return `${socio.nombreCompleto} ya tiene una reserva para "${libro.titulo}".`;
  }

  cola.push(socioId);
  return `${socio.nombreCompleto} reservó "${libro.titulo}". Posición en la cola: ${cola.length}.`;
}


}

export const biblioteca = new Biblioteca();
export type { Biblioteca };