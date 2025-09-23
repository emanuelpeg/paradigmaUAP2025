"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buscarEnLibros = buscarEnLibros;
function buscarEnLibros(libros, c) {
    const t = c.titulo?.toLowerCase();
    const a = c.autor?.toLowerCase();
    const i = c.isbn?.toLowerCase();
    return libros.filter((l) => {
        const okT = t ? l.titulo.toLowerCase().includes(t) : true;
        const okA = a ? l.autor.toLowerCase().includes(a) : true;
        const okI = i ? l.isbn.toLowerCase().includes(i) : true;
        return okT && okA && okI;
    });
}
