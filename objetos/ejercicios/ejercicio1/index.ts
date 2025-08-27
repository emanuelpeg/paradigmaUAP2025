import { biblioteca } from "./Clases/Biblioteca";

biblioteca.agregarLibro("El Principito", "Antoine de Saint-Exupéry", "987");
biblioteca.agregarLibro("1984", "George Orwell", "654");
biblioteca.agregarLibro("Fahrenheit 451", "Ray Bradbury", "321");

const facu = biblioteca.registrarSocio(36482, "Facu", "Sandoval");
const juan = biblioteca.registrarSocio(12345, "Juan", "Pérez");

const r1 = biblioteca.prestarLibro(facu.id, "987");
console.log("Préstamo Principito a Facu:", r1);

const r2 = biblioteca.prestarLibro(juan.id, "987");
console.log("Intento de Juan:", r2); // reservado: true

biblioteca.devolverLibro(facu.id, "987"); // pasa a Juan automaticamente

const recs = biblioteca.recomendarLibros(facu.id);
console.log("Recomendaciones para Facu:", recs.map(l => l.obtenerInformacion()));

