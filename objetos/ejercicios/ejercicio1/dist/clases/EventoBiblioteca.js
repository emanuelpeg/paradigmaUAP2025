"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventoBiblioteca = void 0;
class EventoBiblioteca {
    titulo;
    fecha;
    descripcion;
    constructor(titulo, fecha, descripcion = "") {
        this.titulo = titulo;
        this.fecha = fecha;
        this.descripcion = descripcion;
    }
}
exports.EventoBiblioteca = EventoBiblioteca;
