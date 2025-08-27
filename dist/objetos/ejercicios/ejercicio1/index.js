"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Biblioteca_1 = require("./Clases/Biblioteca");
Biblioteca_1.biblioteca.agregarLibro("El Principito", "Antoine de Saint-Exupéry", "987");
Biblioteca_1.biblioteca.agregarLibro("1984", "George Orwell", "654");
Biblioteca_1.biblioteca.agregarLibro("Fahrenheit 451", "Ray Bradbury", "321");
const facu = Biblioteca_1.biblioteca.registrarSocio(36482, "Facu", "Sandoval");
const juan = Biblioteca_1.biblioteca.registrarSocio(12345, "Juan", "Pérez");
const r1 = Biblioteca_1.biblioteca.prestarLibro(facu.id, "987");
console.log("Préstamo Principito a Facu:", r1);
const r2 = Biblioteca_1.biblioteca.prestarLibro(juan.id, "987");
console.log("Intento de Juan:", r2); // reservado: true
Biblioteca_1.biblioteca.devolverLibro(facu.id, "987"); // pasa a Juan automáticamente
const recs = Biblioteca_1.biblioteca.recomendarLibros(facu.id);
console.log("Recomendaciones para Facu:", recs.map(l => l.obtenerInformacion()));
