import { Libro } from "./Libro";

class Prestamo {
  constructor(public libro: Libro, public vencimiento: Date) {}
}

/** Duracion en dias de un prestamo */
type Duracion = number;

export class Socio {
  
  constructor(
   //privatiza todos los parametros para que no cualquiera los pueda modificar
    private _id: number,
    private _nombre: string,
    private _apellido: string,
     private _inventario: Libro[] = [],
   private _socios: Socio[] = [],
  private _prestamos: Prestamo[] = [],
  private deuda: number = 0
  ) {}

  //permite leer x parametros
  get prestamos(){ return this._prestamos}
  
  

  get socios(){ return this._socios}

  get inventario(){ return this._inventario}

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

  get deudaPendiente() {
    return this.deuda;
  }

   buscarSocio(id: number): Socio | null {
    return this.socios.find(socio => socio.id === id) ?? null;
  }

  buscarLibro(isbn: string): Libro | null {
    return this.inventario.find(libro => libro.isbn === isbn) ?? null;
  }

  pagarDeuda(monto: number) {
    this.deuda -= monto;
    if (this.deuda < 0) this.deuda = 0;
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
    //calcula la multa si esta vencido en base a los dias, incrementando en una cantidad de 50
    const hoy = new Date();
    if (hoy > prestamo.vencimiento) {
      const diasVencido = Math.ceil(
        (hoy.getTime() - prestamo.vencimiento.getTime()) / (1000 * 60 * 60 * 24)
      );
      this.deuda += diasVencido * 50;
      console.log(
        `El libro está vencido. Multa agregada: $${diasVencido * 50}`
      );
    }

    const indice = this.prestamos.indexOf(prestamo);
    // Eliminar el elemento en el indice
    this.prestamos.splice(indice, 1);

    return prestamo;
  }

tienePrestadoLibro(libro: Libro): Prestamo | null {
    return this.prestamos.find((p) => p.libro === libro) ?? null;
  }

   
}
