
import { Libro } from "./Libro";

/**
 * Clase base para los préstamos.
 * Define la interfaz polimórfica para calcular vencimiento y multa.
 */
export abstract class Prestamo {
	constructor(public libro: Libro, public fechaInicio: Date) {}

	/**
	 * Calcula la fecha de vencimiento del préstamo.
	 */
	abstract calcularVencimiento(): Date | null;

	/**
	 * Calcula la multa a aplicar (en pesos, por ejemplo) según la fecha de devolución.
	 * @param fechaDevolucion Fecha en la que se devuelve el libro
	 */
	abstract calcularMulta(fechaDevolucion: Date): number;
}

/**
 * Préstamo regular: 14 días, multa estándar (por ejemplo, $100 por día de atraso)
 */
export class PrestamoRegular extends Prestamo {
	private static DIAS = 14;
	private static MULTA_POR_DIA = 100;

	calcularVencimiento(): Date {
		const vencimiento = new Date(this.fechaInicio);
		vencimiento.setDate(vencimiento.getDate() + PrestamoRegular.DIAS);
		return vencimiento;
	}

	calcularMulta(fechaDevolucion: Date): number {
		const vencimiento = this.calcularVencimiento();
		const diasAtraso = Math.ceil((fechaDevolucion.getTime() - vencimiento.getTime()) / (1000 * 60 * 60 * 24));
		return diasAtraso > 0 ? diasAtraso * PrestamoRegular.MULTA_POR_DIA : 0;
	}
}

/**
 * Préstamo corto: 7 días, multa doble (por ejemplo, $200 por día de atraso)
 */
export class PrestamoCorto extends Prestamo {
	private static DIAS = 7;
	private static MULTA_POR_DIA = 200;

	calcularVencimiento(): Date {
		const vencimiento = new Date(this.fechaInicio);
		vencimiento.setDate(vencimiento.getDate() + PrestamoCorto.DIAS);
		return vencimiento;
	}

	calcularMulta(fechaDevolucion: Date): number {
		const vencimiento = this.calcularVencimiento();
		const diasAtraso = Math.ceil((fechaDevolucion.getTime() - vencimiento.getTime()) / (1000 * 60 * 60 * 24));
		return diasAtraso > 0 ? diasAtraso * PrestamoCorto.MULTA_POR_DIA : 0;
	}
}

/**
 * Préstamo de referencia: solo consulta en biblioteca, no se puede llevar, sin vencimiento ni multa.
 */
export class PrestamoReferencia extends Prestamo {
	calcularVencimiento(): null {
		return null; // No hay vencimiento
	}

	calcularMulta(_fechaDevolucion: Date): number {
		return 0; // No hay multa
	}
}

/**
 * Préstamo digital: sin límite de tiempo, sin multa.
 */
export class PrestamoDigital extends Prestamo {
	calcularVencimiento(): null {
		return null; // Sin vencimiento
	}

	calcularMulta(_fechaDevolucion: Date): number {
		return 0; // Sin multa
	}
}
