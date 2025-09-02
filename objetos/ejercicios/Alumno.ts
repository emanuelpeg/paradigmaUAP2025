export class alumno {
    private nombre: string;
    private edad: number;

    constructor(nombre: string, edad: number) {
        this.nombre = nombre;
        this.edad = edad;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public getEdad(): number {
        return this.edad;
    }

    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    public setEdad(edad: number): void {
        this.edad = edad;
    }
}