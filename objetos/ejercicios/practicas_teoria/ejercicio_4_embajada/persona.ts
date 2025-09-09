import { arbol_genealogico } from "./arbol_genealogico";

export class persona {
    private dni: string;
    private nombre: string;
    private apellido: string;
    private nacionalidad: string;
    private papa: persona[];
    private mama: persona[];
    private arbol: arbol_genealogico;
    

    constructor(nombre: string, edad: number, dni: string) {
        this.nombre = nombre;
        this.apellido = "";
        this.nacionalidad = "";
        this.dni = dni;
    }

   
    public getDni(): string {
        return this.dni;
    }

     public getNombre(): string {
        return this.nombre;
    }

    public getApellido(): string {
        return this.apellido;

}
}