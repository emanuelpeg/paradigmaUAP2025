"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PergaminoArquero = exports.PergaminoMago = exports.PergaminoGuerrero = exports.Arma = exports.Pocion = exports.Item = void 0;
class Item {
    constructor(nombre, efecto) {
        this.nombre = nombre;
        this.efecto = efecto;
    }
}
exports.Item = Item;
class Pocion extends Item {
    usar(personaje) {
        personaje.setVida(Math.min(personaje.vida + this.efecto, personaje.vidaMaxima));
    }
}
exports.Pocion = Pocion;
class Arma extends Item {
    usar(personaje) {
        personaje.setAtaque(personaje.ataque + this.efecto);
    }
}
exports.Arma = Arma;
class PergaminoGuerrero extends Item {
    constructor() { super("Pergamino de Guerrero", 0); }
    usar(personaje) {
        personaje.cambiarClase && personaje.cambiarClase("guerrero");
    }
}
exports.PergaminoGuerrero = PergaminoGuerrero;
class PergaminoMago extends Item {
    constructor() { super("Pergamino de Mago", 0); }
    usar(personaje) {
        personaje.cambiarClase && personaje.cambiarClase("mago");
    }
}
exports.PergaminoMago = PergaminoMago;
class PergaminoArquero extends Item {
    constructor() { super("Pergamino de Arquero", 0); }
    usar(personaje) {
        personaje.cambiarClase && personaje.cambiarClase("arquero");
    }
}
exports.PergaminoArquero = PergaminoArquero;
