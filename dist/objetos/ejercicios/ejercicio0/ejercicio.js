"use strict";
//clase contador en ts con una sola instancia q solo tenga incrementar,
//cda vez q se llama se incrementa en 1 y cdo llega a 10 muestra un mensaje
//  y no se puede incrementar mas de 10
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contador = void 0;
class Contador {
    cuenta;
    constructor() {
        this.cuenta = 0;
    }
    incrementar() {
        if (this.cuenta < 10) {
            this.cuenta++;
            console.log(`Cuenta actual: ${this.cuenta}`);
            if (this.cuenta === 10) {
                console.log("¡Llegaste a 10!");
            }
        }
        else {
            console.log("No se puede incrementar más, ya llegaste a 10.");
        }
    }
}
exports.Contador = Contador;
// Única instancia
const miContador = new Contador();
// Ejemplo de uso
for (let i = 0; i < 12; i++) {
    miContador.incrementar();
}
