import { Libro } from "./Libro";

class Prestamo {
  constructor (public libro: Libro, public vencimiento: Date){}
}

type Duracion = number

export class Socio {
  private prestamos: Prestamo[] = [];
  //private libroRetirados: Libro[] = [];
  //private vencimientoPrestamo

  constructor(
    private _id: number,
    private _nombre: string,
    private _appellido: string
  ) {}

  get id(){
    return this._id;
  }

  get nombre(){
    return this._nombre;
  }

  get apellido(){
    return this._appellido;
  }

  get nombreCompleto(){
    return `${this._nombre} ${this._appellido}`;
  }

retirar (libro: Libro, duracion: Duracion){
  const vencimiento = new Date();
  vencimiento.setDate(vencimiento.getDate() + duracion)
  this.prestamos.push(new Prestamo(libro, vencimiento))
}

devolver(libro: Libro){
  const prestamo =tienesPrestadiLibro(libro) //arreglar

  if(!prestamo)
  {
    throw new Error("No está prestado");
  }

  const indice = this.prestamos.indexOf(prestamo);// indexofDevuelve el indice del prestamo en una lista
  this.prestamos.splice(indice, 1); // Elimina el prestamo del array

  return prestamo;
}

tienesPrestadiLibro(libro: Libro){
  const prestamo = this.prestamos.find (p=> p.libro === libro) ?? null;
}

}