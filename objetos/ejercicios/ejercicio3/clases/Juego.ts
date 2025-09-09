import { Personaje, TipoPersonaje, PersonajeFactory } from "./Personaje";
export class Juego {
    private personajes: Personaje[] = [];
    
    get getPersonajes() { return this.personajes; }
    addPersonaje(tipo: TipoPersonaje, id: number, nombre: string)
    {
        const personaje = PersonajeFactory.crearPersonaje(tipo, id, nombre);
        for (const p of this.personajes)
        {
            if (p == personaje) throw new Error('El personaje ya está en la lista del juego')
        }
        this.personajes.push(personaje);
    }
    combateSimple(personaje1: Personaje, personaje2: Personaje)
    {
        while (true)
        {
            console.log(`Turno de ${personaje1.getNombre}`);
            personaje1.ataque(personaje2);
            if (!personaje2.estaVivo()) {
                console.log('El ganador es: ', personaje1.getNombre);
                break;
            }
            console.log(`Atacó: ${personaje1.getNombre} - vida: ${personaje1.getVida} 
                \nDefendió: ${personaje2.getNombre} - vida: ${personaje2.getVida}`);
            
            console.log(`Turno de ${personaje1.getNombre}`);
            personaje2.ataque(personaje1);
            if (!personaje1.estaVivo()) {
                console.log('El ganador es: ', personaje2.getNombre);
                break;
            }
            console.log(`Atacó: ${personaje2.getNombre} - vida: ${personaje2.getVida} 
                \nDefendió: ${personaje1.getNombre} - vida: ${personaje1.getVida}`);
        }
    }

    combateFFA()
    {

    }
}
const juego = new Juego();
export { juego }