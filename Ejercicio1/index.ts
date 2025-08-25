import { biblioteca } from "./clases/Biblioteca";
import { Autor } from "./clases/Autor";

biblioteca.agregarLibro("El quijote", new Autor("Juan", "Pedro", "Biografía de Juan Pedro", new Date(1990, 1, 1)), "1234");
biblioteca.agregarLibro("Hábitos Atómicos", new Autor("James", "Clear", "Biografía de James Clear", new Date(1980, 1, 1)), "2345");
const libro = biblioteca.agregarLibro("1984", new Autor("Orwell", "George", "Biografía de George Orwell", new Date(1903, 1, 1)), "1984");

biblioteca.registrarSocio(31882, "Lucciano", "Curotto");
biblioteca.registrarSocio(20321, "Luca", "Giordana");
biblioteca.registrarSocio(32451, "Samuel", "Olmos");

console.log(libro.titulo, libro.autor.nombreCompleto, libro.isbn);