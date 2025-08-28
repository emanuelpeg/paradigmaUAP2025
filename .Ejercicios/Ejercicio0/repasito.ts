type Ejercicio = {
    texto: string;
}

// Variables mutables
let numero = 1;

// Variables inmutables
const ejercicio: Ejercicio = {
    texto: "Hola, TypeScript!"
}

function incrementarNumero(cantidad: number): void {
    numero += cantidad;
}

console.log("hola mundo");
console.log(ejercicio.texto);
console.log('Número: ${numero}');
incrementarNumero(5);
console.log("Número incrementado: " + numero);

