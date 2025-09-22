import { PoliticaPrestamo } from "./PoliticaPrestamo";
import { Socio } from "./Socio";

export class PoliticaEstricta implements PoliticaPrestamo {
  puedePrestar(socio: Socio): boolean {
    return !socio.tieneLibrosVencidos();
  }
  calcularPeriodoPrestamo(_socio: Socio): number {
    return 14;
  }
}