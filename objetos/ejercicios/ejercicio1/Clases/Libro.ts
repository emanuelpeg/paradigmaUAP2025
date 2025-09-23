// objetos/ejercicios/ejercicio1/Clases/Libro.ts
export class Libro {
  constructor(
    public titulo: string,
    public autor: string,
    public isbn: string,
    public esReferencia: boolean = false
  ) {}
  obtenerInformacion(): string {
    return `${this.titulo} — ${this.autor} [${this.isbn}]${this.esReferencia ? " (Referencia)" : ""}`;
  }
}
