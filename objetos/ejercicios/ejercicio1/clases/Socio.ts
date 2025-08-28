import { Libro } from "./Libro";

class Prestamo {
  constructor(public libro: Libro, public vencimiento: Date) {}
}

/** Duracion en dias de un prestamo */
type Duracion = number;

export class Socio {
  private prestamos: Prestamo[] = [];
  private multasPendientes: number = 0;
  private historialLectura: Libro[] = [];

  constructor(
    private _id: number,
    private _nombre: string,
    private _apellido: string
  ) {}

  get id() {
    return this._id;
  }

  get nombre() {
    return this._nombre;
  }

  get apellido() {
    return this._apellido;
  }

  get nombreCompleto() {
    return `${this.nombre} ${this.apellido}`;
  }

  get deuda(): number {
    return this.multasPendientes;
  }

  retirar(libro: Libro, duracion: Duracion) {
    const vencimiento = new Date();
    vencimiento.setDate(vencimiento.getDate() + duracion);
    this.prestamos.push(new Prestamo(libro, vencimiento));
  }

  devolver(libro: Libro) {
    const prestamo = this.tienePrestadoLibro(libro);

    if (!prestamo) {
      throw new Error("No esta prestado");
    }

    const indice = this.prestamos.indexOf(prestamo);
    // Eliminar el elemento en el indice
    this.prestamos.splice(indice, 1);

    // actualizar historial
    this.historialLectura.push(libro);

    return prestamo;
  }

  tienePrestadoLibro(libro: Libro): Prestamo | null {
    return this.prestamos.find((p) => p.libro === libro) ?? null;
  }

  obtenerHistorialLectura(): Libro[] {
    return [...this.historialLectura];
  }

  calcularMultaPorPrestamo(prestamo: Prestamo, multaDiaria: number): number {
    const hoy = new Date();
    if (hoy <= prestamo.vencimiento) return 0;
    const msPorDia = 1000 * 60 * 60 * 24;
    const diasAtraso = Math.ceil((hoy.getTime() - prestamo.vencimiento.getTime()) / msPorDia);
    return diasAtraso * multaDiaria;
  }

  registrarMulta(monto: number) {
    this.multasPendientes += monto;
  }

  pagarMulta(monto: number) {
    this.multasPendientes = Math.max(0, this.multasPendientes - monto);
  }

  calcularMultaPendiente(multaDiaria: number): number {
    // Multa acumulada por prestamos vencidos al dia de hoy
    let total = this.multasPendientes;
    for (const p of this.prestamos) {
      const adicional = this.calcularMultaPorPrestamo(p, multaDiaria);
      if (adicional > 0) {
        total += adicional;
      }
    }
    return total;
  }

  recomendacionesSimples(): string[] {
    const autores = new Set(this.historialLectura.map((l) => l.autor.nombre));
    const categorias = new Set(this.historialLectura.flatMap((l) => l.categorias));
    return [
      ...Array.from(autores).map((a) => `Buscar mas libros del autor: ${a}`),
      ...Array.from(categorias).map((c) => `Explorar categoria: ${c}`),
    ];
  }
}
