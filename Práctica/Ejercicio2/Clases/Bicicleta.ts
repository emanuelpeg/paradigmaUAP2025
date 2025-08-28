class Bicicleta { //IProducto
    private numero: number;
    private descripcion: string;
    private bicipartes: BiciParte[] = [];

    getPrecioTotal() {
        //return this.bicipartes.reduce((total, parte) => total + parte.precio, 0);
        return;
    }
}