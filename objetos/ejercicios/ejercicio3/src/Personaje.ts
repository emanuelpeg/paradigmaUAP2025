import { Inventario } from "./Inventario";

export abstract class Personaje {
  private _vida: number;
  private _ataque: number;
  public readonly nombre: string;
  public readonly inventario: Inventario;
  public vidaMaxima: number = 100;

  constructor(nombre: string, vida: number, ataque: number) {
    this.nombre = nombre;
    this._vida = vida;
    this._ataque = ataque;
    this.inventario = new Inventario();
  }

  get vida() {
    return this._vida;
  }

  get ataque() {
    return this._ataque;
  }

  setVida(nueva: number) {
    this._vida = Math.max(0, Math.min(nueva, this.vidaMaxima));
  }

  setAtaque(nuevo: number) {
    this._ataque = nuevo;
  }

  estaVivo(): boolean {
    return this._vida > 0;
  }

  recibirDanio(cantidad: number) {
    this.setVida(this._vida - cantidad);
  }

  cambiarClase?(tipo: string): void;

  abstract atacar(objetivo: Personaje | Personaje[]): void;
}

export class Guerrero extends Personaje {
  constructor(nombre: string) {
    super(nombre, 100, 10);
    this.vidaMaxima = 100;
  }
  atacar(objetivo: Personaje) {
    if (Array.isArray(objetivo)) objetivo = objetivo[0];
    objetivo.recibirDanio(this.ataque);
  }
  cambiarClase(tipo: string) {
    if (tipo === "mago") Object.setPrototypeOf(this, Mago.prototype);
    if (tipo === "arquero") Object.setPrototypeOf(this, Arquero.prototype);
    if (tipo === "guerrero") Object.setPrototypeOf(this, Guerrero.prototype);
    this.vidaMaxima = 100;
    this.setVida(this.vida);
    this.setAtaque(10);
  }
}

export class Mago extends Personaje {
  constructor(nombre: string) {
    super(nombre, 80, 10);
    this.vidaMaxima = 80;
  }
  atacar(objetivo: Personaje | Personaje[]) {
    const objetivos = Array.isArray(objetivo) ? objetivo : [objetivo];
    for (const obj of objetivos.slice(0, 3)) {
      const factor = 0.5 + Math.random();
      obj.recibirDanio(Math.round(this.ataque * factor));
    }
  }
  cambiarClase(tipo: string) {
    if (tipo === "mago") Object.setPrototypeOf(this, Mago.prototype);
    if (tipo === "arquero") Object.setPrototypeOf(this, Arquero.prototype);
    if (tipo === "guerrero") Object.setPrototypeOf(this, Guerrero.prototype);
    this.vidaMaxima = 80;
    this.setVida(this.vida);
    this.setAtaque(10);
  }
}

export class Arquero extends Personaje {
  constructor(nombre: string) {
    super(nombre, 100, 20);
    this.vidaMaxima = 100;
  }
  atacar(objetivo: Personaje) {
    if (Array.isArray(objetivo)) objetivo = objetivo[0];
    if (Math.random() < 0.2) return;
    objetivo.recibirDanio(this.ataque);
  }
  cambiarClase(tipo: string) {
    if (tipo === "mago") Object.setPrototypeOf(this, Mago.prototype);
    if (tipo === "arquero") Object.setPrototypeOf(this, Arquero.prototype);
    if (tipo === "guerrero") Object.setPrototypeOf(this, Guerrero.prototype);
    this.vidaMaxima = 100;
    this.setVida(this.vida);
    this.setAtaque(20);
  }
}
