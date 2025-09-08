import { Personaje  } from "./Personaje";

export abstract class Item {
    constructor(
        private nombre: string,
        private efecto: number
    ){}
    get getNombre() { return this.nombre; }
    get getEfecto() { return this.efecto; }
    abstract utilizar(personaje: Personaje);
}

export class Arma extends Item {
    utilizar(personaje: Personaje) {
        
    }
}

export class PocionVida extends Item {
    utilizar(personaje: Personaje){
        personaje.sumarVida(50);
    }
}