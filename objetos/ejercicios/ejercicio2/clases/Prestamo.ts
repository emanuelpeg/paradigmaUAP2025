import { Libro } from "./Libro";
import { IPoliticaPrestamo } from "../Interface/IPoliticaPrestamo";
export abstract class Prestamo {
    protected diasPrestamo: number;
    protected tipoMulta: string;
    protected politica: IPoliticaPrestamo;
    constructor(
        protected libro: Libro,
        protected fechaPrestamo: Date = new Date(),
        politica: IPoliticaPrestamo
    ) {}
    getLibro(): Libro {
        return this.libro;
    }
    getFechaPrestamo(): Date {
        return this.fechaPrestamo;
    }
   
    abstract calcularMulta(): number;

    
    calcularVencimiento(diasPrestamo: number): Date {
        const vencimiento = new Date(this.fechaPrestamo);
        vencimiento.setDate(vencimiento.getDate() + diasPrestamo);
        return vencimiento;
    }

    
    estaVencido(): boolean {
        return new Date() > this.calcularVencimiento(this.obtenerDiasPrestamo());
    }

    getPolitica(): IPoliticaPrestamo {
        return this.politica;
    }

    setPolitica(nuevaPolitica: IPoliticaPrestamo): void {
        this.politica = nuevaPolitica;
        this.politica.aplicarPolitica(this);
        this.diasPrestamo = this.politica.getDiasPrestamo();
        this.tipoMulta = this.politica.getTipoMulta();
    }


    
    protected abstract obtenerDiasPrestamo(): number;
}

export class PrestamoRegular extends Prestamo {
     constructor(libro: Libro, politica: IPoliticaPrestamo) {
        super(libro, new Date(), politica);
    }
    protected obtenerDiasPrestamo(): number {
        return 14;
    }

    calcularMulta(): number {
        if (!this.estaVencido()) return 0;
        
        const diasVencido = Math.floor((new Date().getTime() - 
            this.calcularVencimiento(14).getTime()) / (1000 * 60 * 60 * 24));
        
        return diasVencido * 50; 
    }
}

export class PrestamoCorto extends Prestamo {
    constructor(libro: Libro, politica: IPoliticaPrestamo) {
        super(libro, new Date(), politica);
    }
    protected obtenerDiasPrestamo(): number {
        return 7;
    }

    calcularMulta(): number {
        
        if (!this.estaVencido()) return 0;
        
        const diasVencido = Math.floor((new Date().getTime() - 
            this.calcularVencimiento(7).getTime()) / (1000 * 60 * 60 * 24));
        
        return diasVencido * 100; // $10 por día (doble multa)
    }
}

export class PrestamoReferencia extends Prestamo {
    
    constructor(libro: Libro, politica: IPoliticaPrestamo) {
        super(libro, new Date(), politica);
    }
    protected obtenerDiasPrestamo(): number {
        return 0; // No se lleva a casa
    }

    calcularMulta(): number {
        return 0; // Nunca tiene multa
    }

    // Override para indicar que no es préstamo externo
    estaVencido(): boolean {
        return false;
    }
}

export class PrestamoDigital extends Prestamo {
     constructor(libro: Libro, politica: IPoliticaPrestamo) {
        super(libro, new Date(), politica);
    }
    protected obtenerDiasPrestamo(): number {
        return Infinity; // Sin límite de tiempo
    }

    calcularMulta(): number {
        return 0; // Sin multa
    }

    estaVencido(): boolean {
        return false; // Nunca vence
    }
}
export enum TipoPrestamo {
  REGULAR = "regular",
  CORTO = "corto", 
  REFERENCIA = "referencia",
  DIGITAL = "digital"
}

export class PrestamoFactory {
    static crearPrestamo(tipo: TipoPrestamo, libro: Libro, politica: IPoliticaPrestamo): Prestamo {
        switch (tipo) {
            case TipoPrestamo.REGULAR:
                return new PrestamoRegular(libro, politica);
            case TipoPrestamo.CORTO:
                return new PrestamoCorto(libro, politica);
            case TipoPrestamo.REFERENCIA:
                return new PrestamoReferencia(libro, politica);
            case TipoPrestamo.DIGITAL:
                return new PrestamoDigital(libro, politica);
            default:
                throw new Error("Tipo de préstamo no válido");
        }
    }
}