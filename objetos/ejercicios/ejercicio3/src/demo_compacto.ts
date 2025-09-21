import { Guerrero, Mago, Arquero } from "./Personaje";
import { Pocion, Arma, PergaminoGuerrero, PergaminoMago, PergaminoArquero } from "./Item";
import { Juego } from "./Juego";


console.log("--- Creando personajes ---");
const guerrero = new Guerrero("El Chino");
const mago = new Mago("El Brujo");
const arquero = new Arquero("La Flecha");
console.log(guerrero, mago, arquero);

console.log("\n--- Probando el inventario: sumamos y usamos items ---");
guerrero.inventario.agregarItem(new Pocion("Manaos", 30));
mago.inventario.agregarItem(new Arma("Fierro", 5));
guerrero.setVida(50);
console.log(`Vida de ${guerrero.nombre} antes de tomar Manaos: ${guerrero.vida}`);
guerrero.inventario.usarItem("Manaos", guerrero);
console.log(`Vida de ${guerrero.nombre} después de tomar Manaos: ${guerrero.vida}`);
mago.inventario.usarItem("Fierro", mago);
console.log(`Ataque de ${mago.nombre} después de agarrar el fierro: ${mago.ataque}`);

console.log("\n--- Ataques: cada uno pega distinto ---");
const objetivo = new Guerrero("El Dummy");
objetivo.setVida(100);
const personajes = [guerrero, mago, arquero];
for (const personaje of personajes) {
  personaje.atacar(objetivo);
  console.log(`${personaje.nombre} le pegó a El Dummy. Vida que le quedó: ${objetivo.vida}`);
}

console.log("\n--- Mano a mano: combate simple ---");
const g2 = new Guerrero("El Ruso");
g2.setVida(80);
const juego = new Juego();
const ganador1 = juego.combateSimple(guerrero, g2);
console.log(`El que quedó de pie fue: ${ganador1}`);

console.log("\n--- Batalla campal: todos contra todos ---");
const p1 = new Guerrero("El Toro");
const p2 = new Mago("El Viejo");
const p3 = new Arquero("El Pibe");
const p4 = new Guerrero("El Lobo");
const personajes2 = [p1, p2, p3, p4];
const ganador2 = juego.combate(personajes2);
console.log(`El último que quedó fue: ${ganador2}`);

console.log("\n--- Encapsulamiento: no podés meter mano en la vida ni el inventario ---");
console.log("No podés cambiar la vida así nomás");
console.log("No podés chorear el inventario");

console.log("\n--- Cambio de clase en combate con pergaminos (bien mágico todo) ---");
const cambia = new Guerrero("El Multiuso");
cambia.inventario.agregarItem(new PergaminoMago());
cambia.inventario.usarItem("Pergamino de Mago", cambia);
console.log(`Ahora ${cambia.nombre} es: ${cambia.constructor.name}`);
cambia.inventario.agregarItem(new PergaminoArquero());
cambia.inventario.usarItem("Pergamino de Arquero", cambia);
console.log(`Ahora ${cambia.nombre} es: ${cambia.constructor.name}`);
cambia.inventario.agregarItem(new PergaminoGuerrero());
cambia.inventario.usarItem("Pergamino de Guerrero", cambia);
console.log(`Ahora ${cambia.nombre} es: ${cambia.constructor.name}`);
