import { Libro } from "./Libro";

class Prestamo {
  constructor(public libro: Libro, public vencimiento: Date) {}
}

/** Duracion en dias de un prestamo */
type Duracion = number;

export class Socio {
  private prestamos: Prestamo[] = [];
  HistorialLector : Libro [] = [];
  multa : number = 0;

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

  retirar(libro: Libro, duracion: Duracion) {
    const vencimiento = new Date();
    vencimiento.setDate(vencimiento.getDate() + duracion);
    this.prestamos.push(new Prestamo(libro, vencimiento));
  }

  registrarLectura(libro: Libro){
    if(!this.HistorialLector.includes(libro)){
      this.HistorialLector.push(libro);
    }
  }

  devolver(libro: Libro) {
    const prestamo = this.tienePrestadoLibro(libro);

    if (!prestamo) {
      throw new Error("No esta prestado");
    }
    const hoy = new Date();
    if(hoy > prestamo.vencimiento){
      const msPorDia = 1000 * 60 * 60 * 24;
      const diasRetraso = Math.ceil((hoy.getTime() - prestamo.vencimiento.getTime()) / msPorDia);
      const multaGenerada = diasRetraso * 50;
      this.multa += multaGenerada;
      console.log(`Multa generada: $${multaGenerada} por ${diasRetraso} días de retraso.`);

    } else {
    console.log("Libro devuelto a tiempo. No se genera multa.");
  }

    const indice = this.prestamos.indexOf(prestamo);
    // Eliminar el elemento en el indice
    this.prestamos.splice(indice, 1);

    return prestamo;
  }

  tienePrestadoLibro(libro: Libro): Prestamo | null {
    return this.prestamos.find((p) => p.libro === libro) ?? null;
  }

  recibirNotificacion(mensaje: string){
    console.log(`Notificacion para ${this.nombre} ${this.apellido}: ${mensaje}`);
  }
}