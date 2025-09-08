export declare class Libro {
    private _titulo;
    private _autor;
    private _isbn;
    private reservas;
    private notificaciones;
    constructor(_titulo: string, _autor: any, // Cambia a objeto Autor si existe
    _isbn: string);
    get titulo(): string;
    get autor(): any;
    get isbn(): string;
    agregarReserva(socio: any): void;
    tieneReservas(): boolean;
    obtenerProximaReserva(): any;
    notificarDisponibilidad(): void;
    obtenerNotificaciones(): string[];
}
//# sourceMappingURL=Libro.d.ts.map