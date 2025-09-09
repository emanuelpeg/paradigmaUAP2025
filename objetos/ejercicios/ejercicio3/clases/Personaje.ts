import { Item } from "./Item";
import { getRandomInteger } from "..";

export abstract class Personaje {
    protected inventario: Item[] = []
    protected vida: number
    protected vidaBase: number   
    constructor(
        protected id: number,
        protected nombre: string, 
    ){}
    get getNombre() { return this.nombre; }
    get getVida() { return this.vida; }
    getRandomInt(min, max) { getRandomInteger(min, max)}
    listarInventario() { return this.inventario; }
    agregarItem(item: Item){
        if (this.inventario.length > 3) this.inventario.push(item);
        else throw new Error('El inventario ya está lleno (3 slots ocupados)');
    }
    eliminarItem(item: Item){
        if (this.inventario.length === 0) throw new Error('El inventario está vacío');
        const index = this.inventario.indexOf(item);
        this.inventario.splice(index, 1)
    }
    sumarVida(puntos: number) {
        if (this.vida + puntos >= this.vidaBase)
        {
            this.vida = (this.vida+puntos) - (this.vida+puntos-this.vidaBase);
        }
        else this.vida = this.vida + puntos;
    }
    estaVivo(): boolean { return this.vida > 0; }
    abstract ataque(objetivo: Personaje, arma?: Item);
    abstract restarVida(puntos: number);
}

//  interface ConVida {
//     restarVida: (numero: number) => void;
//  }

export class Guerrero extends Personaje
{
    vidaBase = 120;
    vida = 120;
    ataque(objetivo: Personaje, arma?: Item) {
        if (arma) objetivo.restarVida(15 + arma.getEfecto);
        else objetivo.restarVida(15);
    }
    restarVida(puntos: number) {
        if (this.vida > 0) this.vida = this.vida-puntos;
    }
}

export class Mago extends Personaje
{
    vidaBase = 80;
    vida = 80;
    ataque(objetivo: Personaje, arma?: Item) {
        const porcentaje = getRandomInteger(50, 150);
        if (arma) objetivo.restarVida((porcentaje*20/100) + arma.getEfecto);
        else objetivo.restarVida(porcentaje*20/100);
    }
    restarVida(puntos: number) {
        if (this.vida > 0) this.vida = this.vida-puntos;
    }
}

export class Arquero extends Personaje
{
    vidaBase = 100;
    vida = 100;
    ataque(objetivo: Personaje, arma?: Item) {
        if (arma) objetivo.restarVida(10 + arma.getEfecto);
        else objetivo.restarVida(10);
    }
    restarVida(puntos: number) {
        if (this.vida > 0) this.vida = this.vida-puntos;
    }
}

export enum TipoPersonaje {
    GUERRERO = "guerrero",
    MAGO = "mago",
    ARQUERO = "arquero"
}

export class PersonajeFactory {
    static crearPersonaje(
        tipo: TipoPersonaje,
        id: number,
        nombre: string,
    ): Personaje {
        switch (tipo)
        {
            case TipoPersonaje.GUERRERO:
                return new Guerrero(id, nombre);
            case TipoPersonaje.MAGO:
                return new Mago(id, nombre);
            case TipoPersonaje.ARQUERO:
                return new Arquero(id, nombre);
            default:
                throw new Error('Tipo de personaje no válido')
        }
    }
}