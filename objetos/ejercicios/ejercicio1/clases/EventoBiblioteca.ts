export class EventoBiblioteca {
    constructor(
        public nombre: string,
        public descripcion: string,
        public fecha: Date,
        public sociosRegistrados: number[] = [] // IDs de socios
    ) {}
}
