interface IBuscable {
    buscarPor(criterio: string): Promise<any[]>;
    filtrar(condicion: (item: any) => boolean): Promise<any[]>;
}

class CatalogoBiblioteca implements IBuscable {
    private libros: any[] = [];

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
    private recursosOnline: any[] = [];

    async buscarPor(criterio: string): Promise<any[]> {
        return this.recursosOnline.filter(recurso =>
            recurso.titulo.toLowerCase().includes(criterio.toLowerCase()) ||
            recurso.contenido.toLowerCase().includes(criterio.toLowerCase())
        );
    }

    async filtrar(condicion: (item: any) => boolean): Promise<any[]> {
        return this.recursosOnline.filter(condicion);
    }
}

class ArchivoHistorico implements IBuscable {
    private documentosAntiguos: any[] = [];

    async buscarPor(criterio: string): Promise<any[]> {
        return this.documentosAntiguos.filter(doc =>
            doc.titulo.toLowerCase().includes(criterio.toLowerCase()) ||
            doc.periodo.toLowerCase().includes(criterio.toLowerCase())
        );
    }

    async filtrar(condicion: (item: any) => boolean): Promise<any[]> {
        return this.documentosAntiguos.filter(condicion);
    }
}

class BaseConocimiento implements IBuscable {
    private articulosAcademicos: any[] = [];

    async buscarPor(criterio: string): Promise<any[]> {
        return this.articulosAcademicos.filter(articulo =>
            articulo.titulo.toLowerCase().includes(criterio.toLowerCase()) ||
            articulo.abstract.toLowerCase().includes(criterio.toLowerCase()) ||
            articulo.keywords.some((kw: string) => kw.toLowerCase().includes(criterio.toLowerCase()))
        );
    }

    async filtrar(condicion: (item: any) => boolean): Promise<any[]> {
        return this.articulosAcademicos.filter(condicion);
    }
}

class BuscadorUniversal {
    private sistemas: IBuscable[] = [];

    agregarSistema(sistema: IBuscable) {
        this.sistemas.push(sistema);
    }

    async buscarEnTodos(criterio: string): Promise<any[]> {
        const resultados = await Promise.all(
            this.sistemas.map(sistema => sistema.buscarPor(criterio))
        );
        return resultados.flat();
    }

    async filtrarEnTodos(condicion: (item: any) => boolean): Promise<any[]> {
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
