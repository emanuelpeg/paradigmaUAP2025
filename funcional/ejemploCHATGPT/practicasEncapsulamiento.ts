//EJERCICIO 1:
class CuentaBancaria {
    private saldoActual: number;
    private titular: string;

    constructor(saldoActual: number, titular: string) {
        this.saldoActual = saldoActual;
        this.titular = titular;
    }

    // Devuelve el saldoActual
    public getsaldoActual(): number {
        return this.saldoActual;
    }

    public depositar(cantidad: number): void {
        //al saldo actual le ponemos la cantidad
        this.saldoActual += cantidad;
        console.log(`Se depositaron ${cantidad} en la cuenta de ${this.titular}. Nuevo saldoActual: ${this.saldoActual}`);
    }

    public retirar(cantidad: number): void {
        if (cantidad > this.saldoActual) {
            console.log(`Fondos insuficientes en la cuenta de ${this.titular}`);
        } else {
            //al sadoActual le sacamos la cantidad 
            this.saldoActual -= cantidad;
            console.log(`Se retiraron ${cantidad} de la cuenta de ${this.titular}. Nuevo saldoActual: ${this.saldoActual}`);
        }
    }
}
//EJERCICIO 2:
class Estudiante {
    private nombre: string;
    private apellido: string;
    private notaFinal: number;

    constructor(nombre: string, apellido: string, notaFinal: number) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.notaFinal = notaFinal;
    }

    public getNotaFinal(): number {
        return this.notaFinal;
    }
    public setNotaFinal(notaFinal: number): void {
        this.notaFinal = notaFinal;
    }
}

//EJERCICIO 3:
class Producto {
    private nombre: string;
    private precio: number;

    constructor(nombre: string, precio: number) {
        this.nombre = nombre;
        this.precio = precio;
    }

    public setPrecio(nuevoPrecio: number): void {
        if (nuevoPrecio > 0) {
            this.precio = nuevoPrecio;
        } else {
            console.log("El precio debe ser un valor positivo.");
        }
    }

    public getPrecio(): number {
        return this.precio;
    }
}

//EJERCICIO 4:
class Libro {
    private titulo: string;
    private autor: string;
    private anioPublicacion: number;
    constructor(titulo: string, autor: string, anioPublicacion: number) {
        this.titulo = titulo;
        this.autor = autor;
        this.anioPublicacion = anioPublicacion;
    }

    public getTitulo(): string {
        return this.titulo;
    }

    public getAutor(): string {
        return this.autor;
    }

    public setAnioPublicacion(anio: number): void {
        this.anioPublicacion = anio;
    }
}

//EJERCICIO 5:
class Persona {
    private dni: number;
    private nombre: string;
    private edad: number;

    constructor(dni: number, nombre: string, edad: number) {
        this.dni = dni;
        this.nombre = nombre;
        this.edad = edad;
    }
    public getEdad(): number {
        return this.edad;
    }
    public setEdad(edad_: number): void {
        if (edad_ != 0 && edad_ > 0) {
            this.edad = edad_;
        } else {
            console.log(`Edad no válida: ${edad_}`);
        }
    }
}