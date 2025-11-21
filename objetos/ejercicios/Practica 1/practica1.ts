class Plato{
    private nombre: string;
    private precio: number;
    private ingredientes: string[];

    constructor(nombre: string, precio: number, ingredientes: string[]) {
        this.nombre = nombre;
        this.precio = precio;
        this.ingredientes = ingredientes;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public getPrecio(): number {
        return this.precio;
    }

    public getIngredientes(): string[] {
        return this.ingredientes;
    }
}