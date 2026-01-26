import { biblioteca } from "./clases/Biblioteca";

biblioteca.agregarAutor("Cervantes", "Saavedra", new Date("1547-09-29"), "https://es.wikipedia.org/wiki/Miguel_de_Cervantes");
biblioteca.agregarAutor("James", "Clear", new Date("1986-01-22"), "https://jamesclear.com/");
biblioteca.agregarAutor("George", "Orwell", new Date("1903-06-25"), "https://es.wikipedia.org/wiki/George_Orwell");
biblioteca.agregarAutor("Isaac", "Asimov", new Date("1920-01-02"), "https://es.wikipedia.org/wiki/Isaac_Asimov");

biblioteca.agregarLibro("El quijote", "Cervantes Saavedra", "1234");
biblioteca.agregarLibro("Hábitos Atómicos", "James Clear", "2345");
biblioteca.agregarLibro("1984", "George Orwell", "1984");
biblioteca.agregarLibro("Fundación", "Isaac Asimov", "3456");
biblioteca.agregarLibro("Segunda Fundación", "Isaac Asimov", "4567");
biblioteca.agregarLibro("El fin de la eternidad", "Isaac Asimov", "5678");
biblioteca.agregarLibro("Otro Libro", "Cervantes Savedra","4444")

biblioteca.registrarSocio(31882, "Lucciano", "Curotto");
biblioteca.registrarSocio(20321, "Luca", "Giordana");
biblioteca.registrarSocio(32451, "Samuel", "Olmos");


biblioteca.retirarLibro(20321, "1234");
biblioteca.retirarLibro(20321, "4567");
biblioteca.retirarLibro(31882,"1234");


biblioteca.recomendarLibros(20321);
biblioteca.devolverLibro(20321, "1234");
biblioteca.librosPorAutor("Cervantes Saavedra");