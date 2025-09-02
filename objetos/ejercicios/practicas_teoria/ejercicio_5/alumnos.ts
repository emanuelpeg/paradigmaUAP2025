import { curso } from "./curso";

export class alumnos {
    codigo: number;
    nombre: string;
    apellido: string;
    notas: number[];
    validarNota: (nota: number) => boolean;
    promedio: () => number;
    isok: () => boolean;
    addNota: (nota: number) => void;
    curso: string;
        nivel: string;
    

    constructor(nombre: string, edad: number, curso: string) {
        this.codigo = Math.floor(Math.random() * 10000);
        this.nombre = nombre;
        this.apellido = "";
        this.curso = curso;
    }

    mostrarInformacion(): void {
        console.log(`Nombre: ${this.nombre}, Curso: ${this.curso}`);
    }


}