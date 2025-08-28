"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventoBiblioteca = void 0;
class EventoBiblioteca {
    titulo;
    fecha;
    descripcion;
    asistentes = [];
    constructor(titulo, fecha, descripcion = null) {
        this.titulo = titulo;
        this.fecha = fecha;
        this.descripcion = descripcion;
    }
    registrar(socio) {
        if (!this.asistentes.find((s) => s.id === socio.id)) {
            this.asistentes.push(socio);
        }
    }
    desregistrar(socio) {
        this.asistentes = this.asistentes.filter((s) => s.id !== socio.id);
    }
    listarAsistentes() {
        return this.asistentes.map((s) => s.nombreCompleto);
    }
}
exports.EventoBiblioteca = EventoBiblioteca;
