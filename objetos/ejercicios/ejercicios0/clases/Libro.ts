import { Socio } from "./Socio";
import { Autor } from "./Autor";

export class Libro {
    constructor(
        protected _titulo: string,
        protected _autorId: number,
        protected _isbn: string,
        public _disponible: boolean = true,
        protected _cola: Socio[] = []
    ) {}

    get getTitulo() { return this._titulo;}
    get getAutor() { return this._autorId; }
    get getIsbn() { return this._isbn; }
    get isDisponible() { return this._disponible; }
    get getCola() { return this._cola; }
}