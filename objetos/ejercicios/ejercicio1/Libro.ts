export class Libro {
    private _disponible: boolean = true;

    constructor(
        private _titulo: string,
        private _autor: string,
        private _isbn: string
    ) {}

    get titulo() {
        return this._titulo
    }
    get autor() {
        return this._autor
    }
    get isbn() {
        return this._isbn
    }

    get disponible() {
        return this._disponible
    }

    marcarComoPrestado() {
        this._disponible = false;
    }

    marcarComoDisponible() {
        this._disponible = true;
    }
}