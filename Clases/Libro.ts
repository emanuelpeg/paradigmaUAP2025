// Libro.ts
import { Autor } from "./Autor";

export class Libro {
    disponible: boolean = true;
    idSocioPrestado: number | null = null; // Solo guardamos el ID
    fechaPrestamo: Date | null = null;
    fechaDevolucionEstimada: Date | null = null;

    constructor(
        public titulo: string,
        public autor: Autor,
        public isbn: string
    ) {}

    prestar(idSocio: number, dias: number = 14): boolean {
        if (this.disponible) {
            this.idSocioPrestado = idSocio;
            this.fechaPrestamo = new Date();
            this.fechaDevolucionEstimada = new Date();
            this.fechaDevolucionEstimada.setDate(this.fechaPrestamo.getDate() + dias);
            this.disponible = false;
            return true;
        }
        return false;
    }

    devolver(): void {
        this.idSocioPrestado = null;
        this.fechaPrestamo = null;
        this.fechaDevolucionEstimada = null;
        this.disponible = true;
    }

    estaVencido(): boolean {
        if (!this.fechaDevolucionEstimada) return false;
        return new Date() > this.fechaDevolucionEstimada;
    }

    diasRetraso(): number {
        if (!this.estaVencido() || !this.fechaDevolucionEstimada) return 0;
        const diff = new Date().getTime() - this.fechaDevolucionEstimada.getTime();
        return Math.floor(diff / (1000 * 60 * 60 * 24));
    }

    toString(): string {
        const estado = this.disponible
            ? "Disponible"
            : `Prestado hasta ${this.fechaDevolucionEstimada?.toLocaleDateString()}`;
        return `${this.titulo} - ${this.autor.nombre} (ISBN: ${this.isbn}) [${estado}]`;
    }
}