// objetos/ejercicios/ejercicio1/Clases/Politicas.ts
import type { TipoSocio } from "./Socio";

export interface PoliticaPrestamo {
  permiteReferencia(tipo: TipoSocio): boolean;
}

export class PoliticaFlexible implements PoliticaPrestamo {
  permiteReferencia(tipo: TipoSocio): boolean {
    return tipo === "empleado";
  }
}

