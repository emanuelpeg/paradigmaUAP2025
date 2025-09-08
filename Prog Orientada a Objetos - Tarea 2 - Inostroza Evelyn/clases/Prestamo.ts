import { Libro } from "./Libro";

export abstract class Prestamo {
  constructor(public libro: Libro, public fechaInicio: Date) {}
  abstract calcularVencimiento(): Date | null;
  abstract calcularMulta(fechaActual: Date): number;
}

export class PrestamoRegular extends Prestamo {
  private dias = 14;
  calcularVencimiento() { 
    const d = new Date(this.fechaInicio);
    d.setDate(d.getDate() + this.dias);
    return d; 
  }
  calcularMulta(fechaActual: Date) { 
    const venc = this.calcularVencimiento();
    if (!venc) return 0;
    const diff = Math.max(0, Math.ceil((fechaActual.getTime()-venc.getTime())/(1000*60*60*24)));
    return diff; 
  }
}

export class PrestamoCorto extends Prestamo {
  private dias = 7;
  calcularVencimiento() { 
    const d = new Date(this.fechaInicio);
    d.setDate(d.getDate() + this.dias);
    return d; 
  }
  calcularMulta(fechaActual: Date) { 
    const venc = this.calcularVencimiento();
    if (!venc) return 0;
    const diff = Math.max(0, Math.ceil((fechaActual.getTime()-venc.getTime())/(1000*60*60*24)));
    return diff * 2; 
  }
}

export class PrestamoReferencia extends Prestamo {
  calcularVencimiento() { return null; }
  calcularMulta(_fechaActual: Date) { return 0; }
}

export class PrestamoDigital extends Prestamo {
  calcularVencimiento() { return null; }
  calcularMulta(_fechaActual: Date) { return 0; }
}
