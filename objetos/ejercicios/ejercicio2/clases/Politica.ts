import { Socio, Visitante } from "./Socio";

export interface PoliticaPrestamo {
  puedePrestar(socio: Socio): boolean;

  calcularDuracion(socio: Socio): number;
}

export class PoliticaEstricta implements PoliticaPrestamo {
  puedePrestar(socio: Socio): boolean {
    if (socio instanceof Visitante) return false;
    // Si alguno de sus préstamos está vencido hoy, no puede
    const hoy = new Date();
    return socio.getPrestamos().every(p => {
      const v = p.calcularVencimiento();
      return !v || v >= hoy;
    });
  }
  calcularDuracion(_socio: Socio): number {
    return 14;
  }
}

export class PoliticaFlexible implements PoliticaPrestamo {
  puedePrestar(socio: Socio): boolean {
    const hoy = new Date();
    let atrasos = 0;
    for (const p of socio.getPrestamos()) {
      const v = p.calcularVencimiento();
      if (v && hoy > v) {
        const dias = Math.ceil((+hoy - +v) / (1000 * 60 * 60 * 24));
        if (dias > 3) return false;
        atrasos++;
      }
    }
    return atrasos <= 1;
  }
  calcularDuracion(socio: Socio): number {
    // VIP tendrá 28, resto 14. (No importamos la clase para evitar dependencia circular)
    return (socio.constructor.name === "SocioVIP") ? 28 : 14;
  }
}

export class PoliticaIlimitada implements PoliticaPrestamo {
  puedePrestar(_socio: Socio): boolean { return true; }
  calcularDuracion(_socio: Socio): number { return 0; }
}
