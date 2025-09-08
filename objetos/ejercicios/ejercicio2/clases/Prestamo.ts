
import { Libro } from "./Libro";
import { Socio } from "./Socio";


abstract class Multa {
    abstract calcular(diasAtrasado: number): number;
}

class MultaEstandar extends Multa {
    calcular(diasAtrasado: number): number {
       const montoPorDia = 10;
       return diasAtrasado > 0 ? diasAtrasado * montoPorDia : 0; //Si no tiene dia atrasado, retorna 0
    }
}

class MultaDoble extends Multa {
    calcular(diasAtrasado: number): number {
        const montoPorDia = 20; //Doble que la milta estándar
        return diasAtrasado > 0 ? diasAtrasado * montoPorDia : 0;
    }
}

class SinMulta extends Multa {
    calcular(diasAtrasado: number): number {
        return 0;
    }
}

class Prestamo {
    constructor( public socio: Socio, public libro: Libro, public vencimiento: Date) {}
    calcularVencimiento(){}
    
}

abstract class prestamoBase
{
    abstract calcularVencimiento();
    abstract calcularMulta(diasAtrasado: number): number;
}

class PrestamoRegular extends prestamoBase
{
        calcularVencimiento(): Date {
        const hoy = new Date();
        const vencimiento = new Date(hoy);
        vencimiento.setDate(hoy.getDate() + 14); //A la fecha de hoy le sumo 14 días
        return vencimiento;
    }

    calcularMulta(diasAtrasado: number): number {
        const multa = new MultaEstandar();
        return multa.calcular(diasAtrasado);
    }

}

class PrestamoCorto extends prestamoBase
{
    calcularVencimiento(): Date{
        const hoy = new Date();
        const vencimiento = new Date(hoy);
        vencimiento.setDate(hoy.getDate() + 7); //A la fecha de hoy le sumo 7 días
        return vencimiento;
    }

    calcularMulta(diasAtrasado: number): number{
        const multa = new MultaDoble();
        return multa.calcular(diasAtrasado);
    }
}

class PrestamoReferencia extends prestamoBase
{
    calcularVencimiento(): null{
        return null;
    }
    calcularMulta(diasAtrasado: number): number{
        return 0;
    }
}

class PrestamoDigital extends prestamoBase
{

    calcularVencimiento(): null{
        return null;
    }
    calcularMulta(diasAtrasado: number): number{
        return 0;
    }
    
}


export {Prestamo};
export {PrestamoRegular};



   