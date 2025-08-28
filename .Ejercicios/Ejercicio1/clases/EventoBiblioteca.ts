export class EventoBiblioteca {
    constructor(
        private fecha: Date,
        private descripcion: string
    ){}
    get getFecha(){ return this.fecha; }
    get getDescripcion(){ return this.descripcion; }
}