import { Usuario } from "./UsuarioA";
import { Prestamo } from "./PrestamoA";

export interface PoliticaPrestamo {
  puedePrestar(usuario: Usuario, prestamos: Prestamo[]): boolean;
  periodoPrestamo(usuario: Usuario, prestamos: Prestamo[]): number;
}

export class PoliticaEstricta implements PoliticaPrestamo {
  puedePrestar(usuario: Usuario, prestamos: Prestamo[]): boolean {
    return prestamos.every(p => new Date() <= p.calcularVencimiento());
  }
  periodoPrestamo(usuario: Usuario, prestamos: Prestamo[]): number {
    return usuario.getPeriodoPrestamo();
  }
}

export class PoliticaFlexible implements PoliticaPrestamo {
  puedePrestar(usuario: Usuario, prestamos: Prestamo[]): boolean {
    return true;
  }
  periodoPrestamo(usuario: Usuario, prestamos: Prestamo[]): number {
    const hayVencidos = prestamos.some(p => new Date() > p.calcularVencimiento());
    return hayVencidos ? Math.max(7, usuario.getPeriodoPrestamo() - 7) : usuario.getPeriodoPrestamo();
  }
}

export class PoliticaEstudiante implements PoliticaPrestamo {
  puedePrestar(usuario: Usuario, prestamos: Prestamo[]): boolean {
    return true;
  }
  periodoPrestamo(usuario: Usuario, prestamos: Prestamo[]): number {
    return usuario.getPeriodoPrestamo() + 7;
  }
}

export class PoliticaDocente implements PoliticaPrestamo {
  puedePrestar(usuario: Usuario, prestamos: Prestamo[]): boolean {
    return true;
  }
  periodoPrestamo(usuario: Usuario, prestamos: Prestamo[]): number {
    return usuario.getPeriodoPrestamo() + 21;
  }
}