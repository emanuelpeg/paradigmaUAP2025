"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Autor = void 0;
class Autor {
    nombre;
    biografia;
    anioNacimiento;
    constructor(nombre, biografia = "", anioNacimiento) {
        this.nombre = nombre;
        this.biografia = biografia;
        this.anioNacimiento = anioNacimiento;
    }
}
exports.Autor = Autor;
