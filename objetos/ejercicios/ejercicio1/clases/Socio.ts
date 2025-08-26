import { Libro } from "./Libro";

class Prestamo {
  constructor(public libro: Libro, public vencimiento: Date) {}
}

/** Duracion en dias de un prestamo */
type Duracion = number;

export class Socio {
  private prestamos: Prestamo[] = [];
  private _multa: number = 0;
  private _historialDeLectura:string[] = [];

  constructor(
    private _id: number,
    private _nombre: string,
    private _apellido: string
  ) {}

  get historialDeLectura(){
    return this._historialDeLectura;
  }

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

  get multa() {
    return this._multa;
  }

  //metodo para agregar una multa
  agregarMulta(monto: number){
    this._multa += monto;
  }

  //metodo para saldar una multa
  saldarMulta(){
    this._multa = 0;
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
    // Eliminar el elemento al que apunta el indice y borra un solo elemento
    this.prestamos.splice(indice, 1);
    //agregamos el isbn al historial de lectura = lista: string
    this._historialDeLectura.push(libro.isbn);
    return prestamo;
  }

  tienePrestadoLibro(libro: Libro): Prestamo | null {
    return this.prestamos.find((p) => p.libro === libro) ?? null;
  }

  haLeidoLibro(isbn: string): boolean{
    return this._historialDeLectura.includes(isbn);//si el socio ha leido, retorna true, sino false
  }

  prestamosVencidos(): Prestamo[] {
    const hoy = new Date();
    return this.prestamos.filter(prestamo => prestamo.vencimiento < hoy);
  }
}
