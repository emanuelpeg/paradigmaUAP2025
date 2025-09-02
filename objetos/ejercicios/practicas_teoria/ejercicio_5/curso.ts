import { alumnos } from "./alumnos";

export class curso extends alumnos {
    private capacidad: number;
    
    
 constructor(nombre: string, edad: number, curso: string) {
        super(nombre, edad, curso);   
    
}

    mostrarInformacion(): void {
        console.log(`Nombre: ${this.nombre}, Curso: ${this.curso}`);
    }


}