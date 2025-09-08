import { juego } from "./clases/Juego";
import { TipoPersonaje } from "./clases/Personaje";

juego.addPersonaje(TipoPersonaje.GUERRERO, 1, "Aragon", );
juego.addPersonaje(TipoPersonaje.MAGO, 1, "Gandalf");

juego.combateSimple(juego.getPersonajes[0], juego.getPersonajes[1]);

export function getRandomInteger(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}