export class Libro {

    constructor(
        private _titulo: string,
        private _autor: string,
        private _isbn: string,
        private _anioPublicacion: number,
        private _genero : string,
        private _disponible: boolean = true
    ) {}


    get titulo(): string { return this._titulo; }
    get autor(): string { return this._autor; }
    get isbn(): string { return this._isbn; }
    get anioPublicacion(): number | undefined { return this._anioPublicacion; }
    get genero(): string | undefined { return this._genero; }
    get disponible(): boolean { return this._disponible; }


    set disponible(estado: boolean) { this._disponible = estado; }

    toString(): string {
        return `${this._titulo} - ${this._autor} (${this._isbn})`;
    }

    esDeEpocaReciente(): boolean {
        if (!this._anioPublicacion) return false;
        return this._anioPublicacion >= 2000;
    }
}