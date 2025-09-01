import { biblioteca } from "./clases/Biblioteca";

biblioteca.agregarAutor("Miguel", "Cervantes", "Escritor español famoso por El Quijote.", 1547);
biblioteca.agregarAutor("James", "Clear","Autor de libros sobre hábitos y productividad.", 1979);
biblioteca.agregarAutor("Saint", "-Exupéry", "Aviador y escritor francés, autor de El Principito.", 1900);
biblioteca.agregarAutor("George", "Orwell", "Seudónimo de Eric Arthur Blair, escritor y periodista británico.", 1903);


biblioteca.agregarLibro("El quijote", "Miguel", "1234");
biblioteca.agregarLibro("Hábitos Atómicos", "James", "2345");
biblioteca.agregarLibro("El Principito", "Saint", "3456");
const libro = biblioteca.agregarLibro("1984", "George", "1984");

biblioteca.registrarSocio(31882, "Lucciano", "Curotto");
biblioteca.registrarSocio(20321, "Luca", "Giordana");
biblioteca.registrarSocio(32451, "Samuel", "Olmos");

console.log(libro.titulo, libro.autor, libro.isbn); 
console.log();
