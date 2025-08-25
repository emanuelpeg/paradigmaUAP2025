import { Socio } from "./Socio";

export class EventoBiblioteca {
    constructor(
        public titulo: string,
        public descripcion: string,
        public fecha: Date,
        public sociosRegistrados: Socio[] = []
    ) {}

    registrarSocio(socio: Socio) {
        this.sociosRegistrados.push(socio);
    }
}
