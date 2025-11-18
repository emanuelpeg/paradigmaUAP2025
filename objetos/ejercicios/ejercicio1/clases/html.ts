abstract class TipoPaquete {
    abstract calcularCosto(): number;
}

class SimpleNacional extends TipoPaquete {
    private peso: number;
    private costoXKg: number;

    constructor(peso: number, costoXKg: number) {
        super();
        this.peso = peso;
        this.costoXKg = costoXKg;
    }

    calcularCosto(): number {
        return this.peso * this.costoXKg; // Costo por kg
    }
}

class PaqueteInternacional extends TipoPaquete {
    private peso: number;
    private costoPorKg: number;
    private impuestoImportacion: number;

    constructor(peso: number, costoPorKg: number, impuestoImportacion: number) {
        super();
        this.peso = peso;
        this.costoPorKg = costoPorKg;
        this.impuestoImportacion = impuestoImportacion;
    }

    calcularCosto(): number {
        const costoBase = this.peso * this.costoPorKg;
        return costoBase + this.impuestoImportacion; // Costo base + impuesto
    }
}

class PaqueteCompuesto extends TipoPaquete {
    private nombre: string;
    private componentes: TipoPaquete[] = [];

    constructor(nombre: string) {
        super();
        this.nombre = nombre;
    }

    agregarPaquete(paquete: TipoPaquete): void {
        this.componentes.push(paquete);
    }

    calcularCosto(): number {
        return this.componentes.reduce(
            (total, paquete) => total + paquete.calcularCosto(),
            0
        );
    }
}

function imprimirCostos(paquetes: TipoPaquete[]): void {
    paquetes.forEach((paquete, index) => {
        console.log(`Costo del paquete ${index + 1}: $${paquete.calcularCosto().toFixed(2)}`);
    });
}

// Ejemplo de uso
const paquete1 = new SimpleNacional(10, 5); // 10 kg a $5/kg
const paquete2 = new PaqueteInternacional(8, 10, 50); // 8 kg a $10/kg + $50 impuesto

const paqueteCompuesto = new PaqueteCompuesto("Paquete Familiar");
paqueteCompuesto.agregarPaquete(new SimpleNacional(5, 4)); // 5 kg a $4/kg
paqueteCompuesto.agregarPaquete(new PaqueteInternacional(3, 12, 30)); // 3 kg a $12/kg + $30 impuesto

imprimirCostos([paquete1, paquete2, paqueteCompuesto]);



