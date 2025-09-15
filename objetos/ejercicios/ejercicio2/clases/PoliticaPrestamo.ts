import { Socio } from "./Socio";
import { Libro } from "./Libro";

export interface PoliticaPrestamo {
    puedePrestar(socio: Socio, libro: Libro): boolean;
    getDuracionPrestamo(socio: Socio): number;
}

export class PoliticaEstricta implements PoliticaPrestamo {
    puedePrestar(socio: Socio, libro: Libro): boolean {
        return socio.getPrestamos().every(p => !p.estaVencido());
    }
    getDuracionPrestamo(socio: Socio): number {
        return socio.getDuracionPrestamo();
    }
}

export class PoliticaFlexible implements PoliticaPrestamo {
    puedePrestar(socio: Socio, libro: Libro): boolean {
        return true;
    }
    getDuracionPrestamo(socio: Socio): number {
        const tieneVencidos = socio.getPrestamos().some(p => p.estaVencido());
        return tieneVencidos ? Math.max(7, socio.getDuracionPrestamo() - 7) : socio.getDuracionPrestamo();
    }
}

export class PoliticaEstudiante implements PoliticaPrestamo {
    private enExamenes: boolean;
    constructor(enExamenes: boolean = false) {
        this.enExamenes = enExamenes;
    }
    puedePrestar(socio: Socio, libro: Libro): boolean {
        return true;
    }
    getDuracionPrestamo(socio: Socio): number {
        return this.enExamenes ? socio.getDuracionPrestamo() + 7 : socio.getDuracionPrestamo();
    }
    setExamenes(valor: boolean) {
        this.enExamenes = valor;
    }
}

export class PoliticaDocente implements PoliticaPrestamo {
    puedePrestar(socio: Socio, libro: Libro): boolean {
        return true;
    }
    getDuracionPrestamo(socio: Socio): number {
        return socio.getDuracionPrestamo() + 21;
    }
}