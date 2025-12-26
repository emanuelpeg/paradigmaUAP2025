export class EventoBiblioteca {
    constructor(
        private _titulo: string,
        private _descripcion: string,
        private _fecha: Date
    ) {}

    get titulo() { return this._titulo }
    get descripcion() { return this._descripcion }
    get fecha() { return this._fecha }
}
