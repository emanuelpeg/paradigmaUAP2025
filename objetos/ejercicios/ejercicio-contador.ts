/**
 * EJERCICIO: Implementar patrón Singleton con Contador
 * 
 * Requisitos:
 * 1. Crear una clase Contador que implemente el patrón Singleton (una sola instancia)
 * 2. La clase debe tener un método incrementar() que aumente el contador en 1
 * 3. Cuando el contador llegue a 10, mostrar un mensaje en consola
 * 4. No permitir que el contador supere el valor de 10
 * 5. Proporcionar un método para obtener el valor actual del contador
 * 
 * Conceptos a aplicar:
 * - Patrón Singleton
 * - Encapsulación (propiedades privadas)
 * - Control de flujo (validaciones)
 * - Métodos públicos e instancia única
 */

class Contador {
    private static _instancia: Contador;
    private _cantidad: number;

    private constructor() {
        this._cantidad = 0;
    }

    public static getInstancia(): Contador {
        if (!Contador._instancia) {
            Contador._instancia = new Contador();
        }
        return Contador._instancia;
    } 

    public incrementar(): void {
        if (this._cantidad < 10) {
            this._cantidad++;
            if (this._cantidad === 10) {
                console.log(`¡El contador ha alcanzado el límite máximo de ${this._cantidad}!`)
            }
        } else {
            console.log(`El contador ya ha alcanzado el límite de ${this._cantidad} y no se puede incrementar más.`);
        }
    }

    public getCantidad(): number {
    return this._cantidad;
    }
}

// Ejemplo de uso:
const contador1 = Contador.getInstancia();
const contador2 = Contador.getInstancia();

console.log(contador1 === contador2); // true - misma instancia

// Probando incrementos
for (let i = 0; i < 12; i++) {
    contador1.incrementar();
    console.log(`Valor actual: ${contador1.getCantidad()}`);
}