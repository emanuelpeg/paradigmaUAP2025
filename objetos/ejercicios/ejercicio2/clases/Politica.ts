import { Socio } from "./Socio";

export interface PoliticaPrestamo {
  puedePrestar(socio: Socio): boolean;
  calcularDuracion(socio: Socio): number;
}

export class PoliticaEstricta implements PoliticaPrestamo {
  puedePrestar(socio: Socio): boolean {
    return socio.getPrestamos().every(p => p.vencimiento >= new Date());
  }
  calcularDuracion(socio: Socio): number {
    return 14; // estándar
  }
}

export class PoliticaFlexible implements PoliticaPrestamo {
  puedePrestar(socio: Socio): boolean {
    return true; // siempre deja prestar
  }
  calcularDuracion(socio: Socio): number {
    // si tiene vencidos, el plazo es más corto
    const tieneVencidos = socio.getPrestamos().some(p => p.vencimiento < new Date());
    return tieneVencidos ? 7 : 14;
  }
}

export class PoliticaEstudiante implements PoliticaPrestamo {
  puedePrestar(socio: Socio): boolean {
    return socio.getPrestamos().length < 5; // límite para estudiantes
  }
  calcularDuracion(socio: Socio): number {
    return 21; // período extendido
  }
}

export class PoliticaDocente implements PoliticaPrestamo {
  puedePrestar(socio: Socio): boolean {
    return true; // docentes siempre pueden
  }
  calcularDuracion(socio: Socio): number {
    return 30; // préstamos largos
  }
}

