import { Socio } from "./Socio";
import { Prestamo } from "./Prestamo";

interface PoliticaPrestamo {
  permitirPrestamo(socio: Socio, prestamosActuales: Prestamo[]): boolean;
}

class PoliticaEstricta implements PoliticaPrestamo {
  permitirPrestamo(socio: Socio, prestamosActuales: Prestamo[]): boolean {
    return prestamosActuales.length === 0;
  }
}

class PoliticaFlexible implements PoliticaPrestamo {
  permitirPrestamo(socio: Socio, prestamosActuales: Prestamo[]): boolean {
    return true;
  }
}

class PoliticaEstudiantil implements PoliticaPrestamo {
  permitirPrestamo(socio: Socio, prestamosActuales: Prestamo[]): boolean {
    return prestamosActuales.length < 5;
  }
}

class PoliticaDocente implements PoliticaPrestamo {
  permitirPrestamo(socio: Socio, prestamosActuales: Prestamo[]): boolean {
    return true; // siempre, con múltiples renovaciones
  }
}

export { PoliticaPrestamo, PoliticaEstricta, PoliticaFlexible, PoliticaEstudiantil, PoliticaDocente };
