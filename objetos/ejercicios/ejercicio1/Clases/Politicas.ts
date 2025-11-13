import type { Socio } from "./Socio";

export interface PoliticaPrestamo {
  /** puede otorgarse un préstamo en este contexto? */
  puedePrestar(socio: Socio, tieneVencidos: boolean): boolean;
  /** ajuste de días de préstamo según contexto */
  ajustarDiasBase(diasBase: number): number;
}

export class PoliticaEstricta implements PoliticaPrestamo {
  puedePrestar(_socio: Socio, tieneVencidos: boolean): boolean {
    return !tieneVencidos; // bloquea si hay vencidos
  }
  ajustarDiasBase(diasBase: number): number { return diasBase; }
}

export class PoliticaFlexible implements PoliticaPrestamo {
  puedePrestar(_socio: Socio, _tieneVencidos: boolean): boolean {
    return true; // permite prestar siempre
  }
  ajustarDiasBase(diasBase: number): number {
    return Math.max(7, Math.floor(diasBase * 0.7)); // reduce si hay problemas (simplificado)
  }
}

export class PoliticaEstudiante implements PoliticaPrestamo {
  puedePrestar(_socio: Socio, _tieneVencidos: boolean): boolean { return true; }
  ajustarDiasBase(diasBase: number): number { return diasBase + 7; } // época de exámenes
}

export class PoliticaDocente implements PoliticaPrestamo {
  puedePrestar(_socio: Socio, _tieneVencidos: boolean): boolean { return true; }
  ajustarDiasBase(diasBase: number): number { return diasBase + 21; } // larga duración
}
