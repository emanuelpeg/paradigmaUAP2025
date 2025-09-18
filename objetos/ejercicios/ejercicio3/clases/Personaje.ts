import { Inventario } from "./Inventario";

export class Personaje {
    protected vida: number;
    protected ataque: number;
    protected inventario: Inventario;

    constructor(
        private nombre: string,
        vida: number,
        ataque: number,
        private tipo_personaje: TipoPersonaje
    ) {
        this.vida = vida;
        this.ataque = ataque;
        this.inventario = new Inventario(this);
    }

    //getters
    public getNombre(): String {
        return this.nombre;
    }

    public getVida(): number {
        return this.vida;
    }

    public getTipo(): TipoPersonaje {
        return this.tipo_personaje;
    }

    public getInventario(): Inventario {
        return this.inventario;
    }

    //metodos
    public atacar(): number {
        switch (this.tipo_personaje) {
            case TipoPersonaje.Guerrero:
                //ataque fijo y consistente
                return this.ataque;
            case TipoPersonaje.Mago:
                //ataque variable (50% a 150%)
                const factor = Math.random() + 0.5;
                return Math.floor(this.ataque * factor);
            case TipoPersonaje.Arquero:
                //20% de probabilidad de fallar
                const fallo = Math.random() < 0.2;
                return fallo ? 0 : this.ataque * 2;
            default:
                return this.ataque;
        }
    }

    public recibirDanio(danio: number): void {
        this.vida = Math.max(0, this.vida - danio)
    }

    public estarVivo(): boolean {
        return this.vida > 0;
    }

}

export enum TipoPersonaje {
    Guerrero = "Guerrero",
    Mago = "Mago",
    Arquero = "Arquero"
}
