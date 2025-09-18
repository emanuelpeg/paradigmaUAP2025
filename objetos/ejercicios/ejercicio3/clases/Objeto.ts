import { Personaje } from "./Personaje";

export abstract class Objeto {
    constructor(
        private nombre: string,
        private efecto: string
    ) {}

    getNombre(): string {
        return this.nombre;
    }

    getEfecto(): string {
        return this.efecto;
    }

    abstract usar(personaje: Personaje): void;
}

export class Curacion extends Objeto {
    constructor(nombre: string, private cantidadCura: number) {
        super(nombre, "Curacion");
    }

    usar(personaje: Personaje): void {
        personaje.recibirDanio(-this.cantidadCura);
    }
}

export class Mejora extends Objeto {
    constructor(nombre: string, private bonusAtaque: number) {
        super(nombre, "Mejora");
    }

    usar(personaje: Personaje): void {
        (personaje as any).ataque += this.bonusAtaque;
    }
}