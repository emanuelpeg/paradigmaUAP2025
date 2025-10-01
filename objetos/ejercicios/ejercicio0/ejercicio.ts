class Contador {
    //static contadores: Contador[] = [];
    private static instancia: Contador | null = null;
    private _cuenta: number;

    static getInstancia() {
        if (this.instancia === null) {
            this.instancia = new Contador();
        }
        return this.instancia;
    }

    static getContadores() {
        return Contador.contadores;
    }

    private constructor(inicial: number = 0) {
        if (inicial % 2 !== 0) {
            throw new Error('El valor inicial debe ser par');
        }
        this._cuenta = inicial;
        Contador.contadores.push(this);
    }

    get cuenta() {
        return this.cuenta;
    }

    set cuenta(valor: number) {
        if (inicial % 2 !== 0) {
            throw new Error('El valor inicial debe ser par');
        }
        this._cuenta = valor;
    }

    private incrementar() { //private solo se puede acceder desde dentro del objeto
        this.cuenta++;
    }
}

const contador = Contador.getInstancia();
const otroContador = Contador.getInstancia();

Contador.cuenta = 8;


console.log(Contador.getContadores()) 