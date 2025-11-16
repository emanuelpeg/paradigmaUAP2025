import { Personaje } from "./Personaje";

export class Juego {
    private personajes: Personaje[] = [];

    constructor() {}

    agregarPersonaje(personaje: Personaje): void {
        this.personajes.push(personaje);
    }

    iniciarCombate(): void {
        console.log("Comienza el combate!!!");

        while (this.personajes.filter(p => p.estarVivo()).length > 1) {
            for (let atacante of this.personajes) {
                if (!atacante.estarVivo()) continue;

                //elegir un objetivo aleatorio distinto
                const posiblesObjetivos = this.personajes.filter(p => p !== atacante && p.estarVivo());
                if (posiblesObjetivos.length === 0) break;

                const objetivo = posiblesObjetivos[Math.floor(Math.random() * posiblesObjetivos.length)];

                //ataque
                const danio = atacante.atacar();
                objetivo.recibirDanio(danio);

                console.log(`${atacante.getNombre()} (${atacante.getTipo()}) ataca a ${objetivo.getNombre()} causando ${danio} de daño. Vida de ${objetivo.getNombre()}: ${objetivo.getVida()}`);

                //check de muerte
                if (!objetivo.estarVivo()) {
                    console.log(`${objetivo.getNombre()} ha muerto!!!`);
                }
            }
        }

        const ganador = this.personajes.find(p => p.estarVivo());
        if (ganador) {
            console.log(`${ganador.getNombre()} (${ganador.getTipo()}) es el ganador del combate!!!`);
        } else {
            console.log("Todos han muerto... no hay ganador.");
        }
    }
}
