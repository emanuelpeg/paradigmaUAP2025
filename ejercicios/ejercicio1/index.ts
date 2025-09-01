import { biblioteca } from "./clases/Biblioteca";
import { Libro } from "./clases/Libro";

biblioteca.agregarLibro("El quijote", "Cervantes", "1234")
biblioteca.agregarLibro("Atomic Habits", "James Clear", "2345");
biblioteca.agregarLibro("1984", "Orwell", "1984");

biblioteca.registrarSocio(31882, "Lucciano", "Curroto")
biblioteca.registrarSocio(20331, "Luca", "Giordana")
biblioteca.registrarSocio(32451, "Samuel", "Olmos")

console.log(libro.titulo, libro.autor, libro.isbn)