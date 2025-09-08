//PILAR 1: ENCAPSULACIÓN:
class MiClase {
    private atributo1: string;
    private atributo2: number;

    constructor(atributo1: string, atributo2: number) {
        this.atributo1 = atributo1;
        this.atributo2 = atributo2;
    }

    // Método público para acceder a atributo1
    public getAtributo1(): string {
        return this.atributo1;
    }

    // Método público para modificar atributo1
    public setAtributo1(valor: string): void {
        this.atributo1 = valor;
    }
}

//////////////////////////////////////////////////////////
//PILAR 2: HERENCIA:
class Padre {
    protected atributo: string;

    constructor(atributo: string) {
        this.atributo = atributo;
    }

    public metodoPadre(): void {
        console.log("Método de la clase padre");
    }
}

class Hijo extends Padre {
    private otroAtributo: number;

    constructor(atributo: string, otroAtributo: number) {
        super(atributo); // Llama al constructor de la clase padre
        this.otroAtributo = otroAtributo;
    }

    public metodoHijo(): void {
        console.log("Método de la clase hija");
    }
}

///////////////////////////////////////////////////////////
//PILAR 3: POLIMORFISMO:
// Definimos una interfaz común
interface NombreInterface {
    realizarAccion(): void;
}

// Varias clases implementan la interfaz con su propia lógica
class ClaseA implements NombreInterface {
    realizarAccion(): void {
        console.log("Acción de ClaseA");
    }
}

class ClaseB implements NombreInterface {
    realizarAccion(): void {
        console.log("Acción de ClaseB");
    }
}

class ClaseC implements NombreInterface {
    realizarAccion(): void {
        console.log("Acción de ClaseC");
    }
}

// Usamos polimorfismo: todas son del tipo NombreInterface
const objetos: NombreInterface[] = [
    new ClaseA(),
    new ClaseB(),
    new ClaseC()
];

// Ejecutamos la acción en todos los objetos, cada uno responde según su clase
for (const obj of objetos) {
    obj.realizarAccion();
}

//////////////////////////////////////////////////
//diseño 4: COMPOSICIÓN:
class ComponenteA {
    hacerAlgo(): void {
        console.log("ComponenteA haciendo algo");
    }
}

class ComponenteB {
    hacerOtraCosa(): void {
        console.log("ComponenteB haciendo otra cosa");
    }
}

// Clase principal que usa composición
class ClasePrincipal {
    private componenteA: ComponenteA;
    private componenteB: ComponenteB;

    constructor() {
        this.componenteA = new ComponenteA();
        this.componenteB = new ComponenteB();
    }

    ejecutar(): void {
        this.componenteA.hacerAlgo();
        this.componenteB.hacerOtraCosa();
    }
}


