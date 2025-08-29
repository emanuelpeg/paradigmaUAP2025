export abstract class Usuario {
    constructor(
        public nombre: string,
        public id: string,
        public email: string
    ) {}

    abstract puedeTomarPrestado(): boolean;
    abstract getMaxLibros(): number;
    abstract puedeTenerLibroReferencia(): boolean;
}
