import { Libro } from "./Libro";

export interface IConsultable {
    consultarPor(criterio: string): Libro[];
    filtrar(condicion: (libro: Libro) => boolean): Libro[];
}

export class CatalogoGeneral implements IConsultable {
    constructor(private coleccion: Libro[]) { }

    consultarPor(criterio: string): Libro[] {
        return this.coleccion.filter(
            (libro) =>
                libro.titulo.includes(criterio) ||
                libro.autor.includes(criterio) ||
                libro.isbn.includes(criterio)
        );
    }

    filtrar(condicion: (libro: Libro) => boolean): Libro[] {
        return this.coleccion.filter(condicion);
    }
}

export class BaseDatosDigital implements IConsultable {
    constructor(private recursosOnline: Libro[]) { }

    consultarPor(criterio: string): Libro[] {
        return this.recursosOnline.filter(
            (libro) => libro.titulo.includes(criterio)
        );
    }

    filtrar(condicion: (libro: Libro) => boolean): Libro[] {
        return this.recursosOnline.filter(condicion);
    }
}

export class ArchivoAntiguo implements IConsultable {
    consultarPor(criterio: string): Libro[] {
        return [];
    }

    filtrar(condicion: (libro: Libro) => boolean): Libro[] {
        return [];
    }
}

export class BaseConocimiento implements IConsultable {
    consultarPor(criterio: string): Libro[] {
        return [];
    }

    filtrar(condicion: (libro: Libro) => boolean): Libro[] {
        return [];
    }
}

export class BuscadorTotal {
    constructor(private sistemas: IConsultable[]) { }

    buscarEnTodasLasFuentes(criterio: string): Libro[] {
        const resultados: Libro[] = [];
        for (const sistema of this.sistemas) {
            resultados.push(...sistema.consultarPor(criterio));
        }
        return resultados;
    }
}