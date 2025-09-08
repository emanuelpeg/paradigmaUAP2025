//EJERCICIO 1:
class Vehiculo {
    protected marca: string;
    protected modelo: string;

    constructor(marca: string, modelo: string) {
        this.marca = marca;
        this.modelo = modelo;
    }
    public mostrarInfo(): string {
        return `${this.marca} ${this.modelo}`;
    }
}

class Auto extends Vehiculo {
    private numPuertas: number;

    constructor(marca: string, modelo: string, numPuertas: number) {
        super(marca, modelo);
        this.numPuertas = numPuertas;
    }

    public mostrarDetalles(): string {
        return `${super.mostrarInfo()} - Puertas: ${this.numPuertas}`;
    }
}

class Moto extends Vehiculo {
    private cilindrada: number;

    constructor(marca: string, modelo: string, cilindrada: number) {
        super(marca, modelo);
        this.cilindrada = cilindrada;
    }

    public mostrarDetalles(): string {
        return `${super.mostrarInfo()} - cilindrada: ${this.cilindrada}`;
    }
}

const miAuto = new Auto("Toyota", "Corolla", 4);
console.log(miAuto.mostrarDetalles());
const miMoto = new Moto("Honda", "CBR600RR", 600);
console.log(miMoto.mostrarDetalles());

//EJERCICIO 2:
class Empleado {
    protected nombre: string;
    protected sueldo: number;
    constructor(nombre: string, sueldo: number) {
        this.nombre = nombre;
        this.sueldo = sueldo;
    }
    public mostrarSueldo(): number {
        return this.sueldo;
    }
}
class Gerente extends Empleado {
    private departamento: string;
    constructor(nombre: string, sueldo: number, departamento: string) {
        super(nombre, sueldo);
        this.departamento = departamento;
    }
    public mostrarInfo(): string {
        return `${super.mostrarSueldo()} - Nombre: ${this.nombre} - Departamento: ${this.departamento}`;
    }
}
class Programador extends Empleado {
    private lenguaje: string[];

    constructor(nombre: string, sueldo: number, lenguaje: string[]) {
        super(nombre, sueldo);
        this.lenguaje = lenguaje;
    }
    public mostrarInfo(): string {
        return `${super.mostrarSueldo()} - Nombre: ${this.nombre} - Lenguaje: ${this.lenguaje}`;
    }
}
const gerente = new Gerente("Ana", 5000, "Ventas");
console.log(gerente.mostrarInfo());
const programador = new Programador("Luis", 4000, ["JavaScript", "Python"]);
console.log(programador.mostrarInfo());

//EJERCICIO 3:
class Animal {
    protected nombre: string;
    protected edad: number;
    constructor(nombre: string, edad: number) {
        this.nombre = nombre;
        this.edad = edad;
    }
    public hacerSonido(): void {
        console.log("El animal hace un sonido");
    }
}

class Perro extends Animal {
    constructor(nombre: string, edad: number) {
        super(nombre, edad);
    }
    public hacerSonido(): void {
        return console.log(`${this.nombre} dice: Guau Guau`);
    }
}
class Gato extends Animal {
    constructor(nombre: string, edad: number) {
        super(nombre, edad);
    }
    public hacerSonido(): void {
        return console.log(`${this.nombre} dice: Miau Miau`);
    }
}
const perro = new Perro("Rex", 3);
console.log(perro.hacerSonido());
const gato = new Gato("Michi", 2);
console.log(gato.hacerSonido());

//EJERCICIO 4:
class Electrodomestico {
    protected marca: string;
    protected precio: number;

    constructor(marca: string, precio: number) {
        this.marca = marca;
        this.precio = precio;
    }
    public mostrarInfo(): string {
        return `Marca: ${this.marca} - Precio: ${this.precio}`;
    }
}
class Lavadora extends Electrodomestico {
    private capacidad: number;
    constructor(marca: string, precio: number, capacidad: number) {
        super(marca, precio);
        this.capacidad = capacidad;
    }
    public mostrarInfo(): string {
        return `${super.mostrarInfo()} - Capacidad: ${this.capacidad}`;
    }
}
class Heladera extends Electrodomestico {
    private volumen: number;
    constructor(marca: string, precio: number, volumen: number) {
        super(marca, precio);
        this.volumen = volumen;
    }
    public mostrarInfo(): string {
        return `${super.mostrarInfo()} - Volumen: ${this.volumen}`;
    }
}
const lavadora = new Lavadora("LG", 800, 10);
console.log(lavadora.mostrarInfo());
const heladera = new Heladera("Samsung", 1200, 300);
console.log(heladera.mostrarInfo());

//EJERCICIO 5:
class CuentaBancaria_ {
    protected titular: string;
    protected saldo: number;

    constructor(titular: string, saldo: number) {
        this.titular = titular;
        this.saldo = saldo;
    }
    public mostrarSaldo(): number {
        return this.saldo;
    }
}
class CuentaAhorros extends CuentaBancaria_ {
    private interes: number;
    constructor(titular: string, saldo: number, interes: number) {
        super(titular, saldo);
        this.interes = interes;
    }
    public calcularInteres(): number {
        return this.saldo * this.interes;
    }
}
class CuentaCorriente extends CuentaBancaria_ {
    private limite: number;
    constructor(titular: string, saldo: number, limite: number) {
        super(titular, saldo);
        this.limite = limite;
    }
    public mostrarLimite(): number {
        return this.limite;
    }
}
const cuentaAhorros = new CuentaAhorros("Pedro", 1000, 0.05);
console.log(cuentaAhorros.mostrarSaldo());
console.log(cuentaAhorros.calcularInteres());

const cuentaCorriente = new CuentaCorriente("Maria", 2000, 500);
console.log(cuentaCorriente.mostrarSaldo());
console.log(cuentaCorriente.mostrarLimite());