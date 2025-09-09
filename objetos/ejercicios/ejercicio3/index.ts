import { ObjetoAtaque } from "./objetos/ObjetoAtaque";
import { ObjetoSalud } from "./objetos/objetoSalud";
import { Arquero } from "./personajes/Arquero";
import { Guerrero } from "./personajes/Guerrero";
import { Mago } from "./personajes/Mago";
import { Personaje } from "./personajes/Personaje";

const guerrero: Personaje = new Guerrero();
const arquero: Personaje = new Arquero();
const mago: Personaje = new Mago();

const o = new ObjetoAtaque();
const s = new ObjetoSalud();
guerrero.tomarObjeto(o);
arquero.tomarObjeto(s);

function vidas() {
    console.log('vida g: ' + guerrero.vida);
    console.log('vida a: ' + arquero.vida);
    console.log('vida v: ' + mago.vida);
}

vidas();
guerrero.usarObjeto(o);
guerrero.combatir([arquero]);
mago.combatir([guerrero, arquero]);
arquero.usarObjeto(s);

vidas();
