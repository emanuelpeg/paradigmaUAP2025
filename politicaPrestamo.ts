import { Socio } from "./socio";
import { Libro } from "./Libro";
import { Prestamo } from "./prestamo";

export interface IPoliticaPrestamo {
    esPrestamoPermitido(socio: Socio, libro: Libro): boolean;
}

export class PoliticaEstricta implements IPoliticaPrestamo {
    esPrestamoPermitido(socio: Socio, libro: Libro): boolean {
        if (socio.tieneLibrosVencidos()) {
            return false;
        }
        return socio.puedeRetirar(libro);
    }
}

export class PoliticaFlexible implements IPoliticaPrestamo {
    esPrestamoPermitido(socio: Socio, libro: Libro): boolean {
        return socio.puedeRetirar(libro);
    }
}

export class PoliticaEstudiante implements IPoliticaPrestamo {
    esPrestamoPermitido(socio: Socio, libro: Libro): boolean {
        // Lógica para período extendido durante exámenes
        return socio.puedeRetirar(libro);
    }
}

export class PoliticaDocente implements IPoliticaPrestamo {
    esPrestamoPermitido(socio: Socio, libro: Libro): boolean {
        // Lógica para préstamos de larga duración y múltiples renovaciones
        return socio.puedeRetirar(libro);
    }
}