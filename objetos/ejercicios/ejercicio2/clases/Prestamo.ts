abstract class Prestamo {
    protected fechaInicio: Date;

    constructor(fechaInicio: Date) {
        this.fechaInicio = fechaInicio;
    }

    abstract calcularVencimiento(): Date;
    abstract calcularMulta(diasAtraso: number): number;
}

// Préstamo regular: 14 días, multa estándar ($10 por día)
class PrestamoRegular extends Prestamo {
    calcularVencimiento(): Date {
        const vencimiento = new Date(this.fechaInicio);
        vencimiento.setDate(vencimiento.getDate() + 14);
        return vencimiento;
    }

    calcularMulta(diasAtraso: number): number {
        return diasAtraso > 0 ? diasAtraso * 10 : 0;
    }
}

// Préstamo corto: 7 días, multa doble ($20 por día)
class PrestamoCorto extends Prestamo {
    calcularVencimiento(): Date {
        const vencimiento = new Date(this.fechaInicio);
        vencimiento.setDate(vencimiento.getDate() + 7);
        return vencimiento;
    }

    calcularMulta(diasAtraso: number): number {
        return diasAtraso > 0 ? diasAtraso * 20 : 0;
    }
}

// Préstamo de referencia: solo consulta en biblioteca, sin vencimiento ni multa
class PrestamoReferencia extends Prestamo {
    calcularVencimiento(): Date {
        return this.fechaInicio; // No hay vencimiento real
    }

    calcularMulta(diasAtraso: number): number {
        return 0; // No hay multa
    }
}

// Préstamo digital: sin límite de tiempo ni multa
class PrestamoDigital extends Prestamo {
    calcularVencimiento(): Date {
        return new Date(8640000000000000); // Fecha máxima posible
    }

    calcularMulta(diasAtraso: number): number {
        return 0; // No hay multa
    }
}

// Ejemplo de uso polimórfico:
const prestamos: Prestamo[] = [
    new PrestamoRegular(new Date("2025-09-01")),
    new PrestamoCorto(new Date("2025-09-01")),
    new PrestamoReferencia(new Date("2025-09-01")),
    new PrestamoDigital(new Date("2025-09-01")),
];

prestamos.forEach((prestamo) => {
    const vencimiento = prestamo.calcularVencimiento();
    const multa = prestamo.calcularMulta(3); // Ejemplo: 3 días de atraso
    console.log(`Vencimiento: ${vencimiento.toDateString()}, Multa: $${multa}`);
});

export {
    Prestamo,
    PrestamoRegular,
    PrestamoCorto,
    PrestamoReferencia,
    PrestamoDigital
};