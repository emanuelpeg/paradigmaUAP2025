import { Libro } from "./Libro";
import { Socio, SocioRegular, SocioVIP, Empleado, Visitante, Duracion } from "./Socio";
import { PoliticaPrestamo, PoliticaEstricta } from "./Politica";

export class Biblioteca {
  private inventario: Libro[] = [];
  private socios: Socio[] = [];
  private politica: PoliticaPrestamo = new PoliticaEstricta();

  cambiarPolitica(nueva: PoliticaPrestamo) {
    this.politica = nueva;
  }

  // Libros
  agregarLibro(titulo: string, autor: string, isbn: string): Libro {
    const libro = new Libro(titulo, autor, isbn);
    this.inventario.push(libro);
    return libro;
  }
  buscarLibro(isbn: string): Libro | null {
    return this.inventario.find(l => l.isbn === isbn) ?? null;
  }

  // Socios
  registrarSocio(id: number, nombre: string, apellido: string, tipo: "regular" | "vip" | "empleado" | "visitante" = "regular"): Socio {
    let socio: Socio;
    switch (tipo) {
      case "vip": socio = new SocioVIP(id, nombre, apellido); break;
      case "empleado": socio = new Empleado(id, nombre, apellido); break;
      case "visitante": socio = new Visitante(id, nombre, apellido); break;
      default: socio = new SocioRegular(id, nombre, apellido);
    }
    this.socios.push(socio);
    return socio;
  }
  buscarSocio(id: number): Socio | null {
    return this.socios.find(s => s.id === id) ?? null;
  }

  // Préstamos
  prestarLibro(socioId: number, isbn: string) {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(isbn);
    if (!socio || !libro) throw new Error("Socio o libro inexistente");

    if (!this.politica.puedePrestar(socio)) {
      throw new Error("El socio no puede retirar libros según la política actual");
    }
    const duracion: Duracion = this.politica.calcularDuracion(socio);

    socio.retirar(libro, duracion);
  }

  devolverLibro(socioId: number, isbn: string): number {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(isbn);
    if (!socio || !libro) throw new Error("Socio o libro inexistente");

    return socio.devolver(libro);
  }

  // utilidades
  listarLibros(): string[] {
    return this.inventario.map(l => l.toString());
  }
}

export const biblioteca = new Biblioteca();
