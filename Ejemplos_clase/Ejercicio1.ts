type TipoEjercicio ={
    texto: string;
};

let numero =1;
const ejercicio: TipoEjercicio ={
    texto: "hola, TypeScript",
};

function incrementarNumero(cantidad: number): void{
    numero += cantidad;
}

console.log("hola mundo");
console.log(ejercicio.texto);
console.log(`Número : ${numero}`);
incrementarNumero(5);
console.log("Numero incrementado: "+numero);

class Contador{
    static contadores: Contador[] = [];
    cuenta:number =0;
static getContadores(){
    return Contador.contadores;
}
    constructor(inicial: number = 0){
        this.cuenta = inicial; //this es para acceder a los atributos del objeto
        Contador.contadores.push(this);//agrega la instacia del objeto
    }
    incrementarNumero(){
        this.cuenta++;
    }
}
const contador = new Contador();
const otroContador = new Contador();
console.log(contador);
console.log(otroContador);
console.log(Contador.getContadores());
let aura:number=0;

class Contaduria{
aura++;    
}