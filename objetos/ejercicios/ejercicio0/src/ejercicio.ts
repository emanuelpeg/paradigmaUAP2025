class Contador {
    static contadores: Contador [] = [];
    cuenta: number;

    static getContadores(): Contador[] {
        return Contador.contadores;
    }

    constructor(inicial: number = 0) {
        if (inicial % 2 !== 0) {
            throw new Error("El valor debe ser un numero par");
        }
        this.cuenta = inicial;

        Contador.contadores.push(this);
    }

    incrementar(){
        this.cuenta++;
    }
}

const contador = new Contador();
const otroContador = new Contador(5);

contador.incrementar();

console.log(contador);
console.log(otroContador);

const lista = [1, 2, 3, 4, 5, "a", "b", "c"];
console.log(lista);

const lista2: Array<number | string | Array<number>> = [[1, 2, 3], 2, 3, 4, 5, "a", "b", "c"];
lista2.forEach(elemento => {console.log(elemento);});

function logElemento (elemento:  unknown){
    console.log(elemento);
}

lista2.forEach((elemento) => logElemento(elemento));

