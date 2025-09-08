//EJERCICIO 1:
interface Figura {
    calcularArea(): number;
}
class Circulo implements Figura {
    private radio: number;

    constructor(radio: number) {
        this.radio = radio;
    }

    public calcularArea(): number {
        return Math.PI * Math.pow(this.radio, 2);
    }
}
class Rectangulo implements Figura {
    private ancho: number;
    private alto: number;
    constructor(ancho: number, alto: number) {
        this.ancho = ancho;
        this.alto = alto;
    }
    public calcularArea(): number {
        return this.ancho * this.alto;
    }
}
class Triangulo implements Figura {
    private base: number;
    private altura: number;

    constructor(base: number, altura: number) {
        this.base = base;
        this.altura = altura;
    }
    public calcularArea(): number {
        return (this.base * this.altura) / 2;
    }
}
const figuras: Figura[] = [
    new Circulo(5),
    new Rectangulo(4, 6),
    new Triangulo(3, 7),
];
for (const figura of figuras) {
    console.log(`Área: ${figura.calcularArea()}`);
}

//EJERCICIO 2:
interface Instrumento {
    tocar(): void;
}
class Guitarra implements Instrumento {
    public tocar(): void {
        console.log("Tocando la guitarra");
    }
}
class Piano implements Instrumento {
    public tocar(): void {
        console.log("Tocando el piano");
    }
}
class Bateria implements Instrumento {
    public tocar(): void {
        console.log("Tocando la batería");
    }
}
const instrumentos: Instrumento[] = [
    new Guitarra(),
    new Piano(),
    new Bateria()
];
for (const instrumento of instrumentos) {
    instrumento.tocar();
}
//EJERCICIO 3:
interface MetodoPago {
    pagar(monto: number): void;
}
class TarjetaCredito implements MetodoPago {
    public pagar(monto: number): void {
        console.log(`Pagando ${monto} con tarjeta de crédito`);
    }
}
class PayPal implements MetodoPago {
    public pagar(monto: number): void {
        console.log(`Pagando ${monto} con PayPal`);
    }
}
class TransferenciaBancaria implements MetodoPago {
    public pagar(monto: number): void {
        console.log(`Pagando ${monto} con transferencia bancaria`);
    }
}
const metodosPago: MetodoPago[] = [
    new TarjetaCredito(),
    new PayPal(),
    new TransferenciaBancaria()
];
//polimorfismo xq cada uno responde de manera distinta al mismo metodo
for (const metodo of metodosPago) {
    metodo.pagar(100);
}

