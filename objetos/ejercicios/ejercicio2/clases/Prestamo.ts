import { Libro } from './Libro';

export abstract class Prestamo {
    constructor(public libro: Libro, public vencimiento: Date) {}

    get Vencimiento() {
        return this.vencimiento;
    }

    get Libro() {
        return this.libro;
    }
    abstract CalcularMulta(): number;
    abstract CalcularVencimiento(): Date;
}

export class PrestamoRegular extends Prestamo {
        CalcularVencimiento(): Date {
            return this.vencimiento;
        }
        CalcularMulta(): number {
            const hoy = new Date();
            if (hoy > this.vencimiento) {
                const diasAtrasados=hoy.getDate()-this.vencimiento.getDate();
                return diasAtrasados *50;
        }
            return 0;
        
    }
}

export class PrestamoCorto extends Prestamo {
    CalcularVencimiento(): Date {
        const vencimientoCorto = new Date();
        vencimientoCorto.setDate(vencimientoCorto.getDate() - 7);
        return vencimientoCorto;
    }
    CalcularMulta(): number {
        const hoy = new Date();
        if (hoy > this.vencimiento) {
            const diasAtrasados=hoy.getDate()-this.vencimiento.getDate();
            return (diasAtrasados *50)*2;
    }
        return 0;
    }
}

export class PrestamoReferencia extends Prestamo {
    CalcularVencimiento(): Date {
        return this.vencimiento;
    }
    CalcularMulta(): number {
        return 0;
    }
    puedeLLevarrAlaCasa(): boolean {
        return false;
    }
}

export class PrestamoDigital extends Prestamo {
    CalcularVencimiento(): Date {
        const hoy= new Date();
        hoy.setDate(hoy.getDate()+Infinity);
        return hoy;
    }
    CalcularMulta(): number {
        return 0;
    }
    EsDigital(): boolean {
        return true;
    }
}
