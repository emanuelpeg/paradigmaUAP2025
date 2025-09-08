import { Socio } from "./Socio";

export interface PoliticaPrestamo {
  nombre: string;
  puedePrestar(socio: Socio): { permitido: boolean; diasExtra?: number; motivo?: string };
}

export class PoliticaEstricta implements PoliticaPrestamo {
  nombre = "Estricta";
  puedePrestar(socio: Socio) {
    const tieneVencidos = socio.prestamos.some(p => {
      const v = p.calcularVencimiento();
      return v && +v < Date.now();
    });
    if (socio.deudaPendiente > 0) return { permitido: false, motivo: "Deuda pendiente" };
    if (tieneVencidos) return { permitido: false, motivo: "Libros vencidos" };
    return { permitido: true };
  }
}

export class PoliticaFlexible implements PoliticaPrestamo {
  nombre = "Flexible";
  puedePrestar(socio: Socio) {
    const tieneVencidos = socio.prestamos.some(p => {
      const v = p.calcularVencimiento();
      return v && +v < Date.now();
    });
    if (tieneVencidos || socio.deudaPendiente > 0) return { permitido: true, diasExtra: -7 };
    return { permitido: true };
  }
}

export class PoliticaEstudiante implements PoliticaPrestamo {
  nombre = "Estudiante";
  puedePrestar() { return { permitido: true, diasExtra: +7 }; }
}

export class PoliticaDocente implements PoliticaPrestamo {
  nombre = "Docente";
  puedePrestar() { return { permitido: true, diasExtra: +14 }; }
}
