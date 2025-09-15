interface IBuscable {
    buscarPor(criterio: string): Promise<any[]>;
    filtrar(condicion: (item: any) => boolean): Promise<any[]>;
}

class CatalogoBiblioteca implements IBuscable {
    private libros: any[];

    constructor() {
        this.libros = []; // En una implementación real, esto vendría de una base de datos
    }

    async buscarPor(criterio: string): Promise<any[]> {
        return this.libros.filter(libro => 
            libro.titulo.toLowerCase().includes(criterio.toLowerCase()) ||
            libro.autor.toLowerCase().includes(criterio.toLowerCase())
        );
    }

    async filtrar(condicion: (item: any) => boolean): Promise<any[]> {
        return this.libros.filter(condicion);
    }
}

class BibliotecaDigital implements IBuscable {
    private recursos: any[];

    constructor() {
        this.recursos = []; // En una implementación real, esto vendría de una API
    }

    async buscarPor(criterio: string): Promise<any[]> {
        return this.recursos.filter(recurso =>
            recurso.titulo.toLowerCase().includes(criterio.toLowerCase()) ||
            recurso.contenido.toLowerCase().includes(criterio.toLowerCase())
        );
    }

    async filtrar(condicion: (item: any) => boolean): Promise<any[]> {
        return this.recursos.filter(condicion);
    }
}

class ArchivoHistorico implements IBuscable {
    private documentos: any[];

    constructor() {
        this.documentos = []; // En una implementación real, esto vendría de un archivo
    }

    async buscarPor(criterio: string): Promise<any[]> {
        return this.documentos.filter(doc =>
            doc.titulo.toLowerCase().includes(criterio.toLowerCase()) ||
            doc.periodo.toLowerCase().includes(criterio.toLowerCase())
        );
    }

    async filtrar(condicion: (item: any) => boolean): Promise<any[]> {
        return this.documentos.filter(condicion);
    }
}

class BaseConocimiento implements IBuscable {
    private articulos: any[];

    constructor() {
        this.articulos = []; // En una implementación real, esto vendría de una base de datos académica
    }

    async buscarPor(criterio: string): Promise<any[]> {
        return this.articulos.filter(articulo =>
            articulo.titulo.toLowerCase().includes(criterio.toLowerCase()) ||
            articulo.abstract.toLowerCase().includes(criterio.toLowerCase()) ||
            articulo.autores.join(', ').toLowerCase().includes(criterio.toLowerCase())
        );
    }

    async filtrar(condicion: (item: any) => boolean): Promise<any[]> {
        return this.articulos.filter(condicion);
    }
}

class BuscadorUniversal {
    private sistemas: IBuscable[];

    constructor() {
        this.sistemas = [];
    }

    agregarSistema(sistema: IBuscable) {
        this.sistemas.push(sistema);
    }

    async busquedaGlobal(criterio: string): Promise<any[]> {
        const resultados = await Promise.all(
            this.sistemas.map(sistema => sistema.buscarPor(criterio))
        );
        return resultados.flat();
    }

    async filtradoGlobal(condicion: (item: any) => boolean): Promise<any[]> {
        const resultados = await Promise.all(
            this.sistemas.map(sistema => sistema.filtrar(condicion))
        );
        return resultados.flat();
    }
}

export {
    IBuscable,
    CatalogoBiblioteca,
    BibliotecaDigital,
    ArchivoHistorico,
    BaseConocimiento,
    BuscadorUniversal
};
