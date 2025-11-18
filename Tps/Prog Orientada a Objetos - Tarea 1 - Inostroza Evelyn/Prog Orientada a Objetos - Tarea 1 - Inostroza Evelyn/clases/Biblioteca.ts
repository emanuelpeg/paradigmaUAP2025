import { Libro } from "./Libro";
import { Socio } from "./Socio";
import { Autor } from "./Autor";
import {EventoBiblioteca} from './EventoBiblioteca';

class Biblioteca {
  private inventario: Libro[] = [];
  private socios: Socio[] = [];
  private autores: Autor[] = [];
  private eventos: EventoBiblioteca[] = [];
  private historialNotificaciones: string[] = [];
  private DURACION = 14;
  private agregarNotificaciones(mensaje: string) {
    this.historialNotificaciones.push(mensaje);
  }

  // Funciones de libros
  agregarLibro(titulo: string, autor: string, isbn: string): Libro {
    const autorEncontrado = this.buscarAutor(autor);
    if (!autorEncontrado) {
      throw new Error("Autor no encontrado");
    }
    const libroCreado = new Libro(titulo, autorEncontrado, isbn);
    this.inventario.push(libroCreado);
    return libroCreado;
  }

  buscarAutor(nombre: string): Autor | null {
    return this.autores.find((autor) => autor.nombre === nombre) ?? null;
  }
  buscarLibrosPorAutor(nombre: string): Libro[] {
    return this.inventario.filter((libro) => libro.autor.nombre === nombre);
  }
  agregarAutor(nombre: string, biografia: string, fechaNacimiento: Date): Autor {
    const autorCreado = new Autor(nombre, biografia, fechaNacimiento);
    this.autores.push(autorCreado);
    return autorCreado;
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
    const libroPrestado = this.socios.some(s => s.tienePrestadoLibro(libro));
    if (libroPrestado) {
      libro.reservar(socioId);
      this.agregarNotificaciones(`Socio ${socio.nombreCompleto}: Se agregó a la lista de espera para el libro "${libro.titulo}".`);
      throw new Error("Libro no esta disponible, se ha agregado a la lista de espera");
    }
    const multa = this.multarSocio(socioId); 
    if (multa > 0) {
      this.agregarNotificaciones(`Socio ${socio.nombreCompleto}: Tienes una multa pendiente de $${multa}. No puedes retirar nuevos libros hasta que la pagues.`);
      throw new Error("El socio tiene multas pendientes");
      }
      socio.retirar(libro, this.DURACION);
      this.agregarNotificaciones(`Socio ${socio.nombreCompleto}: Has retirado el libro "${libro.titulo}". Debes devolverlo antes del ${new Date(new Date().getTime() + this.DURACION * 24 * 60 * 60 * 1000).toLocaleDateString()}.`);
    } 
  

  multarSocio(socioId: number): number {
    const socio = this.buscarSocio(socioId);
    if (!socio) {
      throw new Error("Usuario no encontrado");
    }else{
      let deuda = 0;
      for (const prestamo of (socio as any).prestamos) {
        const hoy = new Date();
        if (prestamo.vencimiento < hoy) {
          const diasAtraso = Math.ceil(
            (hoy.getTime() - prestamo.vencimiento.getTime()) /
              (1000 * 60 * 60 * 24)
          );
          deuda += diasAtraso * 50; 
        }
      }
      return deuda;
    }
  }

  devolverLibro(socioId: number, libroISBN: string) {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);

    if (!socio || !libro) {
      throw new Error("No se encontro");
    }

    socio.devolver(libro);

    if (libro.hayReservas()) {
      const proximoSocioId = libro.listaReservas[0];
      const proximoSocio = this.buscarSocio(proximoSocioId);
      if (proximoSocio) {
        const mensaje = `Socio ${proximoSocio.nombreCompleto}: El libro "${libro.titulo}" que reservaste está disponible para retirar.`;
        this.agregarNotificaciones(mensaje);
      }
    }
  }

  recomendarLibros(socioId: number): Libro[] {
    const socio = this.buscarSocio(socioId);
    if (!socio) return [];
    const historial = socio.historial;
    if (historial.length === 0) return [];

    // Buscar autores y palabras clave de títulos leídos
    const autoresLeidos = new Set(historial.map(l => l.autor.nombre));
    const palabrasTitulos = new Set(
      historial.flatMap(l => l.titulo.toLowerCase().split(/\s+/))
    );

    // Sugerir libros del inventario que no haya leído, del mismo autor o con palabras similares en el título
    return this.inventario.filter(libro =>
      !historial.includes(libro) &&
      (
        autoresLeidos.has(libro.autor.nombre) ||
        libro.titulo.toLowerCase().split(/\s+/).some(palabra => palabrasTitulos.has(palabra))
      )
    );
  }
  
  crearEvento(tipo: "clubes de lectura" | "talleres de escritura" | "charlas de autores", fecha: Date, socioId: number) {
    const evento = new EventoBiblioteca(tipo, socioId, fecha);
    this.eventos.push(evento);
    const socio = this.buscarSocio(socioId);
    if (socio) {
      this.agregarNotificaciones(`Socio ${socio.nombreCompleto}: Has sido registrado para el evento "${tipo}" el ${fecha.toLocaleDateString()}.`);
    }
    return evento;
  }

  notificacionesGenerales(): string[] {
    const mensajes: string[] = [];
    const hoy = new Date();

    for (const socio of this.socios) {
      for (const prestamo of (socio as any).prestamos) {
        if (prestamo.vencimiento < hoy) {
          mensajes.push(
            `Socio ${socio.nombreCompleto}: El libro "${prestamo.libro.titulo}" está vencido desde el ${prestamo.vencimiento.toLocaleDateString()}.`
          );
        }
      }
    }

    for (const libro of this.inventario) {
      if (!this.socios.some(s => s.tienePrestadoLibro(libro)) && libro.hayReservas()) {
        const proximoSocioId = libro.listaReservas[0];
        const socio = this.buscarSocio(proximoSocioId);
        if (socio) {
          mensajes.push(
            `Socio ${socio.nombreCompleto}: El libro "${libro.titulo}" que reservaste está disponible para retirar.`
          );
        }
      }
    }

    if ((this as any).eventos) {
      for (const evento of (this as any).eventos as EventoBiblioteca[]) {
        if (evento.fecha > hoy && (evento.fecha.getTime() - hoy.getTime())/(1000*60*60*24) <= 7) { // próximos 7 días
          const socio = this.buscarSocio(evento.socioId);
          if (socio) {
            mensajes.push(
              `Socio ${socio.nombreCompleto}: Tienes un evento "${evento.tipo}" el ${evento.fecha.toLocaleDateString()}.`
            );
          }
        }
      }
    }
    return mensajes;
  }

  revisarNotificacionesAutomaticas() {
    const hoy = new Date();
    for (const socio of this.socios) {
      for (const prestamo of (socio as any).prestamos) {
        if (prestamo.vencimiento < hoy) {
          const mensaje = `Socio ${socio.nombreCompleto}: El libro "${prestamo.libro.titulo}" está vencido desde el ${prestamo.vencimiento.toLocaleDateString()}.`;
          if (!this.historialNotificaciones.includes(mensaje)) {
            this.agregarNotificaciones(mensaje);
          }
        }
      }
    }
    for (const evento of this.eventos) {
      if (evento.fecha > hoy && (evento.fecha.getTime() - hoy.getTime())/(1000*60*60*24) <= 7) { 
        const socio = this.buscarSocio(evento.socioId);
        if (socio) {
          const mensaje = `Socio ${socio.nombreCompleto}: Tienes un evento "${evento.tipo}" el ${evento.fecha.toLocaleDateString()}.`;
          if (!this.historialNotificaciones.includes(mensaje)) {
            this.agregarNotificaciones(mensaje);
          }
        }
      }
    }
  }

  get notificaciones(): readonly string[] {
    this.revisarNotificacionesAutomaticas();
    return this.historialNotificaciones;
  }
}

export const biblioteca = new Biblioteca();
export type { Biblioteca };
