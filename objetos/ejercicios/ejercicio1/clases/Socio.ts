import { Autor } from "./Autor";
import { Libro } from "./Libro";

class Prestamo {
  constructor(public libro: Libro, public vencimiento: Date) {}
}

/** Duracion en dias de un prestamo */
type Duracion = number;

export class Socio {
  private prestamos: Prestamo[] = [];
  private historial: Libro[] = [];
  private notificaciones:string[]=[];

  constructor(
    private _id: number,
    private _nombre: string,
    private _apellido: string,
    private _multa:number=0
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
    this.historial.push(libro);
  }

  devolver(libro: Libro) {
    const prestamo = this.tienePrestadoLibro(libro);

    if (!prestamo) {
      throw new Error("No esta prestado");
    }

    const indice = this.prestamos.indexOf(prestamo);
    // Eliminar el elemento en el indice
    this.prestamos.splice(indice, 1);

    return prestamo;
  }

  tienePrestadoLibro(libro: Libro): Prestamo | null {
    return this.prestamos.find((p) => p.libro === libro) ?? null;
  }

  notificarLibroDisponible(libro: Libro) {
    console.log(`El libro "${libro.titulo}" de ${libro.autor} está disponible para ti.`);
  }
  multaPorNoDevolverElLibro(): number{
    const hoy = new Date();
    for(const prestamo of this.prestamos) {
      const v = prestamo.vencimiento;
      if (hoy.getDate() > v.getDate()) {
        const diasTranscurridos=hoy.getDate()-v.getDate();
        this._multa=0;
        this._multa+=50*diasTranscurridos;
      }
    }
    return this._multa;
  }
  autoresHistorial(): Autor[]{
    const _autores:Autor[]=[];
    for(const book of this.historial){
      if(_autores.find(p=>p.nombre==book.autor.nombre)){
        continue;
      }
      _autores.push(book.autor);
    };

  return _autores;
}
  titulosInventario():string[]
  {
    const _titulos:string[]=[];
    for(const _titulo of this.historial){
      _titulos.push(_titulo.titulo);
    }
    return _titulos;
  }

  añadirNotificacion(mensaje:string){
    this.notificaciones.push(mensaje);
  }

}
