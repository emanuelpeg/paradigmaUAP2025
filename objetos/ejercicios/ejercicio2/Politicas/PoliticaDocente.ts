import { IPoliticaPrestamo } from "../Interface/IPoliticaPrestamo"; 
import { Biblioteca } from "../clases/Biblioteca";
import { Socio } from "../clases/Socio";


export class PoliticaDocente implements IPoliticaPrestamo {
    constructor(private socio: Socio, private biblioteca: Biblioteca) {}

    getDiasPrestamo(): number {
        return 30; 
    }

    getTipoMulta(): string {
        return "Docente";
    }

    aplicarPolitica(): void {
       
        
        // Larga duración y múltiples renovaciones
        this.socio.setDuracionPrestamo(30); // 30 días
        this.socio.setRenovacionesPermitidas(5); // 5 renovaciones
        console.log(" Préstamo de larga duración con múltiples renovaciones");
    }

    verificarPermiso(): boolean {
        console.log(" Permiso concedido con política docente");
        return true;
    }
}