class Contador{

    static contadores: Contador[] = [];
    
    cuenta: number = 0;

    constructor(inicial: number = 0) {
        this.cuenta
    }

    incrementar() {

        if (this.cuenta === 10) {
            console.log("Se ha alcanzado el valor máximo");
        }
    
        else {this.cuenta++;}
        
    }

    
    
}


const contador = new Contador();
const otroContador = new Contador();


contador.incrementar();
contador.incrementar();
contador.incrementar();
contador.incrementar();
contador.incrementar();
contador.incrementar();
contador.incrementar();
contador.incrementar();
contador.incrementar();
contador.incrementar();
contador.incrementar();