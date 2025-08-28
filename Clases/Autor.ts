// Autor.ts
export class Autor {
    constructor(
        public nombre: string,
        public biografia: string = "",
        public nacimiento: number | null = null
    ) {}

    toString(): string {
        const año = this.nacimiento ? `(${this.nacimiento})` : "";
        return `${this.nombre} ${año}`;
    }
}