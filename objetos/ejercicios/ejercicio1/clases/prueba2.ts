interface Vehiculo {
    puedeCargar (peso: number): boolean;
}

class Camion extends Vehiculo {
    private capacidadMaximaKg: number;
    private pesoActualKg: number;
    private pesoPaquetesKg: number;

    constructor (capacidadMaximaKg: number, pesoActualKg: number, pesoPaquetesKg: number) {
        super(capacidadMaximaKg, pesoActualKg);
        this.pesoPaquetesKg = pesoPaquetesKg;
    }

    puedeCargar(peso: number): boolean {
        if (peso > this.capacidadMaximaKg){
            return false;
        }
        else{
            this.pesoActualKg + peso;
            return true;
        }
    }
}