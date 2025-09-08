import { Libro } from "./Libro";
import { Socio } from "./Socio";
export class Prestamo {
    protected fechaInicio: Date;
    protected vencimiento: Date;
    constructor(public libro: Libro, public socio: Socio) {
        this.fechaInicio = new Date();
        this.vencimiento = this.calcularVencimiento();
    }

    get obtenerLibro() { return this.libro }
    get obtenerSocio() { return this.socio }
    getFechaInicio(): Date {
        return this.fechaInicio;
    }
    getFechaVencimiento(): Date {
        return this.vencimiento
    }
    estaVencido(): boolean {
        return new Date() > this.vencimiento;
    }
    diasRetraso(): number {
        if (!this.estaVencido()) return 0;
        const msPorDia = 1000 * 60 * 60 * 24;
        return Math.floor(
        (new Date().getTime() - this.vencimiento.getTime()) / msPorDia);
    }
    calcularVencimiento(): Date {
        const venc = new Date(this.vencimiento);
        venc.setDate(venc.getDate()+14);
        return venc;
    }
}