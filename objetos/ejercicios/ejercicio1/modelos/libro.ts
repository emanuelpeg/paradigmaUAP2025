export class Libro {
    constructor(
        private _titulo: string,
        private _autor: string,
        private _isbn: string,
        private _disponible: boolean = true
    ) { }

    estaDisponible(libroISBN: number) {
        return this._disponible;
    }

    get titulo() { return this._titulo; }
    get autor() { return this._autor; }
    get isbn() { return this._isbn; }
    get disponible() { return this.disponible; }
    set disponible(disponible: boolean) { this._disponible = disponible; }
}