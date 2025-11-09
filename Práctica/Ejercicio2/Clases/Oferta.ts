class Oferta {
    private productos: Producto[] = [];

    getPrecioTotal() {
        const totalBicipartes = this.bicipartes.reduce((total, parte) => total + parte.precio, 0);
        const totalBicicletas = this.bicicletas.reduce((total, bici) => total + bici.getPrecioTotal(), 0);
        const total = totalBicipartes + totalBicicletas;
        return total-(total*0.2);
    }
}