import { Personaje } from "./clases/personaje";
import { Item } from "./clases/item";

const espada = new Item("Espada", "ataque", 15);
const escudo = new Item("Escudo", "defensa", 10);

const personaje = new Personaje("jona el barbaro", 100, 20, []);

personaje.agregarItem(espada);
personaje.agregarItem(escudo);

personaje.getInventario()

console.log("hola")