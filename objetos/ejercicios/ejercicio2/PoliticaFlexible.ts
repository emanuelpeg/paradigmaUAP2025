import { PoliticaPrestamo } from "./PoliticaPrestamo";
import { Socio } from "./Socio";

export class PoliticaFlexible implements PoliticaPrestamo {
  puedePrestar(_socio: Socio): boolean {
    return true;
  }
  calcularPeriodoPrestamo(socio: Socio): number {
    return socio.tieneLibrosVencidos() ? 7 : 14;
  }
}