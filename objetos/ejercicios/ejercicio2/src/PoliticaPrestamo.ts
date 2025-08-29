import { Usuario } from './Usuario';

export interface PoliticaPrestamo {
    puedePrestar(usuario: Usuario, librosVencidos: number): boolean;
    calcularPeriodoPrestamo(diasEstandar: number): number;
}

export class PoliticaEstricta implements PoliticaPrestamo {
    puedePrestar(usuario: Usuario, librosVencidos: number): boolean {
        return librosVencidos === 0;
    }

    calcularPeriodoPrestamo(diasEstandar: number): number {
        return diasEstandar;
    }
}

export class PoliticaFlexible implements PoliticaPrestamo {
    puedePrestar(usuario: Usuario, librosVencidos: number): boolean {
        return librosVencidos < 3;
    }

    calcularPeriodoPrestamo(diasEstandar: number): number {
        return Math.floor(diasEstandar / 2);
    }
}

export class PoliticaEstudiante implements PoliticaPrestamo {
    private esEpocaExamenes(): boolean {
        const mes = new Date().getMonth();
        return mes === 6 || mes === 11; // Julio y Diciembre
    }

    puedePrestar(usuario: Usuario, librosVencidos: number): boolean {
        return librosVencidos < 2;
    }

    calcularPeriodoPrestamo(diasEstandar: number): number {
        return this.esEpocaExamenes() ? diasEstandar * 2 : diasEstandar;
    }
}

export class PoliticaDocente implements PoliticaPrestamo {
    puedePrestar(usuario: Usuario, librosVencidos: number): boolean {
        return librosVencidos < 5;
    }

    calcularPeriodoPrestamo(diasEstandar: number): number {
        return diasEstandar * 3;
    }
}
