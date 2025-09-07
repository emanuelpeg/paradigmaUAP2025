import { Usuario } from "../modelos/Usuario";
import { Prestamo } from "../modelos/Prestamo";

export interface PoliticaPrestamo {
  permitirPrestamo(usuario: Usuario, prestamos: Prestamo[]): boolean;
  diasPrestamoBase(usuario: Usuario): number;
}

export class PoliticaEstricta implements PoliticaPrestamo {
  permitirPrestamo(_usuario: Usuario, prestamos: Prestamo[]): boolean {
    return prestamos.every(p => {
      const venc = p.calcularVencimiento();
      return !venc || venc >= new Date();
    });
  }
  diasPrestamoBase(usuario: Usuario): number {
    return usuario.periodoPrestamo();
  }
}

export class PoliticaFlexible implements PoliticaPrestamo {
  permitirPrestamo(_usuario: Usuario): boolean {
    return true; // siempre permite
  }
  diasPrestamoBase(usuario: Usuario): number {
    return usuario.periodoPrestamo() - 7; // reduce si hay vencidos
  }
}

export class PoliticaEstudiante implements PoliticaPrestamo {
  permitirPrestamo(): boolean { return true; }
  diasPrestamoBase(usuario: Usuario): number {
    return usuario.periodoPrestamo() + 7; // más días en examenes
  }
}

export class PoliticaDocente implements PoliticaPrestamo {
  permitirPrestamo(): boolean { return true; }
  diasPrestamoBase(usuario: Usuario): number {
    return usuario.periodoPrestamo() + 30; // super extendido
  }
}
