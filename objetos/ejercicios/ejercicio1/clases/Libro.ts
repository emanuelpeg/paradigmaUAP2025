import { Autor } from "./Autor";

export class Libro {

  private reservas: any[] = [];
  private notificaciones: string[] = [];

  constructor(
    private _titulo: string,
    private _autor: Autor,
    private _isbn: string,
    private _categorias: string[] = []
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
  get categorias() {
    return this._categorias;
  }
  // Métodos para reservas
  agregarReserva(socio: any): void {
    this.reservas.push(socio);
    this.notificaciones.push(`Reserva agregada para el socio ${socio.nombreCompleto}`);
  }

  tieneReservas(): boolean {
    return this.reservas.length > 0;
  }

  obtenerProximaReserva(): any {
    return this.reservas.shift() ?? null;
  }

  notificarDisponibilidad(): void {
    if (this.tieneReservas()) {
      const socio = this.reservas[0];
      this.notificaciones.push(`El libro '${this.titulo}' está disponible para ${socio.nombreCompleto}`);
    }
  }

  obtenerNotificaciones(): string[] {
    return [...this.notificaciones];
  }
}
