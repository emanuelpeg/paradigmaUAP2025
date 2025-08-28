export class Autor {
    private static ultimoId: number = 0;
    private id: number;
    private nombre: string;
    private biografia: string;
    private anioNacimiento: number;

    constructor(nombre: string, biografia: string, anioNacimiento: number) {
        Autor.ultimoId++;
        this.id = Autor.ultimoId;
        this.nombre = nombre;
        this.biografia = biografia;
        this.anioNacimiento = anioNacimiento;
    }

    getId(): number {
        return this.id;
    }

    getNombre(): string {
        return this.nombre;
    }

    getBiografia(): string {
        return this.biografia;
    }

    getAnioNacimiento(): number {
        return this.anioNacimiento;
    }
}
