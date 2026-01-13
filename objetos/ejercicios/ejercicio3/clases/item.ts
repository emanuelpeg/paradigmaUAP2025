
export class Item{
    private nombre: string;
    private tipo: 'curacion' | 'ataque' | 'defensa';
    private puntos: number;


    constructor(nombre: string, tipo: 'curacion' | 'ataque' | 'defensa', puntos: number) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.puntos = puntos;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public getTipo(): 'curacion' | 'ataque' | 'defensa' {
        return this.tipo;
    }

    public getPuntos(): number {
        return this.puntos;
    }
}