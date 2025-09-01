import { Socio } from "./Socio";
import { Autor } from "./Autor";

type Duracion = number;

export class Prestamo {
  constructor(public libro: Libro, public vencimiento: Date, public socio: Socio) {}
}

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

  nuevoPrestamo(duracion: Duracion, socio: Socio) {
    const vencimiento = new Date();
    vencimiento.setDate(vencimiento.getDate() + duracion);
    this.PrestamoActual = new Prestamo(this, vencimiento, socio);
  }

  devolver(socio: Socio, duracion: number): Prestamo {
    if (!this.tienePrestadoLibro(socio)) {
      throw new Error("El socio no tiene este libro prestado");
    }

    const prestamoDevuelto = this.PrestamoActual;
    this.PrestamoActual = null;
    this.siguienteEnColaDeEspera(duracion);

    // Registrar libro en historial de lectura
    socio.agregarLibroAlHistorial(this);

    return prestamoDevuelto!;
  }

  agregarAColaDeEspera(socio: Socio) {
    this.colaDeEspera.push(socio);
  }

  siguienteEnColaDeEspera(duracion: number) {
    const siguienteSocio = this.colaDeEspera.shift();
    if (siguienteSocio) {
      this.nuevoPrestamo(duracion, siguienteSocio);
      siguienteSocio.agregarNotificacion(`El libro '${this.titulo}' está ahora disponible para ti.`);
    }
  }

  prestamoVencido(): number | undefined {
    if (this.PrestamoActual && this.PrestamoActual.vencimiento < new Date()) {
      const diasDeMora = Math.ceil((new Date().getTime() - this.PrestamoActual.vencimiento.getTime()) / (1000 * 60 * 60 * 24));
      return diasDeMora;
    }
  }
}