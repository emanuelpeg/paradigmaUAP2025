import { Socio } from "./Socio";
import { Autor } from "./Autor";
import { Prestamo, TipoPrestamo, crearPrestamo } from "./Prestamo";

export class Libro {
  private colaDeEspera: Socio[] = [];
  private PrestamoActual: Prestamo | null = null;

  constructor(
    private _titulo: string,
    private _autor: Autor,
    private _isbn: string
  ) {}

  get titulo() {
    return this._titulo;
  }
  get autor() {
    return this._autor;
  }
  get isbn() {
    return this._isbn;
  }

  libroPrestado(): boolean{
    return !!this.PrestamoActual;
  }

  tienePrestadoLibro(socio: Socio): boolean {
    return this.PrestamoActual?.socio === socio;
  }

  nuevoPrestamo(tipo: TipoPrestamo, socio: Socio, multaBase: number, opciones?: { diasRegular?: number }) {
    const p = crearPrestamo(tipo, this, socio, multaBase, opciones);
    p.calcularVencimiento();
    // multa se calcula a la devolución según días de mora
    this.PrestamoActual = p;
  }

  devolver(socio: Socio, siguientePrestamo?: { tipo: TipoPrestamo; multaBase: number; opciones?: { diasRegular?: number } }): Prestamo {
    if (!this.tienePrestadoLibro(socio)) {
      throw new Error("El socio no tiene este libro prestado");
    }

    const prestamoDevuelto = this.PrestamoActual;
    this.PrestamoActual = null;
    this.siguienteEnColaDeEspera(siguientePrestamo);

    // Registrar libro en historial de lectura
    socio.agregarLibroAlHistorial(this);

    return prestamoDevuelto!; 
  }

  agregarAColaDeEspera(socio: Socio) {
    this.colaDeEspera.push(socio);
  }

  siguienteEnColaDeEspera(siguientePrestamo?: { tipo: TipoPrestamo; multaBase: number; opciones?: { diasRegular?: number } }) {
    const siguienteSocio = this.colaDeEspera.shift();
    if (siguienteSocio) {
      if (siguientePrestamo) {
        this.nuevoPrestamo(siguientePrestamo.tipo, siguienteSocio, siguientePrestamo.multaBase, siguientePrestamo.opciones);
      }
      siguienteSocio.agregarNotificacion(`El libro '${this.titulo}' está ahora disponible para ti.`);
    }
  }

  prestamoVencido(): number | undefined {
    if (this.PrestamoActual && this.PrestamoActual.vencimiento && this.PrestamoActual.vencimiento < new Date()) {
      const diasDeMora = Math.ceil((new Date().getTime() - this.PrestamoActual.vencimiento.getTime()) / (1000 * 60 * 60 * 24));
      return diasDeMora;
    }
  }

  // Calcula la multa para el préstamo actual según los días de mora
  calcularMulta(diasMora: number): number {
    if (!this.PrestamoActual) return 0;
    this.PrestamoActual.setDiasMora(diasMora);
    this.PrestamoActual.calcularMulta();
    return this.PrestamoActual.multa;
  }
}