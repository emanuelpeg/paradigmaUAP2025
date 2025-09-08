import { Libro } from "./Libro";
import { Socio } from "./Socio";

export abstract class PrestamoBase {
    protected fechaInicio: Date;
    protected vencimiento: Date;
    constructor(private libro: Libro, private socio: Socio) {
        this.fechaInicio = new Date();
        this.vencimiento = this.calcularVencimiento();
    }
    get getLibro() { return this.libro; }
    get getSocio() { return this.socio;}
    getFechaInicio(): Date { return this.fechaInicio; }
    getFechaVencimiento(): Date { return this.vencimiento; }
    setFechaVencimiento(fecha: Date) { this.vencimiento = fecha; }
    estaVencido(): boolean { return new Date() > this.vencimiento; }
    diasRetraso(): number {
        if (!this.estaVencido()) return 0;
        const msPorDia = 1000 * 60 * 60 * 24;
        return Math.floor(
        (new Date().getTime() - this.vencimiento.getTime()) / msPorDia);
    }
    abstract calcularVencimiento(): Date;
    abstract calcularMulta(): number;
}

export class PrestamoRegular extends PrestamoBase
{
    calcularVencimiento(): Date {
        const venc = new Date(this.fechaInicio);
        venc.setDate(venc.getDate() + 14)
        return venc;
    }
    calcularMulta(): number {
        return this.diasRetraso() * 50;
    }
}
export class PrestamoCorto extends PrestamoBase
{
    calcularVencimiento(): Date {
        const venc = new Date(this.fechaInicio);
        venc.setDate(venc.getDate() + 7);
        return venc;
    }
    calcularMulta(): number { return this.diasRetraso() * 100; }
}
export class PrestamoReferencia extends PrestamoBase
{
    calcularVencimiento(): Date { return new Date(); }
    calcularMulta(): number { return 0; }
}
export class PrestamoDigital extends PrestamoBase
{
    calcularVencimiento(): Date { return new Date(); }
    calcularMulta(): number { return 0; }
}
export class PrestamoLargo extends PrestamoBase
{
    calcularVencimiento(): Date {
        const venc = new Date(this.fechaInicio);
        venc.setDate(venc.getDate() + 30);
        return venc;
    }
    calcularMulta(): number { return this.diasRetraso() * 20; }
}

export enum TipoPrestamo {
    REGULAR = "regular",
    CORTO = "corto",
    REFERENCIA = "referencia",
    DIGITAL = "digital",
    LARGO = "largo"
}

export class PrestamoFactory {
    static crearPrestamo(
        tipo: TipoPrestamo,
        libro: Libro,
        socio: Socio
    ): PrestamoBase {
    switch (tipo)
    {
        case TipoPrestamo.REGULAR:
            return new PrestamoRegular(libro, socio);
        case TipoPrestamo.CORTO:
            return new PrestamoCorto(libro, socio);
        case TipoPrestamo.REFERENCIA:
            return new PrestamoReferencia(libro, socio);
        case TipoPrestamo.DIGITAL:
            return new PrestamoDigital(libro, socio);
        case TipoPrestamo.LARGO:
            return new PrestamoLargo(libro, socio);
        default:
            throw new Error("Tipo de préstamo no valido");
        }
    }
}

export class Prestamo extends PrestamoBase{
    calcularVencimiento(): Date {
        const venc = new Date(this.fechaInicio);
        const duracionPrestamo = this.getSocio.getDuracionPrestamo();
        venc.setDate(venc.getDate() + duracionPrestamo);
        return venc;
    }
    calcularMulta(): number {
        return 0; // Los socios que van a implementar Prestamo en ningún caso pueden tener multas 
    }
}