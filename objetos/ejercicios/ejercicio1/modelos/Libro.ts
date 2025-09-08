import { Autor } from "./Autor";
import { Socio } from "../clases/Socio";

export class Libro {
    private disponible: boolean = true;
    private reservas: Socio[] = [];

    constructor(
        public titulo: string,
        public autor: Autor,
        public isbn: string,
    ) {}

    estaDisponible(): boolean {
        return this.disponible;
    }

    prestar(): boolean {
        if (this.disponible) {
            this.disponible = false;
            return true;
        }
        return false;
    }

    devolver(): Socio | null {
        this.disponible = true;
        return this.reservas.length > 0 ? this.reservas.shift()! : null;
    }

    reservar(socio: Socio): void {
        if (!this.reservas.includes(socio)) {
            this.reservas.push(socio);        }
    }

    getReservas(): Socio[] {
        return [...this.reservas];
    }
}