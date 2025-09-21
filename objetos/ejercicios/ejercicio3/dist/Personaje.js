"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arquero = exports.Mago = exports.Guerrero = exports.Personaje = void 0;
const Inventario_1 = require("./Inventario");
class Personaje {
    constructor(nombre, vida, ataque) {
        this.vidaMaxima = 100;
        this.nombre = nombre;
        this._vida = vida;
        this._ataque = ataque;
        this.inventario = new Inventario_1.Inventario();
    }
    get vida() {
        return this._vida;
    }
    get ataque() {
        return this._ataque;
    }
    setVida(nueva) {
        this._vida = Math.max(0, Math.min(nueva, this.vidaMaxima));
    }
    setAtaque(nuevo) {
        this._ataque = nuevo;
    }
    estaVivo() {
        return this._vida > 0;
    }
    recibirDanio(cantidad) {
        this.setVida(this._vida - cantidad);
    }
}
exports.Personaje = Personaje;
class Guerrero extends Personaje {
    constructor(nombre) {
        super(nombre, 100, 10);
        this.vidaMaxima = 100;
    }
    atacar(objetivo) {
        if (Array.isArray(objetivo))
            objetivo = objetivo[0];
        objetivo.recibirDanio(this.ataque);
    }
    cambiarClase(tipo) {
        if (tipo === "mago")
            Object.setPrototypeOf(this, Mago.prototype);
        if (tipo === "arquero")
            Object.setPrototypeOf(this, Arquero.prototype);
        if (tipo === "guerrero")
            Object.setPrototypeOf(this, Guerrero.prototype);
        this.vidaMaxima = 100;
        this.setVida(this.vida);
        this.setAtaque(10);
    }
}
exports.Guerrero = Guerrero;
class Mago extends Personaje {
    constructor(nombre) {
        super(nombre, 80, 10);
        this.vidaMaxima = 80;
    }
    atacar(objetivo) {
        const objetivos = Array.isArray(objetivo) ? objetivo : [objetivo];
        for (const obj of objetivos.slice(0, 3)) {
            const factor = 0.5 + Math.random();
            obj.recibirDanio(Math.round(this.ataque * factor));
        }
    }
    cambiarClase(tipo) {
        if (tipo === "mago")
            Object.setPrototypeOf(this, Mago.prototype);
        if (tipo === "arquero")
            Object.setPrototypeOf(this, Arquero.prototype);
        if (tipo === "guerrero")
            Object.setPrototypeOf(this, Guerrero.prototype);
        this.vidaMaxima = 80;
        this.setVida(this.vida);
        this.setAtaque(10);
    }
}
exports.Mago = Mago;
class Arquero extends Personaje {
    constructor(nombre) {
        super(nombre, 100, 20);
        this.vidaMaxima = 100;
    }
    atacar(objetivo) {
        if (Array.isArray(objetivo))
            objetivo = objetivo[0];
        if (Math.random() < 0.2)
            return;
        objetivo.recibirDanio(this.ataque);
    }
    cambiarClase(tipo) {
        if (tipo === "mago")
            Object.setPrototypeOf(this, Mago.prototype);
        if (tipo === "arquero")
            Object.setPrototypeOf(this, Arquero.prototype);
        if (tipo === "guerrero")
            Object.setPrototypeOf(this, Guerrero.prototype);
        this.vidaMaxima = 100;
        this.setVida(this.vida);
        this.setAtaque(20);
    }
}
exports.Arquero = Arquero;
