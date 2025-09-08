import { Prestamo } from "./Prestamo";

export class Multa {
  private _valor: number;

  constructor(
    private _prestamo: Prestamo,
    private _fechaDevolucion: Date
  ) {
    this._valor = _prestamo.calcularMulta(_fechaDevolucion); // POLIMORFISMO
  }

  get prestamo() {
    return this._prestamo;
  }

  get fechaDevolucion() {
    return this._fechaDevolucion;
  }

  get valor() {
    return this._valor;
  }

  estaActiva(): boolean {
    return this._valor > 0;
  }

  mensajeMulta(): string {
    return `Multa generada para "${this._prestamo.Socio.nombreCompleto}" por el libro "${this._prestamo.Libro.titulo}": $${this._valor}`;
  }
}
