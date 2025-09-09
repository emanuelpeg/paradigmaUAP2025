import { biblioteca } from "./clases/Biblioteca";
import { TipoSocio } from "./clases/Socio";

biblioteca.agregarLibro("El quijote", "Cervantes", "1234");
biblioteca.agregarLibro("Hábitos Atómicos", "James Clear", "2345");
const libro = biblioteca.agregarLibro("1984", "Orwell", "1984");

biblioteca.registrarSocio(TipoSocio.REGULAR,31882, "Lucciano", "Curotto");
biblioteca.registrarSocio(TipoSocio.REGULAR,20321, "Luca", "Giordana");
biblioteca.registrarSocio(TipoSocio.REGULAR,32451, "Samuel", "Olmos");

console.log(libro.titulo, libro.autor, libro.isbn);