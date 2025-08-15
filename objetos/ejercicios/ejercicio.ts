/*
type TipoEjercicio = { // type es para crear un alias o tipo persnalizado. 
                        // Cualquier objeto que use TipoEjercicio tendrá la propiedad texto que se string
    texto: string;
};

let numero = 1; // let es para varialbe mutables. Su valor puede cambiar.
const ejercicio: TipoEjercicio = { // const es variabel constante, significa que no podemos reasignala
    texto: "Hola, TypeScript!",    // : TipoEjercicio le dice a TypeScript que el objeto debe cumplir el tipo que definiste antes.
};

function incrementarNumero(cantidad: number): void { // void que no retorna ningun valor, solo hace una accion
    numero += cantidad;
}

console.log("hola mundo")
console.log(ejercicio.texto);
console.log(`Numero: ${numero}`);
incrementarNumero(5);
console.log("Numero incrementado: ", numero);
*/

class Contador {
    static contadores: Contador [] = []; // es un atributo de la clase, no de cada objeto. Guarda todas las instancias que se vayan creando. Se accede como Contador.contadores (no con .this)
    private _cuenta: number = 0; // lugar real donde se guarda el valor. Al ser privada, nadie puede hacer obj._cuenta = ... desde afuera.

    static getContadores(){ // es un metodo estatico de la clase. Se llama como Contador.getContadores(). Devuelve el arreglo con todas las instancias creadas hasta ahora.
        return Contador.contadores;
    }

    constructor(inicial: number = 0){ // valida que el valor incial sea par. Si no, lanza throw (una excepcion)
        if (inicial % 2 !== 0){
            throw new Error("El valor incial debe ser un numero par.");
        }
        this._cuenta = inicial; // asigna a esta instancia el valor incial validado.
        Contador.contadores.push(this); // agrega esta instancia al arreglo estatico de controladores
        this.incrementar(); //lo puedo usar porque esta dentro de la clase, ya afuera no xq es privado (encapsulacion)      
    }

    private incrementar(){ // solo puede llamarse dentro de la clase. Desde afuera, objContador.incrementar() daría error.
        this._cuenta++;
    }

    get cuenta(): number { // El nombre aquí (cuenta) no es el mismo que _cuenta.
                            //cuenta es lo que el mundo exterior ve. _cuenta es lo que la clase usa internamente.
        return this._cuenta;  // leo el valor real
    }

    set cuenta(v: number) {
        if (v % 2 !== 0) {
            throw new Error("Debe ser par.");
        }
        this._cuenta = v; // escribo el valor real
    }

}

const contador = new Contador();
const otroContador = new Contador();

otroContador.cuenta = 6; //no estamos escribiendo en _cuenta directo:
                        // estamos llamando al setter set cuenta(...) → que valida → y recién ahí guarda en _cuenta.

console.log(Contador.getContadores()); // [ Contador { _cuenta: 1 }, Contador { _cuenta: 6 } ]

console.log(contador);
console.log(otroContador);

console.log(contador.cuenta); // estamos llamando al getter get cuenta() → que devuelve _cuenta.
console.log(otroContador.cuenta);

const lista: Array<number | string | Array<number>> = [[1, 2, 3], 4, 5, 6, 7, "a", "b", "c"];
// const lista: declara una constante llamada lista.
// Array<number | string | Array<number>> es el tipo de datos que puede contener el array:
//      number --> puede hacer numeros sueltos (ej: 4, 5, 6, 7).
//      string --> puede haber strings (ej: "a", "b", "c").
//      Array<number> --> puede haber subarreglos que contengan solo números (ej: [1, 2, 3]).
console.log(lista);

const logElemento = (elemento: unknown) => console.log(elemento);
// esta es una fucnion de tipo flecha. En lugar de escribir:
// function logElemento(elemento: unknown) {
    //console.log(elemento);
// esamos esa estructura que son mas concisas y especiales para funciones pequeñas.
// Recibe como parametro un objeto cuyo tipo es known, que se le puede pasar cualquier cosa y la funcion escribe lo que recibe.
logElemento("Probado funcion flechaaa");
