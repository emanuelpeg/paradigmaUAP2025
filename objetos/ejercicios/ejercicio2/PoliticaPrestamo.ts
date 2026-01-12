import { Socio } from "./Socio";

export interface PoliticaPrestamo {
  puedePrestar(socio: Socio): boolean;
  calcularPeriodoPrestamo(socio: Socio): number;
}