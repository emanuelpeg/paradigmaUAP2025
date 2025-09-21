import { Guerrero } from "./Personaje";
import { Pocion } from "./Item";

const g = new Guerrero("Arthas");
console.log(`Vida inicial: ${g.vida}`);
g.setVida(50);
console.log(`Vida tras daño: ${g.vida}`);
g.inventario.agregarItem(new Pocion("Curación", 40));
g.inventario.usarItem("Curación", g);
console.log(`Vida tras usar poción: ${g.vida}`);
