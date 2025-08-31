import { Libro3D } from "./Libro.js";
import { Socio, SocioFactory, TipoSocio } from "./Socio.js";

export class Biblioteca {
  private eventos: any[] = [];
  private notificaciones: string[] = [];
  private inventario: Libro3D[] = [];
  private socios: Socio[] = [];

  // Funciones de libros
  agregarLibro(titulo: string, autor: any, isbn: string): Libro3D {
    const libroCreado = new Libro3D(titulo, autor, isbn);
    this.inventario.push(libroCreado);
    return libroCreado;
  }
  buscarLibrosPorAutor(nombreAutor: string): Libro3D[] {
    return this.inventario.filter(
      (libro) => libro.autor.nombre === nombreAutor || libro.autor === nombreAutor
    );
  }
  reservarLibro(socioId: number, libroISBN: string): void {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);
    if (!socio || !libro) throw new Error("Socio o libro no encontrado");
    libro.agregarReserva(socio);
    socio.agregarReserva(libro);
    this.notificaciones.push(
      `Reserva agregada para el socio ${socio.nombreCompleto} y libro ${libro.titulo}`
    );
  }

  buscarLibro(isbn: string): Libro3D | null {
    const libroEncontrado = this.inventario.find((libro) => libro.isbn === isbn);
    if (libroEncontrado) {
      return libroEncontrado;
    }
    return null;
  }

  // Funciones de socios
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
    return this.socios.find((socio) => socio.id === id) ?? null;
  }

  retirarLibro(socioId: number, libroISBN: string): void {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);
    if (!socio || !libro) throw new Error("No se encontro");
    if (socio.deuda > 0)
      throw new Error("El socio tiene multas pendientes y no puede retirar libros");
    for (const socioAux of this.socios) {
      if (socioAux.tienePrestadoLibro(libro))
        throw new Error("Libro no esta disponible");
    }
    socio.retirar(libro);
  }

  devolverLibro(socioId: number, libroISBN: string) {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);
    if (!socio || !libro) throw new Error("No se encontro");
    const prestamo = socio.tienePrestadoLibro(libro);
    if (prestamo) {
      const hoy = new Date();
      if (hoy > prestamo.vencimiento) {
        const msPorDia = 1000 * 60 * 60 * 24;
        const diasAtraso = Math.ceil(
          (hoy.getTime() - prestamo.vencimiento.getTime()) / msPorDia
        );
        const multa = diasAtraso * 50;
        socio.registrarMulta(multa);
        this.notificaciones.push(
          `Socio ${socio.nombreCompleto} tiene multa de $${multa} por retraso en '${libro.titulo}'`
        );
      }
    }
    socio.devolver(libro);
    if (libro.tieneReservas()) {
      const siguienteSocio = libro.obtenerProximaReserva();
      if (siguienteSocio) {
        siguienteSocio.retirar(libro);
        this.notificaciones.push(
          `El libro '${libro.titulo}' está disponible para ${siguienteSocio.nombreCompleto} por reserva.`
        );
      }
    }
  }
  agregarEvento(evento: any): void {
    this.eventos.push(evento);
    this.notificaciones.push(`Nuevo evento: ${evento.titulo} el ${evento.fecha}`);
  }

  obtenerNotificaciones(): string[] {
    return [...this.notificaciones];
  }

  obtenerHistorialSocio(socioId: number): any[] {
    const socio = this.buscarSocio(socioId);
    return socio ? socio.obtenerHistorialLectura() : [];
  }

  obtenerRecomendacionesSocio(socioId: number): string[] {
    const socio = this.buscarSocio(socioId);
    return socio ? socio.recomendacionesSimples() : [];
  }
}

