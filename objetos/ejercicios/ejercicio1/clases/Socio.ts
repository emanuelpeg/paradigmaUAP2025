import { Libro } from "./Libro";
import { Prestamo } from "./Prestamo";

export class Socio {
  private prestamos: Prestamo[] = [];
  private historial: Libro[] = [];
  private multas: number = 0;

  constructor(private _id: number, private _nombre: string, private _apellido: string) { }

  get id() { return this._id; }
  get nombre() { return this._nombre; }
  get apellido() { return this._apellido; }
  get nombreCompleto() { return `${this.nombre} ${this.apellido}`; }
  get deuda() { return this.multas; }

  // -------------------- PRÉSTAMOS --------------------
  retirar(libro: Libro, duracion: number) {
    //
    if (this.multas > 0) throw new Error("Tiene multas pendientes");
    const vencimiento = new Date();
    vencimiento.setDate(vencimiento.getDate() + duracion);
    this.prestamos.push(new Prestamo(libro, vencimiento));
    this.historial.push(libro);
  }

  devolver(libro: Libro) {
    const prestamo = this.tienePrestadoLibro(libro);
    if (!prestamo) throw new Error("No está prestado");

    const hoy = new Date();
    if (hoy > prestamo.vencimiento) {
      const diasRetraso = Math.ceil((hoy.getTime() - prestamo.vencimiento.getTime()) / (1000 * 60 * 60 * 24));
      this.multas += diasRetraso * 50;
      console.log(`${this.nombreCompleto} tiene una multa de $${diasRetraso * 50}`);
    }

    const idx = this.prestamos.indexOf(prestamo);
    this.prestamos.splice(idx, 1);
    return prestamo;
  }

  pagarMulta() {
    console.log(`${this.nombreCompleto} pagó $${this.multas}`);
    this.multas = 0;
  }

  tienePrestadoLibro(libro: Libro): Prestamo | null {
    return this.prestamos.find(p => p.libro === libro) ?? null;
  }

  // -------------------- RECOMENDACIONES --------------------
  recomendar(libros: Libro[]): Libro[] {
    const autoresLeidos = new Set(this.historial.map(l => l.autor));
    return libros.filter(l => autoresLeidos.has(l.autor) && !this.historial.includes(l));
  }
}
