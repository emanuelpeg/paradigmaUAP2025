import { Alumno } from './Alumno';

function main(): void {
    let unAlumno = new Alumno("Pedro", 3489394);
    unAlumno.nota1 = 44;
    unAlumno.nota2 = 88;
    unAlumno.nota3 = 98;
    console.log(unAlumno.promedio())
}

// Llamar al método main
main();