"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Personaje_1 = require("./Personaje");
const Item_1 = require("./Item");
const Juego_1 = require("./Juego");
console.log("--- Crear personajes de diferentes tipos ---");
const g = new Personaje_1.Guerrero("Arthas");
const m = new Personaje_1.Mago("Gandalf");
const a = new Personaje_1.Arquero("Legolas");
console.log(g, m, a);
console.log("\n--- Intentar modificar propiedades privadas (debe fallar) ---");
// @ts-expect-error
try {
    g._vida = 999;
}
catch (e) {
    console.log("No se puede modificar vida directamente");
}
// @ts-expect-error
try {
    g._ataque = 999;
}
catch (e) {
    console.log("No se puede modificar ataque directamente");
}
console.log("\n--- Agregar objetos al inventario y usarlos ---");
g.inventario.agregarItem(new Item_1.Pocion("Curación", 30));
g.inventario.agregarItem(new Item_1.Arma("Espada", 10));
g.setVida(60);
console.log(`Vida antes de curar: ${g.vida}`);
g.inventario.usarItem("Curación", g);
console.log(`Vida después de curar: ${g.vida}`);
g.inventario.usarItem("Espada", g);
console.log(`Ataque después de usar arma: ${g.ataque}`);
console.log("\n--- Combate simple entre dos personajes ---");
const g2 = new Personaje_1.Guerrero("Lothar");
g2.setVida(80);
const juego = new Juego_1.Juego();
const ganador1 = juego.combateSimple(g, g2);
console.log(`Ganador combate simple: ${ganador1}`);
console.log("\n--- Combate grupal con múltiples personajes ---");
const p1 = new Personaje_1.Guerrero("Conan");
const p2 = new Personaje_1.Mago("Merlin");
const p3 = new Personaje_1.Arquero("Robin");
const p4 = new Personaje_1.Guerrero("Bjorn");
const personajes = [p1, p2, p3, p4];
const ganador2 = juego.combate(personajes);
console.log(`Ganador combate grupal: ${ganador2}`);
console.log("\n--- Demostrar polimorfismo: todos atacan igual pero actúan diferente ---");
const objetivo = new Personaje_1.Guerrero("Dummy");
objetivo.setVida(100);
for (const personaje of [g, m, a]) {
    personaje.atacar(objetivo);
    console.log(`${personaje.nombre} atacó a Dummy. Vida restante de Dummy: ${objetivo.vida}`);
    objetivo.setVida(100);
}
console.log("\n--- Intentar sobrescribir inventario (debe fallar) ---");
// @ts-expect-error
try {
    g.inventario = null;
}
catch (e) {
    console.log("No se puede sobrescribir inventario");
}
