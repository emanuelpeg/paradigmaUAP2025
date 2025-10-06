import { Libro } from "../Libro";
import { Prestamo, PrestamoFactory, TipoPrestamo } from "./Prestamo";
import { PrestamoStrategy } from "./PrestamoStrategy";
import { Socio } from "../Socio";

export class PoliticaPrestamoEstricta extends PrestamoStrategy {
    validarIncremento(socio: Socio): boolean {
        return !this.tieneVencidos(socio);
    }

    conseguirIncremento(): number {
        return 0; // se le agregan 0 dias
    }

    puedeRenovar(): boolean {
        return false;
    }
}

export class PoliticaPrestamoFlexible extends PrestamoStrategy {
    validarIncremento(): boolean {
        return true;
    }

    conseguirIncremento(socio: Socio): number {
        return this.tieneVencidos(socio) ? -2 : 0; // -2 days if the user has books vencidos
    }

    puedeRenovar(): boolean {
        return false;
    }
}

export class PoliticaEstudiante extends PrestamoStrategy {
    validarIncremento(): boolean {
        return true;
    }

    conseguirIncremento(socio: Socio, tiempoExamenes: boolean): number {
        return tiempoExamenes ? 5 : 0; // incremento de 5 dias si es tiempo de examen
    }

    puedeRenovar(): boolean {
        return false;
    }
}

export class PoliticaDocente extends PrestamoStrategy {
    validarIncremento(): boolean {
        return true;
    }

    conseguirIncremento(): number {
        return 10; // incremento de 10 dias si es tiempo de examen
    }

    puedeRenovar(): boolean {
        return true;
    }
}