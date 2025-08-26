type Email = string;

export class EventoBiblioteca {
    public email: Email[] = [];
    
  constructor(
    public tipo: "clubes de lectura" | "charlas de autores" | "talleres de escritura",
    public socioId: number,
    public fecha: Date = new Date()
  ) {}
}