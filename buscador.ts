import { Libro } from "./Libro";

export interface IBuscable {
    buscarPor(criterio: string): Libro[];
    filtrar(condicion: (libro: Libro) => boolean): Libro[];
}

export class CatalogoBiblioteca implements IBuscable {
    constructor(private inventario: Libro[]) { }

    buscarPor(criterio: string): Libro[] {
        return this.inventario.filter(
            (libro) =>
                libro.titulo.includes(criterio) ||
                libro.autor.includes(criterio) ||
                libro.isbn.includes(criterio)
        );
    }

    filtrar(condicion: (libro: Libro) => boolean): Libro[] {
        return this.inventario.filter(condicion);
    }
}

export class BibliotecaDigital implements IBuscable {
    constructor(private recursosOnline: Libro[]) { }

    buscarPor(criterio: string): Libro[] {
        return this.recursosOnline.filter(
            (libro) => libro.titulo.includes(criterio)
        );
    }

    filtrar(condicion: (libro: Libro) => boolean): Libro[] {
        return this.recursosOnline.filter(condicion);
    }
}

export class ArchivoHistorico implements IBuscable {
    // Lógica de búsqueda en documentos antiguos
    buscarPor(criterio: string): Libro[] {
        return [];
    }

    filtrar(condicion: (libro: Libro) => boolean): Libro[] {
        return [];
    }
}

export class BaseConocimiento implements IBuscable {
    // Lógica de búsqueda en artículos académicos
    buscarPor(criterio: string): Libro[] {
        return [];
    }

    filtrar(condicion: (libro: Libro) => boolean): Libro[] {
        return [];
    }
}

export class BuscadorUniversal {
    constructor(private sistemas: IBuscable[]) { }

    buscarEnTodosLosSistemas(criterio: string): Libro[] {
        const resultados: Libro[] = [];
        for (const sistema of this.sistemas) {
            resultados.push(...sistema.buscarPor(criterio));
        }
        return resultados;
    }
}