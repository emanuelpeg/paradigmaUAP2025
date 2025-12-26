import { Socio } from "./Socio";

export interface PoliticaPrestamo {

      puedePrestar(socio: Socio): boolean;
  calcularDuracion(socio: Socio): number;
}

export class PoliticaEstricta implements PoliticaPrestamo {
  puedePrestar(socio: Socio): boolean {
    if (typeof socio.librosVencidos === "function") {
      return socio.librosVencidos() === 0;
    }
    return true;
  }
  calcularDuracion(socio: Socio): number {
    return socio.getDuracionPrestamo();
  }
}

export class PoliticaFlexible implements PoliticaPrestamo {
  puedePrestar(_socio: Socio): boolean {
    return true;
  }
  calcularDuracion(socio: Socio): number {
    if (typeof socio.librosVencidos === "function" && socio.librosVencidos() > 0) {
      return Math.max(7, socio.getDuracionPrestamo() - 7);
    }
    return socio.getDuracionPrestamo();
  }
}

export class PoliticaEstudiante implements PoliticaPrestamo {
  puedePrestar(_socio: Socio): boolean {
      return true;
  }
  calcularDuracion(socio: Socio): number {
    if (typeof socio.estaEnExamenes === "function" && socio.estaEnExamenes()) {
        return socio.getDuracionPrestamo() + 7;
    }
      return socio.getDuracionPrestamo();
  }
}

export class PoliticaDocente implements PoliticaPrestamo {
  puedePrestar(_socio: Socio): boolean {
    return true;
  }
  calcularDuracion(socio: Socio): number {
  
    if (typeof socio.puedeRenovar === "function" && socio.puedeRenovar()) {
        return socio.getDuracionPrestamo() + 14;
    }
      return socio.getDuracionPrestamo();
  }
}

