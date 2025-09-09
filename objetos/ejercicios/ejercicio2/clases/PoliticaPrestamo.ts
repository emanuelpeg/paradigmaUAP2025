import { Socio } from "./Socio";
import { Libro } from "./Libro";

// Interfaz Strategy
export interface PoliticaPrestamo {
    puedePrestar(socio: Socio, libro: Libro): boolean;
    getDuracionPrestamo(socio: Socio): number;
}

// Estrategias concretas
export class PoliticaEstricta implements PoliticaPrestamo {
    puedePrestar(socio: Socio, libro: Libro): boolean {
        // No permite préstamos si hay libros vencidos
        return socio.prestamos.every(p => {
            const vencimiento = p.calcularVencimiento();
            return !vencimiento || vencimiento >= new Date();
        });
    }
    getDuracionPrestamo(socio: Socio): number {
        return socio.getDuracionPrestamo();
    }
}

export class PoliticaFlexible implements PoliticaPrestamo {
    puedePrestar(socio: Socio, libro: Libro): boolean {
        // Permite préstamos aunque haya vencidos
        return true;
    }
    getDuracionPrestamo(socio: Socio): number {
        // Si hay vencidos, período reducido
        const tieneVencidos = socio.prestamos.some(p => {
            const vencimiento = p.calcularVencimiento();
            return vencimiento && vencimiento < new Date();
        });
        return tieneVencidos ? 7 : socio.getDuracionPrestamo();
    }
}

export class PoliticaEstudiante implements PoliticaPrestamo {
    puedePrestar(socio: Socio, libro: Libro): boolean {
        return true;
    }
    getDuracionPrestamo(socio: Socio): number {
        // Período extendido durante exámenes
        return socio.getDuracionPrestamo() + 7;
    }
}

export class PoliticaDocente implements PoliticaPrestamo {
    puedePrestar(socio: Socio, libro: Libro): boolean {
        return true;
    }
    getDuracionPrestamo(socio: Socio): number {
        // Préstamos de larga duración
        return 60;
    }
}