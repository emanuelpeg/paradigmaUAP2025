export class Autor {
    toLowerCase() {
        throw new Error("Method not implemented.");
    }
    constructor(
        public nombre: string,
        public biografia: string,
        public anioNacimiento: number
    ) {}
}
