import type { Personaje } from "./Personaje";
export abstract class Item {
  constructor(public nombre: string, public efecto: number) {}
  abstract usar(personaje: Personaje): void;
}

export class Pocion extends Item {
  usar(personaje: Personaje): void {
    (personaje as any).setVida(Math.min((personaje as any).vida + this.efecto, (personaje as any).vidaMaxima));
  }
}

export class Arma extends Item {
  usar(personaje: Personaje): void {
    (personaje as any).setAtaque((personaje as any).ataque + this.efecto);
  }
}

export class PergaminoGuerrero extends Item {
  constructor() { super("Pergamino de Guerrero", 0); }
  usar(personaje: Personaje): void {
    (personaje as any).cambiarClase && (personaje as any).cambiarClase("guerrero");
  }
}
export class PergaminoMago extends Item {
  constructor() { super("Pergamino de Mago", 0); }
  usar(personaje: Personaje): void {
    (personaje as any).cambiarClase && (personaje as any).cambiarClase("mago");
  }
}
export class PergaminoArquero extends Item {
  constructor() { super("Pergamino de Arquero", 0); }
  usar(personaje: Personaje): void {
    (personaje as any).cambiarClase && (personaje as any).cambiarClase("arquero");
  }
}
