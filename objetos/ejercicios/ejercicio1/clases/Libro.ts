import { Autor } from "./Autor";
export class Libro {

  private reservas: number[] = []; // Ids de socios que reservaron un libro.

  constructor(
    private _titulo: string,
    private _autor: Autor,
    private _isbn: string
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

  //Agrega un socio a la lista de reservas - es un metodo
  reservar(socioId: number){
    this.reservas.push.apply(socioId);
  }

  //Obtiene el siguiente socio en la cola de reservas
  obtenerSiguienteReserva():number | undefined{
    return this.reservas.shift();//devuelve el primer elemento del array y lo elimina
  }

  //Valida si el libro tiene una reserva
  tieneReservas(): boolean{
    return this.reservas.length>0; //si hay reservas True, sino es falso
  }
}
