import { Libro } from "./Libro";

class Prestamo {
  constructor(public libro: Libro, public vencimiento: Date) {}
}

/** Duracion en dias de un prestamo */
type Duracion = number;

export class Socio {
  private prestamos: Prestamo[] = [];
  public historialPrestamos: { libro: Libro; fechaRetiro: Date; fechaDevolucion?: Date }[] = [];

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
    
    this.historialPrestamos.push({
      libro: libro,
      fechaRetiro: new Date(),
      fechaDevolucion: undefined
    });
  }

  devolver(libro: Libro) {
    const prestamo = this.tienePrestadoLibro(libro);

    if (!prestamo) {
      throw new Error("No esta prestado");
    }
    
    const indice = this.prestamos.indexOf(prestamo);
    this.prestamos.splice(indice, 1);

    const entradaHistorial = this.historialPrestamos.find(entry => 
      entry.libro.isbn === libro.isbn && !entry.fechaDevolucion
    );
    
    if (entradaHistorial) {
      entradaHistorial.fechaDevolucion = new Date();
    }

    return prestamo;
  }

  tienePrestadoLibro(libro: Libro): Prestamo | null {

    return this.prestamos.find((p) => p.libro.isbn === libro.isbn) ?? null;
  }

  diasRetrasoLibro(libro: Libro): number {
  const prestamo = this.prestamos.find(p => p.libro.isbn === libro.isbn);


  if (!prestamo) return 0;
  const hoy = new Date();
  hoy.setDate(hoy.getDate() + 15); 

  if (hoy > prestamo.vencimiento) {
    const diferencia = hoy.getTime() - prestamo.vencimiento.getTime();
    return Math.ceil(diferencia / (1000 * 3600 * 24)); 
  }

  return 0;
}
mostrarHistorial(): void {
  console.log(`\n=== Historial de préstamos de ${this.nombreCompleto} ===`);
  
  if (this.historialPrestamos.length === 0) {
    console.log("No tiene historial de préstamos.");
    return;
  }

  this.historialPrestamos.forEach((entry, index) => {
    console.log(`${index + 1}. Libro: "${entry.libro.titulo}"`);
    console.log(`   ISBN: ${entry.libro.isbn}`);
    console.log(`   Fecha de retiro: ${entry.fechaRetiro.toLocaleDateString()}`);
    console.log(`   Fecha de devolución: ${entry.fechaDevolucion ? entry.fechaDevolucion.toLocaleDateString() : 'No devuelto aún'}`);
    console.log('---');
  });
}

}

