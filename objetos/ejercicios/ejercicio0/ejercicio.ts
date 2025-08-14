// class Contador {
//     // static contadores: Contador[] = []; // static: hace que sea propio de la clase y no de la instancia
//     private static instancia: Contador | null = null;
//     private _cuenta: number = 0;

//     static getInstancia() {
//         if (this.instancia === null) {
//             this.instancia = new Contador();
//         }
//         return this.instancia;
//     }

//     private constructor(inicial: number = 0) {
//         if (inicial % 2 != 0) {
//             throw new Error("tiene que ser numero par");
//         }
//         this._cuenta = inicial;
//         // Contador.contadores.push(this);
//     }

//     incrementar() {
//         this._cuenta++;
//     }

//     static getContadores() {
//         // return Contador.contadores;
//     }

//     get cuenta() {
//         return this._cuenta;
//     }

//     set cuenta(valor: number) {
//         if (valor % 2 != 0) {
//             throw new Error("tiene que ser numero par");
//         }
//         this._cuenta = valor;
//     }
// }


// const contador = new Contador(2);
// contador.cuenta = 4;
// contador.incrementar();

// const contadorNuevo = new Contador(2);

// Contador.getContadores();

// console.log(contador);
// export const contador = Contador.getInstancia();
// const otroContador = Contador.getInstancia();

// console.log(contador === otroContador);

class Contador {
    private _numero: number = 0;

    constructor(num: number) {
        if (num >= 10) {
            throw new Error("no puede ser mayor a 10");
        }
        this._numero = num;
    }

    incrementar() {
        if (this._numero + 1 >= 10) {
            console.log("no puede ser mayor o igual a 10");
            return;
        }
        this._numero++;
        console.log(this._numero);
    }

    get numero() {
        return this._numero
    }

    set numero(valor: number) {
        if (valor >= 10) {
            throw new Error("no puede ser mayor a 10");
        }
        this._numero = valor;
    }
}

const contador = new Contador(0);
// contador.incrementar();

// console.log(contador.numero)

for (let i = 0; i < 12; i++) {
    try {
        contador.incrementar();
    } catch (error) {
        const err = error as Error; 
        console.log(err);
        
    }
}


