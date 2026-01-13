import { Libro } from "./Libro";
import { Socio, TipoSocio } from "./Socio";
interface PoliticaPrestamo {
    puedePrestar(socio: Socio): boolean;
    periodoPrestamo(socio: Socio): number;
}
export declare class PoliticaEstricta implements PoliticaPrestamo {
    puedePrestar(socio: Socio): boolean;
    periodoPrestamo(socio: Socio): number;
}
export declare class PoliticaFlexible implements PoliticaPrestamo {
    puedePrestar(socio: Socio): boolean;
    periodoPrestamo(socio: Socio): number;
}
export declare class PoliticaEstudiante implements PoliticaPrestamo {
    puedePrestar(socio: Socio): boolean;
    periodoPrestamo(socio: Socio): number;
}
export declare class PoliticaDocente implements PoliticaPrestamo {
    puedePrestar(socio: Socio): boolean;
    periodoPrestamo(socio: Socio): number;
}
export declare class Biblioteca {
    private eventos;
    private notificaciones;
    private inventario;
    private socios;
    private politicaPrestamo;
    agregarLibro(titulo: string, autor: any, isbn: string): Libro;
    buscarLibrosPorAutor(nombreAutor: string): Libro[];
    reservarLibro(socioId: number, libroISBN: string): void;
    buscarLibro(isbn: string): Libro | null;
    registrarSocio(tipo: TipoSocio, id: number, nombre: string, apellido: string): Socio;
    buscarSocio(id: number): Socio | null;
    retirarLibro(socioId: number, libroISBN: string): void;
    devolverLibro(socioId: number, libroISBN: string): void;
    agregarEvento(evento: any): void;
    obtenerNotificaciones(): string[];
    obtenerHistorialSocio(socioId: number): any[];
    obtenerRecomendacionesSocio(socioId: number): string[];
    setPoliticaPrestamo(politica: PoliticaPrestamo): void;
    prestarLibro(socioId: number, libroISBN: string, tipoPrestamo: string): void;
}
export interface IBuscable {
    buscarPor(criterio: any): any[];
    filtrar(condicion: (item: any) => boolean): any[];
}
export declare class CatalogoBiblioteca implements IBuscable {
    private libros;
    constructor(libros?: Libro[]);
    buscarPor(criterio: any): Libro[];
    filtrar(condicion: (item: Libro) => boolean): Libro[];
}
export declare class BibliotecaDigital implements IBuscable {
    private recursos;
    constructor(recursos?: any[]);
    buscarPor(criterio: any): any[];
    filtrar(condicion: (item: any) => boolean): any[];
}
export declare class ArchivoHistorico implements IBuscable {
    private documentos;
    constructor(documentos?: any[]);
    buscarPor(criterio: any): any[];
    filtrar(condicion: (item: any) => boolean): any[];
}
export {};
//# sourceMappingURL=Biblioteca.d.ts.map