import { IPoliticaPrestamo } from "../Interface/IPoliticaPrestamo";
import { Biblioteca } from "../clases/Biblioteca";
import { Socio } from "../clases/Socio";

export class PoliticaEstudiante implements IPoliticaPrestamo {
    constructor(private socio: Socio, private biblioteca: Biblioteca) {}
     getDiasPrestamo(): number {
        return 14; 
    }

    getTipoMulta(): string {
        return "Estudiante";
    }

    aplicarPolitica(): void {
        console.log(" Aplicando política estudiantil...");
        
        if (this.estaEnEpocaExamenes()) {
            
            this.socio.setDuracionPrestamo(21); 
            console.log(" Período extendido por época de exámenes");
        }
    }

    verificarPermiso(): boolean {
        console.log("Permiso concedido con política estudiantil");
        return true;
    }

    private estaEnEpocaExamenes(): boolean {
        const mesActual = new Date().getMonth();
        // Épocas de exámenes: Marzo, Julio, Noviembre
        return mesActual === 2 || mesActual === 6 || mesActual === 10;
    }
}