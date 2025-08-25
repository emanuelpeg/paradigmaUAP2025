export class Libro {
    private titulo: string;
    private autor: string;
    private isbn: string;

    constructor(
        protected _titulo: string,
        protected _autor: string,
        protected _isbn: string
    ) {}

    public getTitulo(): string { return this._titulo;}
    public getAutor(): string { return this._autor; }
    public getIsbn(): string { return this._isbn; }
}