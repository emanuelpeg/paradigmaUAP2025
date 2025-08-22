import { Libro } from "./Libro";
import { Socio } from "./Socio";

class Biblioteca {
  private inventario: Libro[] = [];
  private socios: Socio[] = [];
  private DURACION = 14;
  private reservas: { [isbn: string]: number[] } = {}; 
  private prestamosActivos: { [isbn: string]: number } = {}; 
  private multas: { [socioId: number]: number } = {};



  // Funciones de libros
  agregarLibro(titulo: string, autor: string, isbn: string): Libro {
    const libroCreado = new Libro(titulo, autor, isbn);
    this.inventario.push(libroCreado);
    return libroCreado;
  }

  buscarLibro(isbn: string): Libro | null {
    // return this.inventario.find(libro => libro.isbn === isbn) ?? null;
    const libroEncontrado = this.inventario.find(
      (libro) => libro.isbn === isbn
    );
    if (libroEncontrado) {
      return libroEncontrado;
    }
    return null;
  }

  // Funciones de socios
  registrarSocio(id: number, nombre: string, apellido: string): Socio {
    const socioCreado = new Socio(id, nombre, apellido);
    this.socios.push(socioCreado);
    return socioCreado;
  }

  buscarSocio(id: number): Socio | null {
    return this.socios.find((socio) => socio.id === id) ?? null;
  }

  retirarLibro(socioId: number, libroISBN: string): void {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);

    if (this.multas[socioId] && this.multas[socioId] > 0) {
  console.log(`El socio ${socioId} tiene una multa pendiente de ${this.multas[socioId]}. No puede retirar libros.`);
  return;
}
   

    if (!socio || !libro) {
      throw new Error("No se encontro");
    }
    // fijarse si esta disponible
  
      if (this.prestamosActivos[libroISBN]) {
        
        if(this.reservas[libroISBN]?.[0] === socioId) {
          this.reservas[libroISBN].shift();
        }
        else{
        throw new Error("Libro no esta disponible. Puedes reservarlo");
        
      }
      
      }
    

    socio.retirar(libro, this.DURACION);
    this.prestamosActivos[libroISBN] = socioId
    console.log(`Socio ${socioId} retiro el libro  ${libroISBN}`);
  }

  devolverLibro(socioId: number, libroISBN: string) {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);

    if (!socio || !libro) {
      throw new Error("No se encontro");
    }

    socio.devolver(libro);
    delete this.prestamosActivos[libroISBN];
    const cola = this.reservas[libroISBN];

    console.log(`Socio ${socioId} devolvio el libro  ${libroISBN}`);

    if (cola && cola.length > 0) {
      const siguienteSocioId = cola.shift();
      console.log(`Notificando al socio ${siguienteSocioId}`); 
      this.reservas[libroISBN] = cola;
    }
  }

  reservarLibro(socioId: number, libroISBN: string) {
    if(!this.reservas[libroISBN]) {
      this.reservas[libroISBN] = [];
      }
    this.reservas[libroISBN].push(socioId);
    console.log(`Socio ${socioId} reservo el libro  ${libroISBN}`);

  

}

calculoMulta(socioId: number, libroISBN: string): boolean{
  const socio = this.buscarSocio(socioId);
  const libro = this.buscarLibro(libroISBN);


  if(!socio || !libro) {
    throw new Error("socio o libro no encontrado");
  }

    const diasRetraso = socio.diasRetrasoLibro(libro);

  if(diasRetraso > 0) {
    const multa = diasRetraso * 50; 
    this.multas[socioId] = (this.multas[socioId] || 0) + multa; // guardamos la multa
    console.log(`El socio ${socioId} tiene una multa de ${multa} por el libro ${libroISBN}`);
    return true;
  } 
 
  else {
    console.log(`El socio ${socioId} no tiene multas pendientes por el libro ${libroISBN}`);
    return false;
  }


}

}

export const biblioteca = new Biblioteca();
export type { Biblioteca };
