// Tarea 3: Patrón Strategy para políticas de préstamo

import { Socio } from "./Socio";
import { Libro } from "./Libro";

export interface PoliticaPrestamo {
  puedePrestar(socio: Socio, libro: Libro): boolean;
  getDuracion(socio: Socio): number;
}

export class PoliticaEstricta implements PoliticaPrestamo {
  puedePrestar(socio: Socio, libro: Libro): boolean {
    // No permite si hay libros vencidos
    return socio.getPrestamos().every(p => {
      const hoy = new Date();
      return !p.vencimiento || p.vencimiento >= hoy;
    });
  }
  getDuracion(socio: Socio): number {
    return socio.getDuracionPrestamo();
  }
}

export class PoliticaFlexible implements PoliticaPrestamo {
  puedePrestar(socio: Socio, libro: Libro): boolean {
    return true;
  }
  getDuracion(socio: Socio): number {
    // Si hay vencidos, reduce a la mitad
    const vencidos = socio.getPrestamos().some(p => {
      const hoy = new Date();
      return p.vencimiento && p.vencimiento < hoy;
    });
    return vencidos ? Math.floor(socio.getDuracionPrestamo() / 2) : socio.getDuracionPrestamo();
  }
}

export class PoliticaEstudiante implements PoliticaPrestamo {
  puedePrestar(socio: Socio, libro: Libro): boolean {
    return true;
  }
  getDuracion(socio: Socio): number {
    // Período extendido
    return socio.getDuracionPrestamo() + 7;
  }
}

export class PoliticaDocente implements PoliticaPrestamo {
  puedePrestar(socio: Socio, libro: Libro): boolean {
    return true;
  }
  getDuracion(socio: Socio): number {
    // Larga duración y múltiples renovaciones
    return socio.getDuracionPrestamo() + 21;
  }
}
