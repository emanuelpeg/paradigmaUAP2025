import { Prestamo } from "../clases/Prestamo";
export interface IPoliticaPrestamo {
    aplicarPolitica()   : void;
    aplicarPolitica(prestamo: Prestamo): void;
    verificarPermiso(prestamo: Prestamo): boolean;
    getDiasPrestamo(): number;
    getTipoMulta(): string;
    verificarPermiso():boolean;
}


