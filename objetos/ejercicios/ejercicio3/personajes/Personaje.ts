import { IMejorable } from "../interfaces/IMejorable";

export abstract class Personaje {
    constructor(
        private _inventario: IMejorable[], 
        private _vida: number, 
        private _ataque: number
    ) { }

    tomarObjeto(objeto: IMejorable) {
        this._inventario.push(objeto);
    }

    eliminarObjeto(objeto: IMejorable) {
        const idx = this._inventario.indexOf(objeto);
        if (idx === -1) {
            console.log("Elemento no esta en inventario");
            return;
        }

        this._inventario.splice(idx, 1);
    }

    abstract combatir(personajesObjetivo: Personaje[]);
    
    usarObjeto(objeto: IMejorable) {
        objeto.aplicar(this);
        this.eliminarObjeto(objeto);
    }

    restarVida(number: number) { this._vida -= number };
    sumarVida(number: number) { this._vida += number };

    sumarAtaque(number: number) { this._ataque += number };

    get vida() { return this._vida };
    get ataque() { return this._ataque };
    get inventario() { return this._inventario };
}