import { biblioteca } from "./Biblioteca";

biblioteca.agregarLibro("El quijote", "Cervantes", "1234");
biblioteca.agregarLibro("Hábitos Atómicos", "James Clear", "2345");
const libro = biblioteca.agregarLibro("1984", "Orwel", "1984");

biblioteca.registrarSocio(31882, "Lucciano", "Curotto");
biblioteca.registrarSocio(20321, "Luca", "Giordana");
biblioteca.registrarSocio(32451, "Samuel", "Olmos");

biblioteca.retirarLibro(31882, "1234");

console.log(libro.titulo, libro.autor, libro.isbn);
console.log(biblioteca.consultarEstadoSocio(31882));
console.log(biblioteca.consultarEstadoLibro("1234"));