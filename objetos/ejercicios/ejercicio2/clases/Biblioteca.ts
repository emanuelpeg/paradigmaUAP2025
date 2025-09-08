import { Libro } from "./Libro";
import { Socio, SocioFactory, TipoSocio } from "./Socio";
import { Multa } from "./Multa";
import { Prestamo } from "./Prestamo"

import { IBuscable } from "./BusquedaYMas.ts";
import { BuscadorUniversal } from "./BusquedaYMas.ts";
import { CatalogoBiblioteca } from "./BusquedaYMas.ts";
import { BibliotecaDigital } from "./BusquedaYMas.ts";
import { ArchivoHistorico } from "./BusquedaYMas.ts";
import { BaseConocimiento } from "./BusquedaYMas.ts";

import { IPoliticaPrestamo } from "./Politica";
import { PoliticaEstricta } from "./Politica";
import { PoliticaFlexible } from "./Politica";
import { PoliticaEstudiante } from "./Politica";
import { PoliticaDocente } from "./Politica";


class RecursoDigital extends Libro {
  constructor(titulo: string, autor: string, isbn: string, public url: string) {
    super(titulo, autor, isbn);
  }
}

class DocumentoHistorico extends Libro {
  constructor(titulo: string, autor: string, isbn: string, public fecha: Date) {
    super(titulo, autor, isbn);
  }
}

class Articulo extends Libro {
  constructor(titulo: string, autor: string, isbn: string, public revista: string) {
    super(titulo, autor, isbn);
  }
}


// Biblioteca

 class Biblioteca {
  private inventario: Libro[] = [];

  private recursosDigitales: Libro[] = [];
  private documentosHistoricos: Libro[] = [];
  private articulosAcademicos: Libro[] = [];

  private socios: Socio[] = [];
  private multas: Multa[] = []; // Lista de multas

  private politicaActual: IPoliticaPrestamo = new PoliticaEstricta(); // default

  cambiarPolitica(nuevaPolitica: IPoliticaPrestamo) {
    this.politicaActual = nuevaPolitica;
  }
  // Funciones de libros
  agregarLibro(titulo: string, autor: string, isbn: string): Libro {
    // Si el libro ya existe por ISBN, retorna la instancia existente
    let libroCreado = this.inventario.find(l => l.isbn === isbn);
    if (!libroCreado) {
      libroCreado = new Libro(titulo, autor, isbn);
      this.inventario.push(libroCreado);
    }
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
  registrarSocio(tipo: TipoSocio, id: number, nombre: string, apellido: string): Socio {
    const socioCreado = SocioFactory.crearSocio(tipo, id, nombre, apellido);
    this.socios.push(socioCreado);
    return socioCreado;
  }

  buscarSocio(id: number): Socio | null {
    return this.socios.find((socio) => socio.id === id) ?? null;
  }
  
  
  // Funciones de socios
  retirarLibro(socioId: number, libroISBN: string): void {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);
    if (!socio || !libro) throw new Error("No se encontró socio o libro");

    if (!this.politicaActual.puedeRetirar(socio, libro, this)) {
      throw new Error("No puede retirar libros según la política vigente");
    }

    const duracion = this.politicaActual.calcularDuracion(socio, libro);
    socio.retirar(libro, duracion);
  }

  // Devolver libro
  devolverLibro(socioId: number, libroISBN: string): void {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);

    if (!socio || !libro) {
      throw new Error("No se encontró socio o libro");
    }

    const prestamo = socio.tienePrestadoLibro(libro);
    if (!prestamo) {
      throw new Error("No hay préstamo registrado para este libro y socio");
    }

    const fechaDevolucion = new Date();
    socio.devolver(libro);

    // Verificar si el libro se devolvió tarde
    if (fechaDevolucion > prestamo.Vencimiento) {
      const multa = new Multa(prestamo, fechaDevolucion);
      this.multas.push(multa);
      console.log(multa.mensajeMulta());
    } else {
      console.log(`El socio "${socio.nombreCompleto}" devolvió "${libro.titulo}" a tiempo.`);
    }
  }
  // Mostrar multas pendientes de un socio
  getMultasPendientes(socioId: number): Multa[] {
    return this.multas.filter((m) => m.prestamo.Socio.id === socioId && m.estaActiva());
  }

  // Pagar multas de un socio
  pagarMulta(socioId: number): void {
    const multasSocio = this.getMultasPendientes(socioId);
    if (multasSocio.length === 0) {
      console.log("No hay multas pendientes para este socio");
      return;
    }

    multasSocio.forEach((m) => {
      // Se marca como pagada poniendo valor a 0
      (m as any)._valor = 0; // Hack mínimo para proyecto sencillo
    });

    console.log(`Se han pagado todas las multas del socio con ID ${socioId}`);
  }

 //MOTOR DE BUSQUEDA Y NUEVOS MATERIALES
  agregarRecursoDigital(titulo: string, autor: string, isbn: string, url: string): Libro {
    const recurso = new RecursoDigital(titulo, autor, isbn, url);
    this.recursosDigitales.push(recurso);
  return recurso;
  }

  agregarDocumentoHistorico(titulo: string, autor: string, isbn: string, fecha: Date): Libro {
    const doc = new DocumentoHistorico(titulo, autor, isbn, fecha);
    this.documentosHistoricos.push(doc);
    return doc;
  }

agregarArticuloAcademico(titulo: string, autor: string, isbn: string, revista: string): Libro {
  const art = new Articulo(titulo, autor, isbn, revista);
  this.articulosAcademicos.push(art);
  return art;
}
 buscar(criterio: string, sistemas: IBuscable[]): Libro[] {
  let resultados: Libro[] = [];
  sistemas.forEach(s => {
    resultados.push(...s.buscarPor(criterio));
  });
  return resultados;
}

arEnTodaBiblioteca(criterio: string): Libro[] {
  const buscadores: IBuscable[] = [
    new CatalogoBiblioteca(this.inventario),
    new BibliotecaDigital(this.recursosDigitales),
    new ArchivoHistorico(this.documentosHistoricos),
    new BaseConocimiento(this.articulosAcademicos)
  ];

  const buscador = new BuscadorUniversal();
  return buscador.buscar(criterio, buscadores);
}

}
 
export const biblioteca = new Biblioteca();
export type { Biblioteca };
