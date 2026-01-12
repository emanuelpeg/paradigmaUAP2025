import { Socio } from "./Socio";

export interface PoliticaPrestamo {
  puedeRetirar(socio: Socio): boolean;
  tipoPrestamoPorDefecto(
    socio: Socio,
    tipoSolicitado?: "regular" | "corto" | "referencia" | "digital"
  ): "regular" | "corto" | "referencia" | "digital";
}

export class PoliticaEstricta implements PoliticaPrestamo {
  puedeRetirar(socio: Socio): boolean {
    const hoy = new Date();
    return socio["prestamos"].every((p: any) => {
      const venc = p.calcularVencimiento?.();
      return !venc || venc >= hoy;
    });
  }
  tipoPrestamoPorDefecto(_socio: Socio, tipoSolicitado?: any) {
    return tipoSolicitado ?? "regular";
  }
}

export class PoliticaFlexible implements PoliticaPrestamo {
  puedeRetirar(_socio: Socio): boolean {
    return true;
  }
  tipoPrestamoPorDefecto(socio: Socio, tipoSolicitado?: any) {
    const hoy = new Date();
    const tieneVencidos = socio["prestamos"].some((p: any) => {
      const venc = p.calcularVencimiento?.();
      return venc && venc < hoy;
    });
    if (tieneVencidos) return "corto";
    return tipoSolicitado ?? "regular";
  }
}

export class PoliticaEstudiante implements PoliticaPrestamo {
  puedeRetirar(_socio: Socio): boolean {
    return true;
  }
  tipoPrestamoPorDefecto(_socio: Socio, tipoSolicitado?: any) {
    const ahora = new Date();
    if (ahora.getMonth() === 8) return "digital";
    return tipoSolicitado ?? "regular";
  }
}

export class PoliticaDocente implements PoliticaPrestamo {
  puedeRetirar(_socio: Socio): boolean {
    return true;
  }
  tipoPrestamoPorDefecto(_socio: Socio, _tipoSolicitado?: "regular" | "corto" | "referencia" | "digital") : "regular" | "corto" | "referencia" | "digital" {
    return "digital";
  }
}
