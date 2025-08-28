/*

type TipoEjercicio = {
    texto: string;
}

let numero = 1; 
const ejercicio: TipoEjercicio = {
 texto: "Hola"
};


function incremetarNumero

console.log(`Numero: ${numero}`);
console.log(ejercicio.texto);
*/
/*
if (1>2) {
    console.log("La condición es verdadera");
} else {
    console.log("La condición es falsa");
}

while (numero < 5) {
    numero++;
    console.log(`Numero: ${numero}`);
}

for (let i = 0; i < 5; i++) {
    console.log(`Numero: ${i}`);
}
*/

//TIPO DE ATRIVUTIS
//public
//provate

//export para que sea visible desde otros modulos
export class Contador {
    //static contadores: Contador[] = [];
    private static instancia: Contador | null;
    Cuenta: number = 0;

    static getInstancia(){
        if(this.instancia === null){
            this.instancia = new Contador();
        }
        return this.instancia;
    }

    ///static getContadores(){//hace que el metodo se pueda usar fuera de la instacia 
   //     return Contador.contadores;
   // }

    private constructor(inicial: number = 0){
        this.Cuenta = inicial;
        Contador
    }
    incrementar (){
        if (this.Cuenta < 10){
             this.Cuenta++;
        }
       else{
        console.log("el contador ya llego a 10")
       }
    }
    getCuenta(){
        return this.Cuenta;
    }
}

//const contador = Contador.getInstancia();
const contador3 = Contador.getInstancia();

for (let i = 0; i < 10; i++) {
    contador3.incrementar();
    console.log(contador3.getCuenta());
}

//console.log(contador.getCuenta());

//son la misa isntancia, porque solo confiramos que solo sea una
//console.log(contador === contador3);



//const contador2 = new Contador();

//console.log(Contador.getContadores());

/*

const lista: number[] = [1,2,3]
const lista2: Array<number | Array<number>> = [4,5,6,[7,8]]


lista.forEach((elemento) => {console.log(elemento)});



console.log(contador);
console.log(contador2);


contador2.incrementar();

console.log(contador);
console.log(contador2);
*/