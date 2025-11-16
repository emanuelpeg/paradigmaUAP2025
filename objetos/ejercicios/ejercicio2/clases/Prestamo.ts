import { Libro } from "./Libro";
import { Socio } from "./Socio";

abstract class Prestamo {
  libro: Libro;
  socio: Socio;
  fechaPrestamo: Date;

  constructor(libro: Libro, socio: Socio) {
    this.libro = libro;
    this.socio = socio;
    this.fechaPrestamo = new Date();
    
  }

  abstract calcularVencimiento(): Date;
  abstract calcularMulta(diasAtraso: number): number;
}

// Prestamo Regular
class PrestamoRegular extends Prestamo {
  calcularVencimiento(): Date {
    const vencimiento = new Date(this.fechaPrestamo);
    vencimiento.setDate(vencimiento.getDate() + 14);
    return vencimiento;
  }

  calcularMulta(diasAtraso: number): number {
    return diasAtraso * 10; // multa estándar
  }
}

// Prestamo Corto
class PrestamoCorto extends Prestamo {
  calcularVencimiento(): Date {
    const vencimiento = new Date(this.fechaPrestamo);
    vencimiento.setDate(vencimiento.getDate() + 7);
    return vencimiento;
  }

  calcularMulta(diasAtraso: number): number {
    return diasAtraso * 20; // multa doble
  }
}

// Prestamo Referencia (solo consulta)
class PrestamoReferencia extends Prestamo {
  calcularVencimiento(): Date {
    return this.fechaPrestamo; // no se lleva
  }

  calcularMulta(): number {
    return 0;
  }
}

// Prestamo Digital
class PrestamoDigital extends Prestamo {
  calcularVencimiento(): Date {
    return new Date(9999, 11, 31); // casi infinito
  }

  calcularMulta(): number {
    return 0;
  }
}

export { Prestamo, PrestamoRegular, PrestamoCorto, PrestamoReferencia, PrestamoDigital };
