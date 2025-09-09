import { Prestamo } from "./Prestamo";
import { Socio } from "./Socio";
import { Libro } from "./Libro";

// Interfaz Strategy para políticas de préstamo
export interface IPoliticaPrestamo {
  puedePrestar(socio: Socio, libro: Libro, prestamosActivos: Prestamo[]): boolean;
  obtenerDuracionModificada(socio: Socio, duracionBase: number): number;
  puedeRenovar(prestamo: Prestamo, renovacionesRealizadas: number): boolean;
}

// Política estricta: No permite préstamos si hay libros vencidos
export class PoliticaEstricta implements IPoliticaPrestamo {
  public puedePrestar(socio: Socio, libro: Libro, prestamosActivos: Prestamo[]): boolean {
    // Verificar si el socio tiene préstamos vencidos
    const tieneVencidos = prestamosActivos.some(prestamo => 
      prestamo.getSocioId() === socio.id && prestamo.estaVencido()
    );
    
    if (tieneVencidos) {
      return false;
    }

    return socio.puedeRetirar(libro);
  }

  public obtenerDuracionModificada(socio: Socio, duracionBase: number): number {
    return duracionBase;
  }

  public puedeRenovar(prestamo: Prestamo, renovacionesRealizadas: number): boolean {
    return renovacionesRealizadas < 1 && !prestamo.estaVencido();
  }
}

// Política flexible: Permite préstamos pero con período reducido si hay vencidos
export class PoliticaFlexible implements IPoliticaPrestamo {
  public puedePrestar(socio: Socio, libro: Libro, prestamosActivos: Prestamo[]): boolean {
    return socio.puedeRetirar(libro);
  }

  public obtenerDuracionModificada(socio: Socio, duracionBase: number): number {
    // Para simplificar, asumimos duración estándar
    // En una implementación real, se podría pasar información adicional
    return duracionBase;
  }

  public puedeRenovar(prestamo: Prestamo, renovacionesRealizadas: number): boolean {
    return renovacionesRealizadas < 2;
  }
}

// Política estudiante: Período extendido durante épocas de exámenes
export class PoliticaEstudiante implements IPoliticaPrestamo {
  private esEpocaExamenes: boolean;

  constructor(esEpocaExamenes: boolean = false) {
    this.esEpocaExamenes = esEpocaExamenes;
  }

  public puedePrestar(socio: Socio, libro: Libro, prestamosActivos: Prestamo[]): boolean {
    return socio.puedeRetirar(libro);
  }

  public obtenerDuracionModificada(socio: Socio, duracionBase: number): number {
    // Durante época de exámenes, extender el período
    return this.esEpocaExamenes ? duracionBase + 7 : duracionBase;
  }

  public puedeRenovar(prestamo: Prestamo, renovacionesRealizadas: number): boolean {
    const maxRenovaciones = this.esEpocaExamenes ? 3 : 2;
    return renovacionesRealizadas < maxRenovaciones;
  }

  public setEpocaExamenes(esEpoca: boolean): void {
    this.esEpocaExamenes = esEpoca;
  }
}

// Política docente: Préstamos de larga duración y múltiples renovaciones
export class PoliticaDocente implements IPoliticaPrestamo {
  public puedePrestar(socio: Socio, libro: Libro, prestamosActivos: Prestamo[]): boolean {
    // Los docentes tienen prioridad y pueden tomar libros incluso con vencidos
    return socio.puedeRetirar(libro);
  }

  public obtenerDuracionModificada(socio: Socio, duracionBase: number): number {
    // Duración extendida para docentes
    return duracionBase * 2;
  }

  public puedeRenovar(prestamo: Prestamo, renovacionesRealizadas: number): boolean {
    // Múltiples renovaciones para docentes
    return renovacionesRealizadas < 5;
  }
}

// Context que usa la estrategia
export class GestorPoliticas {
  private politica: IPoliticaPrestamo;

  constructor(politica: IPoliticaPrestamo) {
    this.politica = politica;
  }

  public setPolitica(politica: IPoliticaPrestamo): void {
    this.politica = politica;
  }

  public evaluarPrestamo(socio: Socio, libro: Libro, prestamosActivos: Prestamo[]): boolean {
    return this.politica.puedePrestar(socio, libro, prestamosActivos);
  }

  public calcularDuracion(socio: Socio, duracionBase: number): number {
    return this.politica.obtenerDuracionModificada(socio, duracionBase);
  }

  public evaluarRenovacion(prestamo: Prestamo, renovaciones: number): boolean {
    return this.politica.puedeRenovar(prestamo, renovaciones);
  }
}
