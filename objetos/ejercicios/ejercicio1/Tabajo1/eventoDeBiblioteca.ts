//clase para representar un evento en la biblioteca
export class EventoBiblioteca {
    public nombre: string;
    public descripcion: string;
    public fecha: Date;
    public sociosRegistrados: number[];

    constructor(nombre: string, descripcion: string, fecha: Date, sociosRegistrados: number[] = []) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.fecha = fecha;
        this.sociosRegistrados = sociosRegistrados;
    }
}
