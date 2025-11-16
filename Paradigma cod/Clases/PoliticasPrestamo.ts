export interface PoliticaPrestamo {
  puedePrestar(tieneVencidos: boolean): boolean;
  diasDePrestamo(baseDias: number): number;
}

// --- Estrategias ---

export class PoliticaEstricta implements PoliticaPrestamo {
  puedePrestar(tieneVencidos: boolean): boolean {
    return !tieneVencidos;
  }
  diasDePrestamo(baseDias: number): number {
    return baseDias;
  }
}

export class PoliticaFlexible implements PoliticaPrestamo {
  puedePrestar(_: boolean): boolean {
    return true; // siempre deja prestar
  }
  diasDePrestamo(baseDias: number): number {
    return Math.floor(baseDias / 2); // reduce a la mitad
  }
}

export class PoliticaEstudiante implements PoliticaPrestamo {
  puedePrestar(_: boolean): boolean {
    return true;
  }
  diasDePrestamo(baseDias: number): number {
    return baseDias + 7; // +7 días extra
  }
}

export class PoliticaDocente implements PoliticaPrestamo {
  puedePrestar(_: boolean): boolean {
    return true;
  }
  diasDePrestamo(baseDias: number): number {
    return baseDias + 30; // préstamos largos
  }
}
