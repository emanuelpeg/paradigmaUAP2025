class Conta{
    private valor: number = 0;

    incrementar() {
        this.valor++;
        if (this.valor === 10) {
            console.log('¡El contador llegó a 10!');
        }
        else {
            console.log(`El contador está en: ${this.valor}`);
        }
    }
}

// Ejemplo de uso:
const conta = new Conta();
for (let i = 0; i < 12; i++) {
    conta.incrementar();
}