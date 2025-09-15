export interface IUsuario {
    tienePrestamosVencidos(): boolean;
    setDuracionPrestamo(dias: number): void;
    setRenovacionesPermitidas(veces: number): void;
    getRenovacionesPermitidas(): number;
}