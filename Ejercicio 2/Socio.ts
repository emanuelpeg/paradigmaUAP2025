import { Libro } from "./Libro";

class Prestamo {
  constructor(public libro: Libro, public vencimiento: Date) {}
}


type Duracion = number;


export type TipoSocio = "regular" | "vip" | "empleado" | "visitante";

export class Socio {
  private prestamos: Prestamo[] = [];


  private _multasPendientes = 0;

  
  private _inbox: string[] = [];


  private _historial: string[] = [];

  
  private _tipo: TipoSocio;

  constructor(
    private _id: number,
    private _nombre: string,
    private _apellido: string,
    tipo: TipoSocio = "regular" // NUEVO
  ) {
    this._tipo = tipo;
  }


  get id() { return this._id; }
  get nombre() { return this._nombre; }
  get apellido() { return this._apellido; }
  get nombreCompleto() { return `${this.nombre} ${this.apellido}`; }

  
  get tipo() { return this._tipo; }

  
  maxLibros(): number {
    switch (this._tipo) {
      case "regular":  return 3;
      case "vip":      return 5;
      case "empleado": return Number.POSITIVE_INFINITY;
      case "visitante":return 0;
    }
  }

  puedeRecibirMulta(): boolean {
    return this._tipo === "regular";
  }
  
  puedeAccederReferencia(): boolean {
    return this._tipo === "empleado";
  }

  
  get multasPendientes() { return this._multasPendientes; }
  /** Si no recibe multas (VIP/Empleado), no se bloquea por deuda. */
  get puedePrestar() {
    return this.puedeRecibirMulta() ? this._multasPendientes === 0 : true;
  }
  pagarMulta(monto: number) {
    this._multasPendientes = Math.max(0, this._multasPendientes - monto);
  }
  sumarMulta(monto: number) {
    if (this.puedeRecibirMulta()) this._multasPendientes += monto;
  }


  get inbox() { return this._inbox; }
  notificar(mensaje: string) { this._inbox.push(mensaje); }

 
  get historial() { return this._historial; }
  registrarLectura(isbn: string) {
    if (!this._historial.includes(isbn)) this._historial.push(isbn);
  }

 
  retirar(libro: Libro, duracion: Duracion) {
    const vencimiento = new Date();
    vencimiento.setDate(vencimiento.getDate() + duracion);
    this.prestamos.push(new Prestamo(libro, vencimiento));
  }

  devolver(libro: Libro) {
    const prestamo = this.tienePrestadoLibro(libro);
    if (!prestamo) throw new Error("No está prestado");
    const indice = this.prestamos.indexOf(prestamo);
    this.prestamos.splice(indice, 1);
    return prestamo; // devolvemos el préstamo para conocer vencimiento
  }

  tienePrestadoLibro(libro: Libro): Prestamo | null {
    return this.prestamos.find((p) => p.libro === libro) ?? null;
  }

  prestamosActivos(): ReadonlyArray<{ libro: Libro; vencimiento: Date }> {
    return this.prestamos.map(p => ({ libro: p.libro, vencimiento: p.vencimiento }));
  }
}
