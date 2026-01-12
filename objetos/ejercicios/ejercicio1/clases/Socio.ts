import { Libro } from "./Libro";
import { Usuario } from "./usuario";

class Prestamo {
  constructor(public libro: Libro, public vencimiento: Date) {}
}

// Socio Regular
export class SocioRegular extends Usuario {
  private prestamos: Prestamo[] = [];
  puedeRetirar() { return this.prestamos.length < 3; }
  maxLibros() { return 3; }
  periodoPrestamo() { return 14; }
  tieneMulta() { return true; }

  retirar(libro: Libro) {
    if (!this.puedeRetirar()) throw new Error("Límite de libros alcanzado");
    const vencimiento = new Date();
    vencimiento.setDate(vencimiento.getDate() + this.periodoPrestamo());
    this.prestamos.push(new Prestamo(libro, vencimiento));
  }

  devolver(libro: Libro) {
    const prestamo = this.tienePrestadoLibro(libro);
    if (!prestamo) throw new Error("No está prestado");
    const indice = this.prestamos.indexOf(prestamo);
    this.prestamos.splice(indice, 1);
    return prestamo;
  }

  tienePrestadoLibro(libro: Libro): Prestamo | null {
    return this.prestamos.find((p) => p.libro === libro) ?? null;
  }
}

// Socio VIP
export class SocioVIP extends Usuario {
  private prestamos: Prestamo[] = [];
  puedeRetirar() { return this.prestamos.length < 5; }
  maxLibros() { return 5; }
  periodoPrestamo() { return 28; }
  tieneMulta() { return false; }

  retirar(libro: Libro) {
    if (!this.puedeRetirar()) throw new Error("Límite de libros alcanzado");
    const vencimiento = new Date();
    vencimiento.setDate(vencimiento.getDate() + this.periodoPrestamo());
    this.prestamos.push(new Prestamo(libro, vencimiento));
  }

  devolver(libro: Libro) {
    const prestamo = this.tienePrestadoLibro(libro);
    if (!prestamo) throw new Error("No está prestado");
    const indice = this.prestamos.indexOf(prestamo);
    this.prestamos.splice(indice, 1);
    return prestamo;
  }

  tienePrestadoLibro(libro: Libro): Prestamo | null {
    return this.prestamos.find((p) => p.libro === libro) ?? null;
  }
}

// Empleado
export class Empleado extends Usuario {
  private prestamos: Prestamo[] = [];
  puedeRetirar() { return true; }
  maxLibros() { return Infinity; }
  periodoPrestamo() { return 60; }
  tieneMulta() { return false; }

  retirar(libro: Libro) {
    const vencimiento = new Date();
    vencimiento.setDate(vencimiento.getDate() + this.periodoPrestamo());
    this.prestamos.push(new Prestamo(libro, vencimiento));
  }

  devolver(libro: Libro) {
    const prestamo = this.tienePrestadoLibro(libro);
    if (!prestamo) throw new Error("No está prestado");
    const indice = this.prestamos.indexOf(prestamo);
    this.prestamos.splice(indice, 1);
    return prestamo;
  }

  tienePrestadoLibro(libro: Libro): Prestamo | null {
    return this.prestamos.find((p) => p.libro === libro) ?? null;
  }
}

// Visitante
export class Visitante extends Usuario {
  puedeRetirar() { return false; }
  maxLibros() { return 0; }
  periodoPrestamo() { return 0; }
  tieneMulta() { return false; }

  consultarCatalogo(){
    console.log("consulta al catalogo ")
  }
}