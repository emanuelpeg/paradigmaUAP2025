import { IPoliticaPrestamo } from "../Interface/IPoliticaPrestamo";
import { Biblioteca } from "../clases/Biblioteca";
import { Socio } from "../clases/Socio";

export class PoliticaEstricta implements IPoliticaPrestamo {
    constructor(private socio: Socio, private biblioteca: Biblioteca) {}

     getDiasPrestamo(): number {
        return 14; 
    }

    getTipoMulta(): string {
        return "Estricta";
    }


    aplicarPolitica(): void {
        console.log("Aplicando política estricta...");
        
    }

    verificarPermiso(): boolean {
        const tieneVencidos = this.socio.tienePrestamosVencidos();
        if (tieneVencidos) {
            console.log(" Tiene libros vencidos");
            return false;
        }
        console.log("Permiso concedido con política estricta");
        return true;
    }
}