//class Contador {
    //static contadores: Contador[] = [];
    private static instancia: Contador | null = null;
    private _cuenta: number;

    static getInstancia() {
        if (this.instancia === null) {
            this.instancia = new Contador();
        }
        return this.instancia;
    }
    static obtenerContadores(): Contador[] {
        return Contador.contadores;
    }

    private constructor(inicial: number = 0) {
        this.cuenta = inicial;
        Contador.contadores.push(this);
        this.incrementar();
    }

    incrementar(): void {
        this.cuenta++;
    }

}



//const lista: Array<number> = [1, 2, 3, 4, 5];

//lista.forEach((elemento) => console.log(elemento));

//const contador = new Contador();
//const otroContador = new Contador();

const contador = Contador.getInstancia();
const otroContador = Contador.getInstancia();

console.log(contador);
contador.cuenta = 10;
console.log(otroContador);

console.log(contador === otroContador); // true

//contador.incrementar();

//console.log(contador);
//console.log(otroContador);