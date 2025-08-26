import { Autor } from "./clases/Autor";
import { biblioteca } from "./clases/Biblioteca";

biblioteca.agregarLibro("El quijote", new Autor("Matias","Soy pobre",1984), "1234");
biblioteca.agregarLibro("Hábitos Atómicos", new Autor("Lautaro","Soy rico",1347), "2345");
const libro = biblioteca.agregarLibro("1984", new Autor("Margarita","Soy monje",1234), "1984");

biblioteca.registrarSocio(31882, "Lucciano", "Curotto");
biblioteca.registrarSocio(20321, "Luca", "Giordana");
biblioteca.registrarSocio(32451, "Samuel", "Olmos");

console.log(libro.titulo, libro.autor, libro.isbn);
