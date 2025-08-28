class plato {
    nombre: string;
    precio: number;
    ingredientes: ingredientes[];
    plato: plato[];

    constructor(nombre: string, precio: number, ingredientes: ingredientes[]) {
        this.nombre = nombre;
        this.precio = precio;
        this.ingredientes = ingredientes;
        this.plato = [];
    }   
}

class ingredientes {
    nombre: string;
    cantidad: number;
    precio: number;
    
    get precioTotal(): number {
        return this.cantidad * this.precio;
    }
}