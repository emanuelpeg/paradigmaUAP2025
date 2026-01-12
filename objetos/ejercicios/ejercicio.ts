
/*
type TipoEjercicio = { //type sirve para describir tipos, describe como debe estar construido el objeto TipoEjercicio.
                        //A diferencia de class, no se le pueden poner metodos o constructores dentro. Tampoco creas
                        //objetos en vase al type sino variables como const t = TipoEjercicio {texto: "Hola"}
    texto: string;
};

let numero = 1; //let es una forma de definir variables en ts que se pueden reasignar (su valor puede cambiar) y puede ser de cualquier tipo (int, string)
const ejercicio: TipoEjercicio = { //variable de tipo TipoEjercicio. const es como let NO se puede reasignar (aunque si es un objeto o array se puede modificar su contenido)
    texto: "Hola, TypeScript!",
};

function incrementarNumero(cantidad: number): void { //Funcion que no devuelve nada (:void) solo incrementa la variable numero al ser llamado (y cuantas veces segun el numero pasado como parametro)
    numero += cantidad;
}

console.log("hola mundo")
console.log(ejercicio.texto);
console.log("Numero: ${numero}");
incrementarNumero(5);
console.log("Numero incrementado: ", numero);

//------------------------------------------------------------------------------------------------------------------

class Contador {
    static contadores: Contador [] = []; //contadores es un atributo de tipo lista de Contador, y empieza siendo una lista vacia. Static porque sera el mismo valor para cada objeto
    cuenta: number = 0;

    static getContadores(){
        return Contador.contadores; //Clase para obtener los contadores
    }

    constructor(inicial: number = 0){ //constructor que se llama cada vez que se crea un objeto Contador,
    //opcionalmente se puede pasar como parametro un numero que representara inicialmente la cuenta del contador
        if (inicial % 2 !== 0){ //Si el numero inicial (la cuenta) es impar no es valido
            throw new Error("El valor incial debe ser un numero par.");
        }
        this.cuenta = inicial; //this es para acceder a los atributos que pertenezcan al objeto, si es par se guarda el numero como cuenta
        Contador.contadores.push(this); //Tambien añadimos este contador a la lista de contadores
        //this.incrementar(); //lo puedo usar porque esta dentro de la clase, ya afuera no xq es privado (encapsulacion)
        
    }

    private incrementar(){
        this.cuenta++;
    }

    getCuenta(){
        return this.cuenta;
    }

    setCuenta(valor: number){ //Otra forma de setear la cuenta de un contador validandola (serviria si fuese privado el atributo, de esta manera estaria siempre controlado que la cuenta no sea impar, aunque de momento solo validamos que incialmente no sea impar)
        if (valor % 2 !== 0){
            throw new Error("El valor incial debe ser un numero par.");
        }
        this.cuenta = valor;
        //stackoverflow? que pasa si pongo this._cuenta?
    }
}

const contador = new Contador();
const otroContador = new Contador();

otroContador.cuenta = 7; //No es inicial, es correcto que sea impar.

console.log(Contador.getContadores());

console.log(contador);
console.log(otroContador);

//contador.incrementar();
console.log(contador);
console.log(otroContador);

const lista: Array<number | string | Array<number>> = [[1, 2, 3], 4, 5, 6, 7, "a", "b", "c"]; //Declara una lista cuyos elementos pueden ser: number o string o Array<number>.
//El primer elemento es un array de números ([1,2,3]), después hay números sueltos y luego strings.
//Sintaxis alternativa equivalente (a veces más legible):   const lista: (number | string | number[])[] = ...
console.log(lista);

const logElemento = (elemento: unknown) => console.log(elemento); //Creo una función que la guardo en una variable llamada logElemento la cual recibe cualquier cosa (unknown) y la imprime en consola.
//uknown significa: "no sé qué tipo es todavía, podría ser cualquier cosa", pero a diferencia de any, te obliga a verificar el tipo antes de usarlo para hacer operaciones.
*/

//Tarea: clase contador en ts con una sola instancia q solo tenga incrementar, cda vez q se llama se incrementa en 1 
//y cdo llega a 10 muestra un mensaje, y no se puede incrementar mas de 10

//Mi version
class Contador{
    cont: number = 0

    public incr(){
        if (this.cont >= 10){
            throw new Error("El contador no puede ser mayor a 10")
        }
        this.cont++;
        if(this.cont == 10){
            console.log("El contador ha alcanzado el valor maximo: 10")
        }
    }
}

//Version singleton
class Contador1 {
    private static _instancia: Contador1 | null = null; //para almacenar la unica instancia posible (puede ser el objeto Contador1 o null), empieza siendo null.
    private _cont = 0; //privado para que nadie pueda modificarlo desde afuera a no ser que sea con el incr

    private constructor() {} //impide new Contador() desde afuera

    static instancia(): Contador1 { //metodo para crear la unica instancia posible. Es static porque no debemos depender de que haya un objeto creado para llamarlo. El : Contador es que devuelve un objeto de tipo Contador
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
    get valor() { //Para obtener el valor de _cont si lo desea. El get permite acceder a un atributo privado como si fuera publico, sin poder modificarlo, se usa asi: c.valor
        return this._cont
    }
}

const c = Contador1.instancia(); //uso

c.incr();