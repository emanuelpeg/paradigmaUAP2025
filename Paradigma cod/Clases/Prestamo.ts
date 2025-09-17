abstract class Prestamo {
  protected libro: string;
  protected fechaInicio: Date;

  constructor(libro: string) {
    this.libro = libro;
    this.fechaInicio = new Date();
  }

  abstract calcularVencimiento(): Date | string;
  abstract calcularMulta(diasAtraso: number): number;
}

// --- Tipos de préstamos concretos ---

export class PrestamoRegular extends Prestamo {
  calcularVencimiento(): Date {
    let venc = new Date(this.fechaInicio);
    venc.setDate(venc.getDate() + 14);
    return venc;
  }

  calcularMulta(diasAtraso: number): number {
    return diasAtraso > 0 ? diasAtraso * 10 : 0; // multa estándar
  }
}

export class PrestamoCorto extends Prestamo {
  calcularVencimiento(): Date {
    let venc = new Date(this.fechaInicio);
    venc.setDate(venc.getDate() + 7);
    return venc;
  }

  calcularMulta(diasAtraso: number): number {
    return diasAtraso > 0 ? diasAtraso * 20 : 0; // multa doble
  }
}

export class PrestamoReferencia extends Prestamo {
  calcularVencimiento(): string {
    return "Solo consulta en sala";
  }

  calcularMulta(_: number): number {
    return 0; // nunca hay multa
  }
}

export class PrestamoDigital extends Prestamo {
  calcularVencimiento(): string {
    return "Acceso ilimitado (digital)";
  }

  calcularMulta(_: number): number {
    return 0; // nunca hay multa
  }
}
