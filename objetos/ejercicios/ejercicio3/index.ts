import { Juego } from "./clases/Juego";
import { Personaje, TipoPersonaje } from "./clases/Personaje";
import { Curacion, Mejora } from "./clases/Objeto";
import { Inventario } from "./clases/Inventario";

// Crear el juego
const juego = new Juego();

// Crear personajes
const guerrero = new Personaje("Thorin", 100, 20, TipoPersonaje.Guerrero);
const mago = new Personaje("Gandalf", 80, 15, TipoPersonaje.Mago);
const arquero = new Personaje("Legolas", 90, 18, TipoPersonaje.Arquero);

// Agregar objetos al inventario de cada personaje
guerrero.getInventario().agregarObjeto(new Mejora("Espada Rúnica", 10));
mago.getInventario().agregarObjeto(new Curacion("Poción de Vida", 30));
arquero.getInventario().agregarObjeto(new Mejora("Arco Élfico", 7));

// Registrar personajes en el juego
juego.agregarPersonaje(guerrero);
juego.agregarPersonaje(mago);
juego.agregarPersonaje(arquero);

// Mostrar estado inicial
console.log("=== ESTADO INICIAL ===");
console.log(`${guerrero.getNombre()} (Vida: ${guerrero.getVida()})`);
console.log(`${mago.getNombre()} (Vida: ${mago.getVida()})`);
console.log(`${arquero.getNombre()} (Vida: ${arquero.getVida()})`);

// Iniciar combate
console.log("\n=== COMBATE ===");
juego.iniciarCombate();
