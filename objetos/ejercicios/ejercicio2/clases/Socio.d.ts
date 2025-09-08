import { Libro } from "./Libro";
/** Duracion en dias de un prestamo */
type Duracion = number;
export declare abstract class Socio {
    private _id;
    private _nombre;
    private _apellido;
    protected prestamos: Prestamo[];
    protected multasPendientes: number;
    protected historialLectura: Libro[];
    protected reservas: Libro[];
    /** Devuelve la lista de préstamos activos */
    getPrestamos(): Prestamo[];
    constructor(_id: number, _nombre: string, _apellido: string);
    get id(): number;
    get nombre(): string;
    get apellido(): string;
    get nombreCompleto(): string;
    get deuda(): number;
    abstract getDuracionPrestamo(): Duracion;
    abstract getMaximoLibros(): number;
    retirar(libro: Libro, tipo?: "regular" | "corto" | "referencia" | "digital"): void;
    devolver(libro: Libro): Prestamo;
    tienePrestadoLibro(libro: Libro): Prestamo | null;
    get librosEnPrestamo(): number;
    puedeRetirar(libro: Libro): boolean;
    registrarMulta(monto: number): void;
    pagarMulta(monto: number): void;
    agregarReserva(libro: Libro): void;
    obtenerHistorialLectura(): Libro[];
    recomendacionesSimples(): string[];
}
export declare class SocioRegular extends Socio {
    getDuracionPrestamo(): Duracion;
    getMaximoLibros(): number;
    devolver(libro: Libro): Prestamo;
}
export declare class SocioVIP extends Socio {
    getDuracionPrestamo(): Duracion;
    getMaximoLibros(): number;
}
export declare class Empleado extends Socio {
    getDuracionPrestamo(): Duracion;
    getMaximoLibros(): number;
}
export declare class Visitante extends Socio {
    puedeRetirar(libro: Libro): boolean;
    getDuracionPrestamo(): Duracion;
    getMaximoLibros(): number;
}
export declare enum TipoSocio {
    REGULAR = "regular",
    VIP = "vip",
    EMPLEADO = "empleado",
    VISITANTE = "visitante"
}
export declare abstract class Prestamo {
    libro: Libro;
    socio: Socio;
    constructor(libro: Libro, socio: Socio);
    abstract get vencimiento(): Date | null;
    abstract calcularMulta(diasAtraso: number): number;
}
export declare class PrestamoRegular extends Prestamo {
    get vencimiento(): Date;
    calcularMulta(diasAtraso: number): number;
}
export declare class PrestamoCorto extends Prestamo {
    get vencimiento(): Date;
    calcularMulta(diasAtraso: number): number;
}
export declare class PrestamoReferencia extends Prestamo {
    get vencimiento(): null;
    calcularMulta(): number;
}
export declare class PrestamoDigital extends Prestamo {
    get vencimiento(): null;
    calcularMulta(): number;
}
export declare class SocioFactory {
    static crearSocio(tipo: TipoSocio, id: number, nombre: string, apellido: string): Socio;
}
export {};
//# sourceMappingURL=Socio.d.ts.map