export class Libro {
    _titulo;
    _autor;
    _isbn;
    _reservas = [];
    constructor(_titulo, _autor, _isbn) {
        this._titulo = _titulo;
        this._autor = _autor;
        this._isbn = _isbn;
    }
    get titulo() {
        return this._titulo;
    }
    get autor() {
        return this._autor;
    }
    get isbn() {
        return this._isbn;
    }
    get reservas() {
        return this._reservas;
    }
}
