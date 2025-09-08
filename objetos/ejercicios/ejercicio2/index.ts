import { biblioteca } from "./clases/Biblioteca";
import { TipoLibro } from "./clases/Libro";
import { Socio, TipoSocio, Visitante } from "./clases/Socio";

biblioteca.agregarLibro("El quijote", "Cervantes", "1234", TipoLibro.FISICO);
biblioteca.agregarLibro("Hábitos Atómicos", "James Clear", "2345", TipoLibro.FISICO);
biblioteca.agregarLibro("Mi articulo especial", "Jared Peter", "5323", TipoLibro.ACADEMICO);
const libro = biblioteca.agregarLibro("1984", "Orwell", "1984", TipoLibro.FISICO);

biblioteca.registrarSocio(TipoSocio.VISITANTE, 31882, "Lucciano", "Curotto");
biblioteca.registrarSocio(TipoSocio.VISITANTE, 20321, "Luca", "Giordana");
const samu: Visitante = biblioteca.registrarSocio(TipoSocio.VISITANTE, 32451, "Samuel", "Olmos");

console.log(samu);

// console.log(libro.titulo, libro.autor, libro.isbn);
