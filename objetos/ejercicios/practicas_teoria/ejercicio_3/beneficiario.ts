import { cliente } from "./cliente";

export class beneficiario extends cliente{
    fechaNacimiento: Date;
    constructor(nombre: string, cuit: number, apellido: string, direccion: string, fechaNacimiento: Date) {
        super(nombre, cuit, apellido, direccion);
        this.fechaNacimiento = fechaNacimiento;
    }
}   
