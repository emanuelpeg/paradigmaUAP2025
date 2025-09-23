"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Alumno_1 = require("./Alumno");
function main() {
    let unAlumno = new Alumno_1.Alumno("Pedro", 3489394);
    unAlumno.add(44);
    unAlumno.add(88);
    unAlumno.add(98);
    console.log(unAlumno.promedio());
}
// Llamar al método main
main();
