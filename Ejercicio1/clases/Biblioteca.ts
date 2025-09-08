  
import { Libro } from "./Libro";
import { Socio, SocioRegular, SocioVip, Empleado, Invitado } from "./Socio";
import { Autor } from "./Autor";
import { PoliticaPrestamo, PoliticaEstricta, ContextoPrestamo } from "./PoliticasPrestamo";
import { BuscadorUniversal, CatalogoBiblioteca, BibliotecaDigital, ArchivoHistorico, BaseConocimiento } from "./Busquedas";

class Biblioteca {
  
  private inventario: Libro[] = [];
  private socios: Socio[] = [];
  private DURACION = 14;
  private Multa = 50;
  private politica: PoliticaPrestamo = new PoliticaEstricta();
  private epocaExamenes = false;


  agregarLibro(titulo: string, autor: Autor, isbn: string): Libro {
    const libroCreado = new Libro(titulo, autor, isbn);
    
    this.inventario.push(libroCreado);
    return libroCreado;
  }

  buscarLibro(isbn: string): Libro | null {
    return this.inventario.find(libro => libro.isbn === isbn) ?? null;
  }

  // Funciones de socios
  registrarSocio(
    id: number,
    nombre: string,
    apellido: string,
    tipo: "regular" | "vip" | "empleado" | "invitado" = "regular"
  ): Socio {
    let socioCreado: Socio;
    switch (tipo) {
      case "vip":
        socioCreado = new SocioVip(id, nombre, apellido);
        break;
      case "empleado":
        socioCreado = new Empleado(id, nombre, apellido);
        break;
      case "invitado":
        socioCreado = new Invitado(id, nombre, apellido);
        break;
      case "regular":
      default:
        socioCreado = new SocioRegular(id, nombre, apellido);
    }
    this.socios.push(socioCreado);
    return socioCreado;
  }

  buscarSocio(id: number): Socio | null {
    return this.socios.find((socio) => socio.id === id) ?? null;
  }

  obtenerDuracion(): number {
    return this.DURACION;
  }

  obtenerMulta(): number {
    return this.Multa;
  }

  // Strategy: cambiar política dinámicamente
  setPolitica(politica: PoliticaPrestamo) {
    this.politica = politica;
  }

  setEpocaExamenes(on: boolean) {
    this.epocaExamenes = on;
  }

  retirarLibro(socioId: number, libroISBN: string): void {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);
    
    if (!socio || !libro) {
      throw new Error("Socio o libro no encontrado");
    }
    
    if (!socio.puedeRetirar()){
      throw new Error("El socio no tiene permiso para retirar, solo para mirar el catalogo");
    }

    const cantidadPrestados = socio.cantidadDeLibrosPrestados(this.inventario);
    const maximoPermitido = socio.cantidadDeLibrosAPrestar();
    if (maximoPermitido !== null && cantidadPrestados >= maximoPermitido) {
      throw new Error("El socio ha alcanzado el límite de libros prestados");
    }

    if (socio.verificarMultas()) {
      throw new Error("El socio tiene multas pendientes");
    }
    
    if (libro.tienePrestadoLibro(socio)) {
      throw new Error("El socio ya tiene este libro prestado");
    }
    
    if (libro.libroPrestado()) {
      libro.agregarAColaDeEspera(socio);
      socio.agregarNotificacion(`El libro '${libro.titulo}' no está disponible. Te agregamos a la lista de espera.`);
      throw new Error("El libro no está disponible, lo agregaremos a la lista de espera");
    }

    const tipo = socio.tipoDePrestamoPara(libro);
    const ctx: ContextoPrestamo = {
      duracionBase: this.DURACION,
      multaBase: this.Multa,
      epocaExamenes: this.epocaExamenes,
      socioTieneVencidos: (s) => this.inventario.some(l => l.tienePrestadoLibro(s) && !!l.prestamoVencido()),
    };
    const base = { tipo, diasRegular: this.DURACION };
    const perm = this.politica.puedePrestar(socio, libro, ctx);
    if (!perm.permitido) {
      throw new Error(perm.motivo ?? "Préstamo no permitido por política actual");
    }
    const ajuste = this.politica.ajustarPrestamo(socio, libro, ctx, base);
    libro.nuevoPrestamo(ajuste.tipo, socio, this.Multa, { diasRegular: ajuste.diasRegular });
    socio.agregarNotificacion(`Has retirado el libro '${libro.titulo}'.`);
  }

  devolverLibro(socioId: number, libroISBN: string) {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);

    if (!socio || !libro) {
      throw new Error("Socio o libro no encontrado");
    }
    
    const diasPasados = libro.prestamoVencido();
    if (diasPasados && diasPasados > 0) {
      const multaTotal = libro.calcularMulta(diasPasados);
      // VIP sin multas según consigna
      if (socio.aplicaMulta() && multaTotal > 0) {
        socio.agregarMulta(multaTotal);
        socio.agregarNotificacion(`Tienes una multa de $${multaTotal} por el libro '${libro.titulo}'.`);
        console.log(`El socio ${socio.nombreCompleto} tiene una multa de $${multaTotal}`);
      }
    }

  libro.devolver(socio, { tipo: socio.tipoDePrestamoPara(libro), multaBase: this.Multa, opciones: { diasRegular: this.DURACION } });
    socio.agregarNotificacion(`Has devuelto el libro '${libro.titulo}'.`);
  }

  recomendarLibrosParaSocio(socioId: number): Libro[] {
    const socio = this.buscarSocio(socioId);
    if (!socio) return [];
    return socio.recomendarLibros(this.inventario);
  }

  // Método para obtener estadísticas de la biblioteca
  obtenerEstadisticas(): {
    totalLibros: number;
    librosPrestados: number;
    librosDisponibles: number;
    totalSocios: number;
    sociosConMultas: number;
  } {
    const totalLibros = this.inventario.length;
    const librosPrestados = this.inventario.filter(libro => libro.libroPrestado()).length;
    const librosDisponibles = totalLibros - librosPrestados;
    const totalSocios = this.socios.length;
    const sociosConMultas = this.socios.filter(socio => socio.verificarMultas()).length;

    return {
      totalLibros,
      librosPrestados,
      librosDisponibles,
      totalSocios,
      sociosConMultas
    };
  }

  // Método para mostrar el estado de un libro específico
  estadoLibro(isbn: string): string {
    const libro = this.buscarLibro(isbn);
    if (!libro) return "Libro no encontrado";
    
    if (libro.libroPrestado()) {
      return `Prestado. Cola de espera: ${(libro as any).colaDeEspera.length} personas`;
    }
    return "Disponible";
  }

  // Buscadores (Tarea 4)
  crearBuscadorUniversal(): BuscadorUniversal {
    const catalogo = new CatalogoBiblioteca(this.inventario.map(l => ({ titulo: l.titulo, autor: l.autor.nombreCompleto ?? String(l.autor), isbn: l.isbn })));
    const digital = new BibliotecaDigital([
      { titulo: "Eloquent JS", url: "https://eloquentjavascript.net", tema: "programación" },
    ]);
    const historico = new ArchivoHistorico([
      { titulo: "Acta fundacional", anio: 1890, descripcion: "Documento histórico" },
    ]);
    const base = new BaseConocimiento([
      { titulo: "POO en TS", autores: ["Alguien"], doi: "10.1234/xyz" },
    ]);
    return new BuscadorUniversal([catalogo, digital, historico, base]);
  }
}

export const biblioteca = new Biblioteca();
export type { Biblioteca };