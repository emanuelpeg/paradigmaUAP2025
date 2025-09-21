import { Libro } from "./Libro";
import { Socio } from "./Socio";
import { Autor } from "./Autor";
import { EventoBiblioteca } from "./EventoBiblioteca";

class Biblioteca {
  private inventario: Libro[] = [];
  private socios: Socio[] = [];
  private DURACION = 14;
  private eventos: EventoBiblioteca[] = [];
  private notificaciones: string[] = [];

  agregarLibro(titulo: string, autor: string | Autor, isbn: string): Libro {
    const autorObj = typeof autor === "string" ? new Autor(autor) : autor;
    const libroCreado = new Libro(titulo, autorObj, isbn);
    this.inventario.push(libroCreado);
    return libroCreado;
  }

  buscarLibro(isbn: string): Libro | null {
    const libroEncontrado = this.inventario.find((libro) => libro.isbn === isbn);
    return libroEncontrado ?? null;
  }

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

    for (const s of this.socios) {
      if (s.tienePrestadoLibro(libro)) {
        libro.reservar(socioId);
        return;
      }
    }

    if (socio.deuda > 0) throw new Error("Socio tiene multas pendientes");

    socio.retirar(libro, this.DURACION);
  }

  forzarPrestamo(socioId: number, libroISBN: string, vencimiento: Date) {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);
    if (!socio || !libro) throw new Error("No se encontro");
    socio.retirarConVencimiento(libro, vencimiento);
  }

  devolverLibro(socioId: number, libroISBN: string) {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);

    if (!socio || !libro) {
      throw new Error("No se encontro");
    }
    const prestamo = socio.devolver(libro);
    const hoy = new Date();
    if (prestamo && hoy > prestamo.vencimiento) {
      const diasAtraso = Math.ceil((hoy.getTime() - prestamo.vencimiento.getTime()) / (1000 * 60 * 60 * 24));
      const multa = diasAtraso * 50;
      const msg = `${socio.nombreCompleto} devolvió "${libro.titulo}" con ${diasAtraso} días de atraso — multa: $${multa}.`;
      this.notificaciones.push(msg);
    }
    const siguiente = libro.popReservante();
    if (siguiente) {
      const socioNot = this.buscarSocio(siguiente);
      if (socioNot) {
        const msg = `¡Buenas! ${socioNot.nombreCompleto}, "${libro.titulo}" ya está disponible para vos.`;
        this.notificaciones.push(msg);
      }
    }
  }

  registrarEvento(evento: EventoBiblioteca) {
    this.eventos.push(evento);
  }

  listarEventos() {
    return this.eventos.map((e) => ({ titulo: e.titulo, fecha: e.fecha }));
  }

  recomendarPara(socioId: number) {
    const socio = this.buscarSocio(socioId);
    if (!socio) return [];
    return socio.recomendar(this.inventario);
  }

  librosDeAutor(autor: string | Autor) {
    const nombre = typeof autor === "string" ? autor : autor.nombre;
    return this.inventario.filter((l) => l.autor.nombre === nombre);
  }

  obtenerNotificaciones() {
    return this.notificaciones.slice();
  }
}

export const biblioteca = new Biblioteca();
export type { Biblioteca };
