/*

type Ejercicio = {
    texto: string;
};

let numero = 1;
const ejercicio1: Ejercicio = {
    texto: "Hola TypeScript",
};

function incrementarNumero(incremento: number): void {
    numero += incremento;
}

console.log("Hola mundo");
console.log(ejercicio1.texto);
console.log("Número: ${numero}");
incrementarNumero(5);
console.log(`Número incrementado: ${numero}`);









class Contador {
    static contadores: Contador[] = [];
    cuenta: number = 0;
    constructor(inicial: number = 0){
        this.cuenta = inicial;
    }

    incrementar(){
        this.cuenta++;
    }


}

const lista: number[] = [1, 2, 3, 4, 5];
console.log(lista);


const contador = new Contador();
const otroContador = new Contador(5);

console.log(contador);
console.log(otroContador);
*/


class Contador{
    private contador: number = 0;

    public incrementar(){
        if(this.contador < 10) {
            this.contador++;
        }

       if(this.contador ===10){

            console.log("El contador llegó a 10");
       }
    }
}
export { Contador };