import { biblioteca } from "./clases/Biblioteca";

biblioteca.agregarAutor("Javier Castillo", "Escritor español de novelas de suspense", new Date("1987-03-10"));
biblioteca.agregarAutor("Taylor Jenkins Reid", "Autora estadounidense conocida por sus novelas contemporáneas", new Date("1983-12-02"));
biblioteca.agregarAutor("Joana Marcús", "Escritora española de literatura juvenil y fantasía", new Date("1990-07-15"));
biblioteca.agregarLibro("El juego del alma", "Javier Castillo", "1234");
biblioteca.agregarLibro("El regreso de Carrie Soto", "Taylor Jenkins Reid", "2345");
const libro = biblioteca.agregarLibro("Ciudades de humo", "Joana Marcús ", "1984");

biblioteca.registrarSocio(31882, "Evelyn", "Inostroza");
biblioteca.registrarSocio(20321, "Agostina", "Aranda");
biblioteca.registrarSocio(32451, "Amir", "Camargo");

console.log(libro.titulo, libro.autor, libro.isbn);
