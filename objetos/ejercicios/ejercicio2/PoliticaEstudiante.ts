import { PoliticaPrestamo } from "./PoliticaPrestamo";
import { Socio } from "./Socio";

export class PoliticaEstudiante implements PoliticaPrestamo {
  puedePrestar(_socio: Socio): boolean {
    return true;
  }
  calcularPeriodoPrestamo(_socio: Socio): number {
    return 28;
  }
}