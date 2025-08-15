/* Paradigmas: clase contador en ts con una sola instancia q solo tenga incrementar, 
cada vez q se llama se incrementa en 1 y cdo llega a 10 muestra un mensaje, 
y no se puede incrementar mas de 10
*/

class Contador2{
    cuenta: number; // cuando se crea el objeto, este recibe la propiedad cuenta se inicializa en el constructor

    constructor(numero: number = 0){ // aqui se inicializa la propiedad cuenta, con el valor pasado o 0.
        this.cuenta = numero;
    }

    public incrementarCuenta(){
        if (this.cuenta >= 10){
            console.log("No se puede incrementar mas de 10!..");
            return -1;
        }
        else{
            this.cuenta++;
            console.log(`Cuenta: ${this.cuenta}`);
        }
    }
}

const contadorr = new Contador2();
for (let i = 0; i < 15 ; i++){
    let resultado = contadorr.incrementarCuenta();
    if (resultado == -1){
        break;
    }
}


// Segunda forma de resolver la actividad
// A tener en cuenta: 
//  - Si inicializás en la declaración, el valor siempre va a ser ese salvo que lo cambies después.
//  - Si inicializás en el constructor, podés decidir el valor inicial cuando creás la instancia.

class Contador3{
    cuenta: number = 0; // al crearse el objeto ya se inicializa el valor de la propiedad cuenta
    constructor(){ // constructor vacio porque no hay nada que inicializar
    }
}


