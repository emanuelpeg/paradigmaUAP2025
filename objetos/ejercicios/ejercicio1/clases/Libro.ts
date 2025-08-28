import { Socio } from "./Socio";
import { Autor } from "./Autor";
export class Libro {
  private reservas: Socio[] = [];
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
  //Declara una lista privada para almacenar los socios que han reservado el libro./**
   /* Agrega una reserva para el libro.
   * @param socio Socio que reserva el libro
   * @returns true si se agregó, false si ya estaba reservado por ese socio
   */
  agregarReserva(socio: Socio): boolean {
    if (this.reservas.includes(socio)) return false;
    this.reservas.push(socio);
    return true;
  }

  //Método para agregar una reserva. Si el socio ya reservó el libro, retorna false. 
  // Si no, lo agrega a la cola y retorna true.
  //quita y retorna el primer socio en la cola de reservas.
  quitarReserva(): Socio | undefined {
    return this.reservas.shift();
  }

  
  //Quita y retorna el primer socio de la cola de reservas (el próximo en recibir el libro).
  //Indica si hay reservas pendientes.
  tieneReservas(): boolean {
    return this.reservas.length > 0;
  }
 //Retorna true si hay reservas pendientes para el libro.
 //* Retorna el próximo socio en la cola de reservas.
  proximoReserva(): Socio | undefined {
    return this.reservas[0];
  }
}
