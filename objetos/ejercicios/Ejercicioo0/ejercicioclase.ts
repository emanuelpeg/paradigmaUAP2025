class Contador {
    private cuenta: number = 0;

    incrementar() {
        this.cuenta++;
        console.log(this.cuenta); // Muestra el valor actual cada vez
        if (this.cuenta === 10) {
            console.log("La cuenta ha llegado a 10");
        }
        if (this.cuenta > 10) {
            throw new Error("La cuenta ha superado el límite de 10");
        }
    }
}

// Ejemplo de uso con try...catch
const contador = new Contador();

try {
    for (let i = 0; i < 12; i++) {
        contador.incrementar();
    }
} catch (error) {
    console.error("Error capturado:", (error as Error).message);
}
