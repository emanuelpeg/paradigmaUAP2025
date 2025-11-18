import { Socio } from "./Socio";
import { Libro } from "./Libro";
import { PrestamoRegular, PrestamoCorto, PrestamoReferencia, PrestamoDigital } from "./Prestamo";

export class Biblioteca {
  private inventario: Libro[] = [];
  private socios: Socio[] = [];
  private historialNotificaciones: string[] = [];

  agregarLibro(libro: Libro) { this.inventario.push(libro); }
  registrarSocio(socio: Socio) { this.socios.push(socio); }

  retirarLibro(socioId: number, libroISBN: string, tipoPrestamo: "Regular" | "Corto" | "Referencia" | "Digital" = "Regular") {
    const socio = this.socios.find(s => s.id === socioId);
    const libro = this.inventario.find(l => l.isbn === libroISBN);
    if (!socio || !libro) throw new Error("Socio o libro no encontrado");
    if (this.socios.some(s => s.tienePrestadoLibro(libro))) throw new Error("Libro ya prestado");

    let prestamo;
    const hoy = new Date();
    switch (tipoPrestamo) {
      case "Regular": prestamo = new PrestamoRegular(libro, hoy); break;
      case "Corto": prestamo = new PrestamoCorto(libro, hoy); break;
      case "Referencia": prestamo = new PrestamoReferencia(libro, hoy); break;
      case "Digital": prestamo = new PrestamoDigital(libro, hoy); break;
    }

    socio.retirar(prestamo);

    const venc = prestamo.calcularVencimiento();
    const vencStr = venc ? venc.toLocaleDateString() : "sin vencimiento";
    this.historialNotificaciones.push(`Socio ${socio.nombreCompleto}: Has retirado "${libro.titulo}" hasta ${vencStr}`);
  }

  devolverLibro(socioId: number, libroISBN: string) {
    const socio = this.socios.find(s => s.id === socioId);
    const libro = this.inventario.find(l => l.isbn === libroISBN);
    if (!socio || !libro) throw new Error("Socio o libro no encontrado");
    socio.devolver(libro);
  }

  get notificaciones(): readonly string[] { return this.historialNotificaciones; }
}
