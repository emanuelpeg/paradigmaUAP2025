import{Item} from './item';
export class Personaje {
    private nombre: string;
    private vida: number;
    private ataque: number;
    private inventario: Item[];

    constructor(nombre: string, vida: number, ataque: number,inventario: Item[]) {
        this.nombre = nombre;
        this.vida = vida;
        this.ataque = ataque;
        this.inventario = inventario;
    }

public async getNombre(): Promise<string> {
    return this.nombre;
}

public async getVida(): Promise<number> {
    return this.vida;
}

public async getAtaque(): Promise<number> {
    return this.ataque;
}
public getInventario(): Promise<Item[]> {
   this.inventario.forEach(item => {
       console.log(`Item: ${item.getNombre()}, Tipo: ${item.getTipo()}, Puntos: ${item.getPuntos()}`);
   });
   return Promise.resolve(this.inventario);
}
public agregarItem(item: Item): void {
    this.inventario.push(item);
}
}