interface PoliticaPrestamo {
    puedePrestar(usuario: string, librosVencidos: number): boolean;
    calcularPeriodoPrestamo(diasEstandar: number): number;
    permiteRenovacion(): boolean;
}

class PoliticaEstricta implements PoliticaPrestamo {
    puedePrestar(usuario: string, librosVencidos: number): boolean {
        return librosVencidos === 0;
    }

    calcularPeriodoPrestamo(diasEstandar: number): number {
        return diasEstandar;
    }

    permiteRenovacion(): boolean {
        return false;
    }
}

class PoliticaFlexible implements PoliticaPrestamo {
    puedePrestar(usuario: string, librosVencidos: number): boolean {
        return true;
    }

    calcularPeriodoPrestamo(diasEstandar: number): number {
        return diasEstandar / 2; // Período reducido
    }

    permiteRenovacion(): boolean {
        return true;
    }
}

class PoliticaEstudiante implements PoliticaPrestamo {
    private esEpocaExamenes(): boolean {
        const mes = new Date().getMonth();
        return mes === 6 || mes === 11; // Julio y Diciembre
    }

    puedePrestar(usuario: string, librosVencidos: number): boolean {
        return librosVencidos < 3;
    }

    calcularPeriodoPrestamo(diasEstandar: number): number {
        return this.esEpocaExamenes() ? diasEstandar * 2 : diasEstandar;
    }

    permiteRenovacion(): boolean {
        return this.esEpocaExamenes();
    }
}

class PoliticaDocente implements PoliticaPrestamo {
    puedePrestar(usuario: string, librosVencidos: number): boolean {
        return true;
    }

    calcularPeriodoPrestamo(diasEstandar: number): number {
        return diasEstandar * 3; // Triple de tiempo
    }

    permiteRenovacion(): boolean {
        return true;
    }
}

export { PoliticaPrestamo, PoliticaEstricta, PoliticaFlexible, PoliticaEstudiante, PoliticaDocente };
