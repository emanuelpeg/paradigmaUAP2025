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




// ------------------------------------------------------------------------------------------------------------------------
//Version singleton
class Contador1 {
    private static _instancia: Contador1 | null = null; //para almacenar la unica instancia posible (puede ser el objeto Contador1 o null), empieza siendo null.
    private _cont = 0; //privado para que nadie pueda modificarlo desde afuera a no ser que sea con el incr

    private constructor() {} //impide new Contador() desde afuera

    static instancia(): Contador1 { //metodo para crear la unica instancia posible. Es static porque no debemos depender de que haya un objeto creado para llamarlo.
        if (!this._instancia) this._instancia = new Contador1(); //si no existia ya una instancia, la crea
        return this._instancia; //y la devuelve para que podamos por ejemplo almacenar en una variable al objeto
        //Aunque _instancia sea un atributo privado, se puede usar desde afuera. Esto es posible porque privada significa que solo se puede acceder directamente a esa variable desde dentro de la clase, pero si un método público de la misma clase la devuelve, entonces ese método funciona como un “puente” hacia afuera.
    }

    incr(): void { //no siempre es necesario colocar el void si es facil deducir para ts que no devuelve nada, pero es buena practica
        if (this._cont >= 10) { //Si se llama pero el cont del objeto ya habia sido incrementado 10 veces
        throw new Error("El contador no puede ser mayor a 10");
        }
        this._cont++; //Si el cont era menor a 10 entonces si incrementa
        if (this._cont === 10) {
        console.log("El contador ha alcanzado el valor máximo: 10"); //Si esa vez que se incremento fue justo la 10, avisa
        }
    }
    get valor() { //Para obtener el valor de _cont si lo desea
        return this._cont
    }
}

const c = Contador1.instancia(); //uso


