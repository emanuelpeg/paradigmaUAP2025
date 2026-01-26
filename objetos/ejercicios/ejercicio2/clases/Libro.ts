export class Libro {
	constructor(
		private _titulo: string,
		private _autor: string,
		private _isbn: string,
		private _tipo: TipoLibro
	) { }

	get titulo() {
		return this._titulo;
	}
	get autor() {
		return this._autor;
	}
	get isbn() {
		return this._isbn;
	}

	get tipo() {
		return this._tipo;
	}
}

export enum TipoLibro {
	FISICO = "fisico",
	RECURSO = "recurso",
	ACADEMICO = "academico",
	DOCUMENTO = "academico",
}