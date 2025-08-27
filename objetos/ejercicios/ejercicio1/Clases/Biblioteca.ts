import { Libro } from "./Libro";
import { Socio } from "./Socio";
import { Autor } from "./Autor";
import { EventoBiblioteca } from "./EventoBiblioteca";

export class Biblioteca {
  private inventario: Libro[] = [];
  private socios: Socio[] = [];
  private autores: Autor[] = [];
  private reservas: Map<string, Socio[]> = new Map(); // ISBN -> cola
  public readonly duracionPrestamoDias = 7;

  // Libros / Autores
  agregarLibro(titulo: string, autorNombre: string, isbn: string): Libro {
    const autor = this.ensureAutor(autorNombre);
    const libro = new Libro(titulo, autor, isbn);
    this.inventario.push(libro);
    return libro;
  }
  private ensureAutor(nombre: string): Autor {
    const ex = this.autores.find(a => a.nombre.toLowerCase() === nombre.toLowerCase());
    if (ex) return ex;
    const nuevo = new Autor(nombre);
    this.autores.push(nuevo);
    return nuevo;
  }
  buscarLibro(isbn: string)   { return this.inventario.find(l => l.isbn === isbn); }
  buscarSocio(id: number)     { return this.socios.find(s => s.id === id); }
  registrarSocio(id: number, nombre: string, apellido: string): Socio {
    return this.buscarSocio(id) ?? (this.socios.push(new Socio(id, nombre, apellido)), this.buscarSocio(id)!);
  }
  buscarLibrosPorAutorNombre(nombre: string): Libro[] {
    return this.inventario.filter(l => l.autor.nombre.toLowerCase() === nombre.toLowerCase());
  }

  // Préstamos / Devoluciones
  prestarLibro(socioId: number, isbn: string, fecha = new Date()): { reservado: boolean; vencimiento?: Date } {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(isbn);
    if (!socio || !libro) throw new Error("Socio o libro no encontrado.");

    if (socio.deudaPendiente > 0) throw new Error("Debes saldar tu deuda antes de retirar.");

    const prestado = this.socios.some(s => s.prestamos.some(p => p.libro.isbn === isbn));
    if (prestado) {
      this.reservarLibro(socio, isbn);
      return { reservado: true };
    }

    const venc = new Date(fecha); venc.setDate(venc.getDate() + this.duracionPrestamoDias);
    socio.agregarPrestamo(libro, venc);
    EventoBiblioteca.notificarPrestamo(socio.nombreCompleto, libro.titulo, venc);
    return { reservado: false, vencimiento: venc };
  }

  devolverLibro(socioId: number, isbn: string, fecha = new Date()) {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(isbn);
    if (!socio || !libro) throw new Error("Socio o libro no encontrado.");

    const multa = socio.registrarDevolucion(isbn, fecha);
    EventoBiblioteca.notificarDevolucion(socio.nombreCompleto, libro.titulo, multa);

    const cola = this.reservas.get(isbn) ?? [];
    if (cola.length > 0) {
      const siguiente = cola.shift()!;
      this.reservas.set(isbn, cola);
      const venc = new Date(fecha); venc.setDate(venc.getDate() + this.duracionPrestamoDias);
      siguiente.agregarPrestamo(libro, venc);
      EventoBiblioteca.notificarReserva(siguiente.nombreCompleto, libro.titulo);
      EventoBiblioteca.notificarPrestamo(siguiente.nombreCompleto, libro.titulo, venc);
    }
  }

  private reservarLibro(socio: Socio, isbn: string) {
    const cola = this.reservas.get(isbn) ?? [];
    if (!cola.some(s => s.id === socio.id)) {
      cola.push(socio);
      this.reservas.set(isbn, cola);
    }
  }

  recomendarLibros(socioId: number): Libro[] {
    const socio = this.buscarSocio(socioId);
    if (!socio) return [];
    const autoresLeidos = new Set(socio.historialLectura.map(l => l.autor.nombre.toLowerCase()));
    const yaLeidos = new Set(socio.historialLectura.map(l => l.isbn));
    const prestados = new Set(this.socios.flatMap(s => s.prestamos.map(p => p.libro.isbn)));

    const candidatos = this.inventario.filter(l =>
      autoresLeidos.has(l.autor.nombre.toLowerCase()) && !yaLeidos.has(l.isbn) && !prestados.has(l.isbn)
    );
    return candidatos.length ? candidatos : this.inventario.filter(l => !yaLeidos.has(l.isbn) && !prestados.has(l.isbn));
  }
}

export const biblioteca = new Biblioteca();
export default biblioteca;
