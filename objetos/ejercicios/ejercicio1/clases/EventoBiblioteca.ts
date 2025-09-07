
export class EventoBiblioteca{
    constructor(
        public nombre: string,
        public descripcion: string,
        public fecha: Date,
        public sociosRegistros: number[] = []
    ){}

     registrarSocio(socioId: number) {
    if (!this.sociosRegistros.includes(socioId)) {
      this.sociosRegistros.push(socioId);
    }
     
    }
}