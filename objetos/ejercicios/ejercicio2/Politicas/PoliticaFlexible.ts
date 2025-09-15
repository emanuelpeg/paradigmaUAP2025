import { IPoliticaPrestamo } from "../Interface/IPoliticaPrestamo";
import { Biblioteca } from "../clases/Biblioteca";
import { Socio } from "../clases/Socio";


export class PoliticaFlexible implements IPoliticaPrestamo {
    constructor(private socio: Socio, private biblioteca: Biblioteca) {}
     getDiasPrestamo(): number {
        return 30; 
    }

    getTipoMulta(): string {
        return "Flexible";
    }

    aplicarPolitica(): void {
        console.log("Aplicando política flexible...");
        
        const tieneVencidos = this.socio.tienePrestamosVencidos();
        if (tieneVencidos) {
            
            this.socio.setDuracionPrestamo(7); 
            console.log(" Período reducido por tener libros vencidos");
        }
    }

    verificarPermiso(): boolean {
        console.log("Permiso concedido con política flexible");
        return true; 
    }
}