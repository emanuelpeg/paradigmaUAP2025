"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rodado = exports.Mueble = void 0;
class Mueble {
    nombre;
    valor;
    porcentage;
    constructor(nombre, valor, porcentage) {
        this.nombre = nombre;
        this.valor = valor;
        this.porcentage = porcentage;
    }
    amortizar() {
        return this.valor * (this.porcentage / 100);
    }
    getNombre() {
        return this.nombre;
    }
}
exports.Mueble = Mueble;
class Rodado {
    marca;
    anio;
    valor;
    km;
    constructor(marca, anio, valor, km) {
        this.marca = marca;
        this.anio = anio;
        this.valor = valor;
        this.km = km;
    }
    amortizar() {
        return this.valor / 50000000 * (this.km);
    }
    getNombre() {
        return this.marca + "--" + this.anio;
    }
}
exports.Rodado = Rodado;
