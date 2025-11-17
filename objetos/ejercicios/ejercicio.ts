// type Ejercicio = {
//   texto: string;
// }
// let numero = 5; //variable que cambia
// const ejercicio: Ejercicio = { //variable que no cambia
//   texto: "Este es un ejercicio de TypeScript"
// };

// function incrementarNumero(cantidad: number): void {
//   numero += cantidad; //incrementa el número
// }
// console.log("Hola mundo");
// console.log(ejercicio.texto);
// console.log(`El número es: ${numero}`);
// incrementarNumero(3);
// console.log(`El número incrementado es: ${numero}`);

class Contador {
    cuenta: number = 0;
    static contadores: Contador[] = [];

    constructor(inicial: number = 0) {
        this.cuenta = inicial;
        Contador.contadores.push(this);
    }
    incrementar() {
        this.cuenta++;
    }
    getContadores(): Contador[] {
        return Contador.contadores;
    }
}
const lista: Array<Contador | string | Array<number>> = ["Hola", new Contador(5), "Mundo",[1, 2, 3]];
const contador = new Contador();
const contador2 = new Contador();
for (let i = 0; i < 10; i++) {
    contador.incrementar();
    console.log(contador.cuenta);
    if (contador.cuenta === 10){
        console.log("El contador ha llegado a 10");
    }
}

console.log(contador);
lista.forEach((elemento) => {console.log(elemento);});