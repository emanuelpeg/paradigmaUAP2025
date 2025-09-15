import { PoliticaPrestamo } from "./PoliticaPrestamo";
import { Socio } from "./Socio";

export class PoliticaDocente implements PoliticaPrestamo {
  puedePrestar(_socio: Socio): boolean {
    return true;
  }
  calcularPeriodoPrestamo(_socio: Socio): number {
    return 60;
  }
}