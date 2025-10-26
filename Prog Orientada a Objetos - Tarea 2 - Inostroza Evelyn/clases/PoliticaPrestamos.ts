import { Socio } from "./Socio";
export interface PoliticaPrestamo {
  puedeRetirar(socio: Socio): boolean;
}

export class PoliticaEstricta implements PoliticaPrestamo {
  puedeRetirar(socio: Socio): boolean {
    return socio.prestamosActivos.every(p => p.calcularMulta(new Date()) === 0);
  }
}

export class PoliticaFlexible implements PoliticaPrestamo {
  puedeRetirar(socio: Socio): boolean { return true; }
}