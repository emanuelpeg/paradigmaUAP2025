import { Personaje } from "./Personaje";

export class Arquero extends Personaje {
    constructor() {
        super([], 80, 60);
    }

    combatir(personajesObjetivo: Personaje[]) {
        const personajeObjetivo: Personaje = personajesObjetivo[0];
        
        // fijarse si se esta atacando a si mismo
        if (personajeObjetivo == this) {
            console.log("No podes atacarte a vos mismo");
            return;
        }

        personajeObjetivo.restarVida(this.ataque);
        this.ataque = 60; // resetear el daño por si habia un objeto de mejora de ataque
    }
}