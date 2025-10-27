import { Socio } from "./Socio";
import { Libro } from "./Libro";

export abstract class Politica {
  /** Verifica si el socio puede pedir prestado el libro */
  abstract puedePrestar(socio: Socio, libro: Libro): boolean;

  /** Calcula la duración final del préstamo */
  abstract calcularDuracion(socio: Socio): number;
}

export enum TipoPolitica {
  ESTRICTA = "estricta",
  FLEXIBLE = "flexible",
  ESTUDIANTE = "estudiante",
  DOCENTE = "docente",
}

// ---------------------
// Estrategias concretas
// ---------------------

export class PoliticaEstricta extends Politica {
  puedePrestar(socio: Socio, libro: Libro): boolean {
    // No permite préstamo si hay libros vencidos
    return socio.librosVencidos().length === 0;
  }

  calcularDuracion(socio: Socio): number {
    return socio.getDuracionPrestamo();
  }
}

export class PoliticaFlexible extends Politica {
  puedePrestar(socio: Socio, libro: Libro): boolean {
    // Permite prestar aunque tenga vencidos
    return true;
  }

  calcularDuracion(socio: Socio): number {
    // Si tiene vencidos, le reducimos el período a la mitad
    return socio.librosVencidos().length > 0
      ? Math.floor(socio.getDuracionPrestamo() / 2)
      : socio.getDuracionPrestamo();
  }
}

export class PoliticaEstudiante extends Politica {
  puedePrestar(socio: Socio, libro: Libro): boolean {
    return true;
  }

  calcularDuracion(socio: Socio): number {
    // Ejemplo: período extendido +7 días en época de exámenes
    return socio.getDuracionPrestamo() + 7;
  }
}

export class PoliticaDocente extends Politica {
  puedePrestar(socio: Socio, libro: Libro): boolean {
    return true;
  }

  calcularDuracion(socio: Socio): number {
    // Ejemplo: duración de 60 días
    return 60;
  }
}

// ---------------------
// Factory de Políticas
// ---------------------
export class PoliticaFactory {
  static crearPolitica(tipo: TipoPolitica): Politica {
    switch (tipo) {
      case TipoPolitica.ESTRICTA:
        return new PoliticaEstricta();
      case TipoPolitica.FLEXIBLE:
        return new PoliticaFlexible();
      case TipoPolitica.ESTUDIANTE:
        return new PoliticaEstudiante();
      case TipoPolitica.DOCENTE:
        return new PoliticaDocente();
      default:
        throw new Error("Tipo de política no válido");
    }
  }
}
