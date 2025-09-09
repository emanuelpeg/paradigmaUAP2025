

export class Autor{
    nombre: string;
    biografia: string;
    añoNacimiento?: Date;

    constructor(nombre: string, biografia: string, añoNacimiento?: Date) {
        this.nombre = nombre;
        this.biografia = biografia;
        this.añoNacimiento = añoNacimiento;
    }

    
}