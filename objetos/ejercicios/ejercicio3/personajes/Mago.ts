import { Personaje } from "./Personaje";

export class Mago extends Personaje {
    constructor() {
        super([], 100, 20);
    }

    combatir(personajesObjetivo: Personaje[]) {
        // fijarse si se esta atacando a si mismo
        if (personajesObjetivo.indexOf(this) !== -1) {
            console.log("No podes atacarte a vos mismo");
            personajesObjetivo.splice(personajesObjetivo.indexOf(this), 1);
        }

        personajesObjetivo.forEach((personaje: Personaje) => {
            personaje.restarVida(this.ataque);
        });

        this.ataque = 20; // resetear el daño por si habia un objeto de mejora de ataque
    }
}