// Clase para representar un autor (forma tradicional)
export class Autor {
    public nombre: string;
    public biografia: string;
    public anioNacimiento: number;

    constructor(nombre: string, biografia: string, anioNacimiento: number) {
        this.nombre = nombre;
        this.biografia = biografia;
        this.anioNacimiento = anioNacimiento;
    }
}
