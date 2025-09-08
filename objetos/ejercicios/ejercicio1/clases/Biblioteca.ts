import { Libro } from "./Libro";
import { SocioRegular, SocioVIP, Empleado, Visitante } from "./Socio";
import { Usuario } from "./usuario";

type TipoSocio = "regular" | "vip" | "empleado" | "visitante";

class Biblioteca {
  private inventario: Libro[] = [];
  private socios: Usuario[] = [];

  // Funciones de libros
  agregarLibro(titulo: string, autor: string, isbn: string): Libro {
    const libroCreado = new Libro(titulo, autor, isbn);
    this.inventario.push(libroCreado);
    return libroCreado;
  }

  buscarLibro(isbn: string): Libro | null {
    return this.inventario.find((libro) => libro.isbn === isbn) ?? null;
  }

  // Funciones de socios
  registrarSocio(
    id: number,
    nombre: string,
    apellido: string,
    tipo: TipoSocio = "regular"
  ): Usuario {
    let socio: Usuario;
    switch (tipo) {
      case "vip":
        socio = new SocioVIP(id, nombre, apellido);
        break;
      case "empleado":
        socio = new Empleado(id, nombre, apellido);
        break;
      case "visitante":
        socio = new Visitante(id, nombre, apellido);
        break;
      default:
        socio = new SocioRegular(id, nombre, apellido);
    }
    this.socios.push(socio);
    return socio;
  }

  buscarSocio(id: number): Usuario | null {
    return this.socios.find((socio) => socio.id === id) ?? null;
  }

  retirarLibro(socioId: number, libroISBN: string): void {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);

    if (!socio || !libro) {
      throw new Error("No se encontro");
    }
    if (!socio.puedeRetirar()) {
      throw new Error("Este usuario no puede retirar libros");
    }
    // Verificar disponibilidad
    for (const s of this.socios) {
      // Solo socios que pueden tener préstamos
      if ("tienePrestadoLibro" in s && typeof s["tienePrestadoLibro"] === "function") {
        if ((s as any).tienePrestadoLibro(libro)) {
          throw new Error("Libro no esta disponible");
        }
      }
    }
    // Llamar a retirar solo si el método existe
    if ("retirar" in socio && typeof socio["retirar"] === "function") {
      (socio as any).retirar(libro);
    } else {
      throw new Error("Este usuario no puede retirar libros");
    }
  }

  devolverLibro(socioId: number, libroISBN: string) {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);

    if (!socio || !libro) {
      throw new Error("No se encontro");
    }
    if ("devolver" in socio && typeof socio["devolver"] === "function") {
      (socio as any).devolver(libro);
    } else {
      throw new Error("Este usuario no puede devolver libros");
    }
  }
}

export const biblioteca = new Biblioteca();
export type { Biblioteca };