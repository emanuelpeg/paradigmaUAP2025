class ContadorEjemplo {
    static contadores: ContadorEjemplo[] = [];
    cuenta: number;

    static getContadores() {
        return ContadorEjemplo.contadores;
    }

    constructor(inicial: number = 0) {
        this.cuenta = inicial;
        ContadorEjemplo.contadores.push(this);
        this.incrementar();
    }

    incrementar() {
        this.cuenta++;
    }


}

const contador = new ContadorEjemplo();
const stringContador = new ContadorEjemplo(5);

console.log(contador); // cuenta should be 1
console.log(stringContador); // cuenta should be 6

contador.incrementar();
console.log(contador); // cuenta should be 2
console.log(stringContador); // cuenta should still be 6