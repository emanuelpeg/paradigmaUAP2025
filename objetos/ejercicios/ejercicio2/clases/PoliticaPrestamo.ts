export interface PoliticaPrestamo {
  calcularDuracionPrestamo(tieneVencidos: boolean): number;
  puedePrestar(tieneVencidos: boolean): boolean;
}
//PoliticaEstricta: No permite préstamos si hay libros vencidos 
export class PoliticaEstricta implements PoliticaPrestamo {
  calcularDuracionPrestamo(tieneVencidos: boolean): number {
    return tieneVencidos ? 0 : 14;
  }
  puedePrestar(tieneVencidos: boolean): boolean {
    return !tieneVencidos;
  }
}
//PoliticaFlexible: Permite préstamos pero con período reducido si hay vencidos 
export class PoliticaFlexible implements PoliticaPrestamo {
  calcularDuracionPrestamo(tieneVencidos: boolean): number {
    return tieneVencidos ? 7 : 14;
  }
  puedePrestar(tieneVencidos: boolean): boolean {
    return true;
  }
}
//PoliticaEstudiante: Período extendido durante épocas de exámenes 
export class PoliticaEstudiante implements PoliticaPrestamo {
  calcularDuracionPrestamo(tieneVencidos: boolean): number {
    return tieneVencidos ? 7 : 21;
  }
  puedePrestar(tieneVencidos: boolean): boolean {
    return true;
  }
}
//PoliticaDocente: Préstamos de larga duración y múltiples renovaciones
export class PoliticaDocente implements PoliticaPrestamo {
  calcularDuracionPrestamo(tieneVencidos: boolean): number {
    return tieneVencidos ? 14 : 30;
  }
  puedePrestar(tieneVencidos: boolean): boolean {
    return true;
  }
}