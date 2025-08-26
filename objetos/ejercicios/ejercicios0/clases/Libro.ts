import { Socio } from "./Socio";

export class Libro {
    constructor(
        protected _titulo: string,
        protected _autor: string,
        protected _isbn: string,
        public _disponible: boolean = true,
        protected _cola: Socio[] = []
    ) {}

    get getTitulo() { return this._titulo;}
    get getAutor() { return this._autor; }
    get getIsbn() { return this._isbn; }
    get isDisponible() { return this._disponible; }
    get getCola() { return this._cola; }
}