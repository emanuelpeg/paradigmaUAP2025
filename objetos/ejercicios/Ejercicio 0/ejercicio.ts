
export class Contador {
    static contadores: Contador[] = [];
    cuenta: number;

    constructor(inicial: number = 0) {
        this.cuenta = inicial;
        Contador.contadores.push(this);
    
    }

    incrementar() {
        this.cuenta++;
    }
}

const contador = new Contador();
