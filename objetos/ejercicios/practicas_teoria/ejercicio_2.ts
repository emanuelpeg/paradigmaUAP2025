class bicicleta {
    numeroSerie: number;
    marca: string;
    descripcion: string;
    precio: number;
    partes : partes[];
}

class partes {
    numeroSerie: number;
    nombre: string;
    cantidad: number;
    precio: number;
    // Método para calcular el precio total de la parte
    get precioTotal(): number {
        return this.cantidad * this.precio;
    }
}

class ofertas {
    nombre: string;
    descuento: number;
    bicicletas: bicicleta[];
    // Método para aplicar el descuento a una bicicleta
    aplicarDescuento(bicicleta: bicicleta): number {
        return bicicleta.precio - (bicicleta.precio * this.descuento / 100);
    }
}