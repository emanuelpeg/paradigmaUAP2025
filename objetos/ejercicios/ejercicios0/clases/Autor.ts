export class Autor
{
    id: number;
    nombre: string;
    apellido: string;
    nacionalidad: string;
    fechaNacimiento: Date;
    bibliografia?: string[] = [];

    constructor(id: number, nombre: string, apellido: string, nacionalidad: string, fechaNacimiento: Date, bibliografia: string[] = [])
    {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.nacionalidad = nacionalidad;
        this.fechaNacimiento = fechaNacimiento;
        this.bibliografia = bibliografia;
    }
}