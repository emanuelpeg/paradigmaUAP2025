"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// objetos/ejercicios/index.ts
const Biblioteca_1 = require("./ejercicio1/Clases/Biblioteca");
Biblioteca_1.biblioteca.agregarLibro("El Principito", "Antoine de Saint-Exupéry", "987");
Biblioteca_1.biblioteca.agregarLibro("1984", "George Orwell", "654");
Biblioteca_1.biblioteca.agregarLibro("Fahrenheit 451", "Bradbury", "321");
Biblioteca_1.biblioteca.registrarSocio(36482, "Facu", "Sandoval");
Biblioteca_1.biblioteca.registrarSocio(12345, "Juan", "López");
Biblioteca_1.biblioteca.registrarSocio(67890, "Bruno", "Gimenez");
Biblioteca_1.biblioteca["inventario"].forEach((libro) => {
    console.log(`- ${libro.titulo} de ${libro.autor} (ISBN: ${libro.isbn})`);
});
