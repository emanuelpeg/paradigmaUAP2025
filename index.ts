import { Biblioteca, biblioteca } from "./clases/Biblioteca";

// Corregido: parámetros correctos para registrarSocio (id, nombre, apellido)
biblioteca.agregarLibro("1984", "George Orwell", "1234567890");
biblioteca.agregarLibro("Hábitos Atómicos", "James Clear", "12345");

// El método registrarSocio solo debe recibir 3 parámetros (id, nombre, apellido)
biblioteca.registrarSocio(1, "Ornell", "Apellido");

// Corregido: declaración de variable (sin punto antes de 'libro')
const libro = biblioteca.agregarLibro("El Principito", "Antoine de Saint-Exupéry", "978-3-16-148410-0");

biblioteca.registrarSocio(38456, "Brisa", "Arizmendi");
biblioteca.registrarSocio(38437, "Leandro", "Bender");
biblioteca.registrarSocio(38438, "María", "González");

