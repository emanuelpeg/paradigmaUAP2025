"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prestamo = void 0;
class Prestamo {
    socio;
    libro;
    esReferencia;
    constructor(socio, libro, esReferencia = false) {
        this.socio = socio;
        this.libro = libro;
        this.esReferencia = esReferencia;
    }
}
exports.Prestamo = Prestamo;
