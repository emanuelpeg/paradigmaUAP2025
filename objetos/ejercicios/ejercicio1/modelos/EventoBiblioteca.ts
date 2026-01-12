import { Usuario } from "../modelos/Usuario";

export class EventoBiblioteca {
    private inscriptos: Usuario[] = [];

    constructor(
        public nombre: string, 
        public fecha: Date, 
        public descripcion: string
    ) {}

    inscribir(usuario: Usuario): void {
        if (!this.inscriptos.includes(usuario)) {
            this.inscriptos.push(usuario);
        }
    }

    getInscriptos(): Usuario[] {
        return [...this.inscriptos];
    }
}