import { Prestamo } from "./Prestamo";

abstract class Socio {
  nombre: string;
  prestamos: Prestamo[] = [];

  constructor(nombre: string) {
    this.nombre = nombre;
  }

  // Cada tipo de socio define sus reglas
  abstract maxLibros(): number;
  abstract puedeTenerMultas(): boolean;

  // Asociar un préstamo al socio
  agregarPrestamo(prestamo: Prestamo): boolean {
    if (this.prestamos.length < this.maxLibros()) {
      this.prestamos.push(prestamo);
      return true;
    }
    return false;
  }

  getPrestamos(): Prestamo[] {
    return this.prestamos;
  }

  listarPrestamos(): Prestamo[] {
    return this.prestamos;
  }
}

// --- Tipos de socios ---
class SocioRegular extends Socio {
  maxLibros(): number {
    return 3;
  }
  puedeTenerMultas(): boolean {
    return true;
  }
}

// Socio VIP: máx 5 libros, sin multas
class SocioVIP extends Socio {
  maxLibros(): number {
    return 5;
  }
  puedeTenerMultas(): boolean {
    return false;
  }
}

// Empleado: puede acceder a libros de referencia
class Empleado extends Socio {
  maxLibros(): number {
    return 10;
  }
  puedeTenerMultas(): boolean {
    return false;
  }
}

// Visitante: solo consulta catálogo, no puede pedir prestado
class Visitante extends Socio {
  maxLibros(): number {
    return 0;
  }
  puedeTenerMultas(): boolean {
    return false;
  }
}

export { Socio, SocioRegular, SocioVIP, Empleado, Visitante };
