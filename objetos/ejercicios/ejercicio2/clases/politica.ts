import { Socio } from "./Socio";
import { Libro } from "./Libro";

export interface PoliticaPrestamo {
  puedePrestar(socio: Socio): boolean;
  getDuracionPrestamo(socio: Socio): number;
}

// Política estricta: no permite préstamos si hay libros vencidos
export class PoliticaEstricta implements PoliticaPrestamo {
  puedePrestar(socio: Socio): boolean {
    return socio.getPrestamos.every(prestamo => {
      const hoy = new Date();
      return hoy <= prestamo.calcularVencimiento();
    });
  }
  getDuracionPrestamo(socio: Socio): number {
    return socio.getDuracionPrestamo();
  }

  
}

// Política flexible: permite préstamos pero con período reducido si hay vencidos
export class PoliticaFlexible implements PoliticaPrestamo {
  puedePrestar(socio: Socio): boolean {
    return true;
  }
  getDuracionPrestamo(socio: Socio): number {
    const hoy = new Date();
    const tieneVencidos = socio.getPrestamos.some(prestamo => hoy > prestamo.calcularVencimiento());
    return tieneVencidos ? 7 : socio.getDuracionPrestamo();
  }
}

export class PoliticaEstudiante implements PoliticaPrestamo {
  puedePrestar(socio: Socio): boolean {
    return true;
  }
  getDuracionPrestamo(socio: Socio): number {
    // Ejemplo: 28 días durante exámenes
    return 28;
  }
}

export class PoliticaDocente implements PoliticaPrestamo {
  puedePrestar(socio: Socio): boolean {
    return true;
  }
  getDuracionPrestamo(socio: Socio): number {
    // Ejemplo: 60 días
    return 60;
  }
}