import { Socio } from "./Socio";

export class EventoBiblioteca {
    private inscriptos: Socio[] = [];

    constructor(
        public nombre: string, 
        public fecha: Date, 
        public descripcion: string
    ) {}

    inscribir(socio: Socio): void {
        if (!this.inscriptos.includes(socio)) {
            this.inscriptos.push(socio);
        }
    }

    getInscriptos(): Socio[] {
        return [...this.inscriptos];
    }
}