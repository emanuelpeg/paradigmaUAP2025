import { Personajes } from "./clases/personajes";
import { Item } from "./clases/item";

const espada = new Item("Espada", "ataque", 10);

const pocionVida = new Item("Poción de Vida", "curacion", 5);

const personaje = new Personajes("Felipe El Valiente", 100, 20, []);

personaje.agregarItem(espada);
personaje.agregarItem(pocionVida);

personaje.getInventario()

