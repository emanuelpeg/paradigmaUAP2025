"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuscadorUniversal = exports.BaseConocimiento = exports.ArchivoHistorico = exports.BibliotecaDigital = exports.CatalogoBiblioteca = void 0;
class CatalogoBiblioteca {
    data;
    constructor(data) {
        this.data = data;
    }
    buscarPor(c) {
        return this.data.filter(l => (c.titulo ? l.titulo.toLowerCase().includes(c.titulo.toLowerCase()) : true) &&
            (c.autor ? l.autor.nombre.toLowerCase().includes(c.autor.toLowerCase()) : true) &&
            (c.isbn ? l.isbn === c.isbn : true));
    }
    filtrar(fn) { return this.data.filter(fn); }
}
exports.CatalogoBiblioteca = CatalogoBiblioteca;
class BibliotecaDigital {
    data;
    constructor(data) {
        this.data = data;
    }
    buscarPor(c) { return new CatalogoBiblioteca(this.data).buscarPor(c); }
    filtrar(fn) { return this.data.filter(fn); }
}
exports.BibliotecaDigital = BibliotecaDigital;
class ArchivoHistorico {
    data;
    constructor(data) {
        this.data = data;
    }
    buscarPor(c) { return new CatalogoBiblioteca(this.data).buscarPor(c); }
    filtrar(fn) { return this.data.filter(fn); }
}
exports.ArchivoHistorico = ArchivoHistorico;
class BaseConocimiento {
    data;
    constructor(data) {
        this.data = data;
    }
    buscarPor(c) { return new CatalogoBiblioteca(this.data).buscarPor(c); }
    filtrar(fn) { return this.data.filter(fn); }
}
exports.BaseConocimiento = BaseConocimiento;
class BuscadorUniversal {
    fuentes;
    constructor(fuentes) {
        this.fuentes = fuentes;
    }
    agregarFuente(f) { this.fuentes.push(f); }
    buscar(criterio) { return this.fuentes.flatMap(f => f.buscarPor(criterio)); }
    filtrar(condicion) { return this.fuentes.flatMap(f => f.filtrar(condicion)); }
}
exports.BuscadorUniversal = BuscadorUniversal;
