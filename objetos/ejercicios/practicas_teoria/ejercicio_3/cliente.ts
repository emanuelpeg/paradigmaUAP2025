export class cliente {
    nombre: string;
    cuit: number;  
    apellido: string;
    direccion: string;
    // Constructor para inicializar las propiedades del cliente
    constructor(nombre: string, cuit: number, apellido: string, direccion: string) {
        this.nombre = nombre;
        this.cuit = cuit;
        this.apellido = apellido;
        this.direccion = direccion;
    }
    
}
