"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Alumno = void 0;
class Alumno {
    nombre;
    dni;
    notas = [];
    constructor(nombre, dni) {
        this.nombre = nombre;
        this.dni = dni;
    }
    promedio() {
        var acu = 0;
        for (const nota of this.notas) {
            acu += nota;
        }
        return acu / this.notas.length;
    }
    add(nota) {
        this.notas.push(nota);
    }
}
exports.Alumno = Alumno;
