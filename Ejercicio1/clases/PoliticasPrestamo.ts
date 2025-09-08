import { Socio } from "./Socio";
import { Libro } from "./Libro";
import { TipoPrestamo } from "./Prestamo";

export type AjustePrestamo = {
  tipo: TipoPrestamo;
  diasRegular: number;
};

export type ContextoPrestamo = {
  duracionBase: number;
  multaBase: number;
  epocaExamenes: boolean;
  socioTieneVencidos: (socio: Socio) => boolean;
};

export interface PoliticaPrestamo {
  puedePrestar(socio: Socio, libro: Libro, ctx: ContextoPrestamo): { permitido: boolean; motivo?: string };
  ajustarPrestamo(socio: Socio, libro: Libro, ctx: ContextoPrestamo, base: AjustePrestamo): AjustePrestamo;
  renovacionesPermitidas?(socio: Socio, libro: Libro, ctx: ContextoPrestamo): number;
}

export class PoliticaEstricta implements PoliticaPrestamo {
  puedePrestar(socio: Socio, _libro: Libro, ctx: ContextoPrestamo) {
    if (ctx.socioTieneVencidos(socio)) {
      return { permitido: false, motivo: "No se permiten préstamos con libros vencidos (política estricta)" };
    }
    return { permitido: true };
  }

  ajustarPrestamo(_socio: Socio, _libro: Libro, _ctx: ContextoPrestamo, base: AjustePrestamo): AjustePrestamo {
    return base; // sin cambios
  }
}

export class PoliticaFlexible implements PoliticaPrestamo {
  puedePrestar(_socio: Socio, _libro: Libro, _ctx: ContextoPrestamo) {
    return { permitido: true };
  }

  ajustarPrestamo(socio: Socio, _libro: Libro, ctx: ContextoPrestamo, base: AjustePrestamo): AjustePrestamo {
    if (ctx.socioTieneVencidos(socio)) {
      return { ...base, diasRegular: Math.max(3, Math.floor(base.diasRegular / 2)) };
    }
    return base;
  }
}

export class PoliticaEstudiante implements PoliticaPrestamo {
  puedePrestar(_socio: Socio, _libro: Libro, _ctx: ContextoPrestamo) {
    return { permitido: true };
  }

  ajustarPrestamo(_socio: Socio, _libro: Libro, ctx: ContextoPrestamo, base: AjustePrestamo): AjustePrestamo {
    if (ctx.epocaExamenes) {
      return { ...base, diasRegular: base.diasRegular + 7 };
    }
    return base;
  }
}

export class PoliticaDocente implements PoliticaPrestamo {
  puedePrestar(_socio: Socio, _libro: Libro, _ctx: ContextoPrestamo) {
    return { permitido: true };
  }

  ajustarPrestamo(_socio: Socio, _libro: Libro, _ctx: ContextoPrestamo, base: AjustePrestamo): AjustePrestamo {
    return { ...base, diasRegular: base.diasRegular + 14 };
  }

  renovacionesPermitidas(): number {
    return 3;
  }
}
