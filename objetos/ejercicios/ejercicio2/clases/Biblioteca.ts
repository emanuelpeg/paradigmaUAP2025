import { Libro } from "./Libro";
import { Socio, SocioFactory, TipoSocio } from "./Socio";

// Polimorfismo: Tipos de Préstamo
abstract class Prestamo {
  constructor(public libro: Libro, public socio: Socio) {}
  abstract calcularVencimiento(): Date | null;
  abstract calcularMulta(diasAtraso: number): number;
}

class PrestamoRegular extends Prestamo {
  calcularVencimiento(): Date {
    const vencimiento = new Date();
    vencimiento.setDate(vencimiento.getDate() + 14);
    return vencimiento;
  }
  calcularMulta(diasAtraso: number): number {
    return diasAtraso * 50;
  }
}

class PrestamoCorto extends Prestamo {
  calcularVencimiento(): Date {
    const vencimiento = new Date();
    vencimiento.setDate(vencimiento.getDate() + 7);
    return vencimiento;
  }
  calcularMulta(diasAtraso: number): number {
    return diasAtraso * 100;
  }
}

class PrestamoReferencia extends Prestamo {
  calcularVencimiento(): null {
    return null; // Solo consulta en sala
  }
  calcularMulta(): number {
    return 0;
  }
}

class PrestamoDigital extends Prestamo {
  calcularVencimiento(): null {
    return null; // Sin límite
  }
  calcularMulta(): number {
    return 0;
  }
}

// Patrón Strategy: Políticas de Préstamo
interface PoliticaPrestamo {
  puedePrestar(socio: Socio): boolean;
  periodoPrestamo(socio: Socio): number;
}

export class PoliticaEstricta implements PoliticaPrestamo {
  puedePrestar(socio: Socio): boolean {
    // Usar método público para obtener préstamos
    return socio.getPrestamos().every(p => {
      const venc = p instanceof PrestamoReferencia || p instanceof PrestamoDigital ? null : p.vencimiento;
      return !venc || venc >= new Date();
    });
  }
  periodoPrestamo(socio: Socio): number {
    return socio.getDuracionPrestamo();
  }
}

export class PoliticaFlexible implements PoliticaPrestamo {
  puedePrestar(socio: Socio): boolean {
    return true;
  }
  periodoPrestamo(socio: Socio): number {
    const vencidos = socio.getPrestamos().filter(p => {
      const venc = p instanceof PrestamoReferencia || p instanceof PrestamoDigital ? null : p.vencimiento;
      return venc && venc < new Date();
    });
    return vencidos.length > 0 ? 7 : socio.getDuracionPrestamo();
  }
}

export class PoliticaEstudiante implements PoliticaPrestamo {
  puedePrestar(socio: Socio): boolean {
    return true;
  }
  periodoPrestamo(socio: Socio): number {
    return socio.getDuracionPrestamo() + 7;
  }
}

export class PoliticaDocente implements PoliticaPrestamo {
  puedePrestar(socio: Socio): boolean {
    return true;
  }
  periodoPrestamo(socio: Socio): number {
    return 60;
  }
}

// Biblioteca: permitir cambiar política
export class Biblioteca {
  private eventos: any[] = [];
  private notificaciones: string[] = [];
  private inventario: Libro[] = [];
  private socios: Socio[] = [];
  private politicaPrestamo: PoliticaPrestamo = new PoliticaEstricta();

  // Funciones de libros
  agregarLibro(titulo: string, autor: any, isbn: string): Libro {
    const libroCreado = new Libro(titulo, autor, isbn);
    this.inventario.push(libroCreado);
    return libroCreado;
  }
  buscarLibrosPorAutor(nombreAutor: string): Libro[] {
    return this.inventario.filter(libro => libro.autor.nombre === nombreAutor || libro.autor === nombreAutor);
  }
  reservarLibro(socioId: number, libroISBN: string): void {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);
    if (!socio || !libro) throw new Error("Socio o libro no encontrado");
    libro.agregarReserva(socio);
    socio.agregarReserva(libro);
    this.notificaciones.push(`Reserva agregada para el socio ${socio.nombreCompleto} y libro ${libro.titulo}`);
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
    if (!socio || !libro) throw new Error("No se encontro");
    if (socio.deuda > 0) throw new Error("El socio tiene multas pendientes y no puede retirar libros");
    for (const socioAux of this.socios) {
      if (socioAux.tienePrestadoLibro(libro)) throw new Error("Libro no esta disponible");
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
      if (prestamo.vencimiento && hoy > prestamo.vencimiento) {
        const msPorDia = 1000 * 60 * 60 * 24;
        const diasAtraso = Math.ceil((hoy.getTime() - prestamo.vencimiento.getTime()) / msPorDia);
        const multa = diasAtraso * 50;
        socio.registrarMulta(multa);
        this.notificaciones.push(`Socio ${socio.nombreCompleto} tiene multa de $${multa} por retraso en '${libro.titulo}'`);
      }
    }
    socio.devolver(libro);
    if (libro.tieneReservas()) {
      const siguienteSocio = libro.obtenerProximaReserva();
      if (siguienteSocio) {
        siguienteSocio.retirar(libro);
        this.notificaciones.push(`El libro '${libro.titulo}' está disponible para ${siguienteSocio.nombreCompleto} por reserva.`);
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

  setPoliticaPrestamo(politica: PoliticaPrestamo) {
    this.politicaPrestamo = politica;
  }

  prestarLibro(socioId: number, libroISBN: string, tipoPrestamo: string): void {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);
    if (!socio || !libro) throw new Error("Socio o libro no encontrado");
    if (!this.politicaPrestamo.puedePrestar(socio)) throw new Error("No puede prestar por política actual");
    // Usar método público para registrar préstamo
    switch (tipoPrestamo) {
      case "regular": socio.retirar(libro, "regular"); break;
      case "corto": socio.retirar(libro, "corto"); break;
      case "referencia": socio.retirar(libro, "referencia"); break;
      case "digital": socio.retirar(libro, "digital"); break;
      default: throw new Error("Tipo de préstamo no válido");
    }
    this.notificaciones.push(`Préstamo registrado: ${libro.titulo} para ${socio.nombreCompleto} (${tipoPrestamo})`);
  }
}

// Interfaces y Polimorfismo - Sistemas de Búsqueda
export interface IBuscable {
  buscarPor(criterio: any): any[];
  filtrar(condicion: (item: any) => boolean): any[];
}

export class CatalogoBiblioteca implements IBuscable {
  constructor(private libros: Libro[] = []) {}
  buscarPor(criterio: any): Libro[] {
    return this.libros.filter(l => l.titulo.includes(criterio) || l.autor.nombre === criterio);
  }
  filtrar(condicion: (item: Libro) => boolean): Libro[] {
    return this.libros.filter(condicion);
  }
}

export class BibliotecaDigital implements IBuscable {
  constructor(private recursos: any[] = []) {}
  buscarPor(criterio: any): any[] {
    return this.recursos.filter(r => r.titulo.includes(criterio));
  }
  filtrar(condicion: (item: any) => boolean): any[] {
    return this.recursos.filter(condicion);
  }
}

export class ArchivoHistorico implements IBuscable {
  constructor(private documentos: any[] = []) {}
  buscarPor(criterio: any): any[] {
    return this.documentos.filter(d => d.titulo.includes(criterio));
  }
  filtrar(condicion: (item: any) => boolean): any[] {
    return this.documentos.filter(condicion);
  }
}



