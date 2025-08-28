class Contador{
    static contadores: Contador[] = [];
    cuenta: number;
private static instancia: Contador | null = null;
private _cuenta: number;

    static obtenerInstancia(): Contador[] {
        if (this.instancia === null) {
            this.instancia = new Contador();
        }
        return Contador.contadores;
    }
    constructor(inicial: number = 0) {
        this.cuenta = inicial;
        Contador.contadores.push(this);
        this.incrementar();
    }
    incrementar() {
        this.cuenta++;
    }

    
}
const lista: Array<number> = [1, 2, 3, 4, 5];
lista.forEach((elemento) => console.log(elemento));

console.log(lista);


const contadores = Contador.obtenerInstancia();
const otroContador = Contador.obtenerInstancia(); 
//const contador = new Contador();
//const otroContador = new Contador(5);

console.log(Contador);
console.log(otroContador)

