
import { Biblioteca } from "./Biblioteca";
import { Socio } from "./Socio";
import { Libro } from "./Libro";
import { TipoPrestamo } from "./Prestamos";

export interface PoliticaPrestamo {
  puedePrestar(ctx: Biblioteca, socio: Socio, libro: Libro, tipo: TipoPrestamo): boolean;
  ajustarDuracion(diasBase: number, ctx: Biblioteca, socio: Socio, fecha: Date): number;
}

export class PoliticaEstricta implements PoliticaPrestamo {
  puedePrestar(ctx: Biblioteca, socio: Socio, _libro: Libro, _tipo: TipoPrestamo): boolean {
    return !ctx.usuarioTieneVencidos(socio);
  }
  ajustarDuracion(diasBase: number): number { return diasBase; }
}

export class PoliticaFlexible implements PoliticaPrestamo {
  puedePrestar(_ctx: Biblioteca, _socio: Socio, _libro: Libro, _tipo: TipoPrestamo): boolean {
    return true;
  }
  ajustarDuracion(diasBase: number, ctx: Biblioteca, socio: Socio): number {
    return ctx.usuarioTieneVencidos(socio) ? Math.max(1, Math.ceil(diasBase / 2)) : diasBase;
  }
}

export class PoliticaEstudiante implements PoliticaPrestamo {
  puedePrestar(_ctx: Biblioteca, _socio: Socio, _libro: Libro, _tipo: TipoPrestamo): boolean {
    return true;
  }
  ajustarDuracion(diasBase: number, ctx: Biblioteca): number {
    return ctx.contexto.enExamenes ? diasBase + 7 : diasBase;
  }
}

export class PoliticaDocente implements PoliticaPrestamo {
  puedePrestar(_ctx: Biblioteca, _socio: Socio, _libro: Libro, _tipo: TipoPrestamo): boolean {
    return true;
  }
  ajustarDuracion(diasBase: number): number { return diasBase * 2; }
}
