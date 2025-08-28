class Contador {
    private _cuenta: number;

    incrementarValor(){
        if (this._cuenta >= 10) {
            console.log("Límite alcanzado");
        }
        this._cuenta++;
        if (this._cuenta === 10) {
            console.log("¡Cuenta alcanzó el límite de 10!");
        }
    }
}
export const contador = new Contador();


