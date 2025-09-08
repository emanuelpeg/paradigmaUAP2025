import { IBuscable } from "./IBuscable";
import { Libro } from "./Libro";

// Ejemplo de tipos para cada sistema
type RecursoDigital = { titulo: string; url: string };
type DocumentoHistorico = { titulo: string; año: number };
type ArticuloAcademico = { titulo: string; autores: string[] };

// Catálogo de libros físicos
export class CatalogoBiblioteca implements IBuscable<Libro> {
	constructor(private libros: Libro[]) {}
	buscarPor(criterio: (item: Libro) => boolean): Libro[] {
		return this.libros.filter(criterio);
	}
	filtrar(condicion: (item: Libro) => boolean): Libro[] {
		return this.libros.filter(condicion);
	}
}

// Biblioteca digital
export class BibliotecaDigital implements IBuscable<RecursoDigital> {
	constructor(private recursos: RecursoDigital[]) {}
	buscarPor(criterio: (item: RecursoDigital) => boolean): RecursoDigital[] {
		return this.recursos.filter(criterio);
	}
	filtrar(condicion: (item: RecursoDigital) => boolean): RecursoDigital[] {
		return this.recursos.filter(condicion);
	}
}

// Archivo histórico
export class ArchivoHistorico implements IBuscable<DocumentoHistorico> {
	constructor(private documentos: DocumentoHistorico[]) {}
	buscarPor(criterio: (item: DocumentoHistorico) => boolean): DocumentoHistorico[] {
		return this.documentos.filter(criterio);
	}
	filtrar(condicion: (item: DocumentoHistorico) => boolean): DocumentoHistorico[] {
		return this.documentos.filter(condicion);
	}
}

// Base de conocimiento
export class BaseConocimiento implements IBuscable<ArticuloAcademico> {
	constructor(private articulos: ArticuloAcademico[]) {}
	buscarPor(criterio: (item: ArticuloAcademico) => boolean): ArticuloAcademico[] {
		return this.articulos.filter(criterio);
	}
	filtrar(condicion: (item: ArticuloAcademico) => boolean): ArticuloAcademico[] {
		return this.articulos.filter(condicion);
	}
}

// Buscador universal
export class BuscadorUniversal {
	constructor(private sistemas: IBuscable<any>[]) {}

	buscarEnTodos(criterio: (item: any) => boolean): any[] {
		// Busca en todos los sistemas y concatena resultados
		return this.sistemas.flatMap(s => s.buscarPor(criterio));
	}

	filtrarEnTodos(condicion: (item: any) => boolean): any[] {
		return this.sistemas.flatMap(s => s.filtrar(condicion));
	}
}
