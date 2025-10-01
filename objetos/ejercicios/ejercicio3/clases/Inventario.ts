import { Objeto } from "./Objeto";
import { Personaje } from "./Personaje";

export class Inventario {
    private objetos: Objeto[];
    private maxObjetos: number = 3;

    constructor(private duenio: Personaje) {
        this.objetos = [];
    }

    agregarObjeto(objeto: Objeto): void {
        if (this.objetos.length < this.maxObjetos) {
            this.objetos.push(objeto);
        } else {
            console.log(`El inventario de ${this.duenio.getNombre()} está lleno.`);
        }
    }

    usarObjeto(nombre: string): void {
        const objeto = this.objetos.find(o => o.getNombre() === nombre);
        if(objeto) {
            objeto.usar(this.duenio);
            this.objetos = this.objetos.filter(o => o !== objeto);
        } else {
            console.log(`No se encontró el objeto ${nombre}`);
        }
    }

    mostrarObjetos(): void {
        if (this.objetos.length === 0) {
            console.log("Inventario vacío");
        } else {
            console.log(`Inventario de ${this.duenio.getNombre()}:`);
            this.objetos.forEach(o => console.log(`- ${o.getNombre()} (${o.getEfecto()})`));
        }
    }
}
