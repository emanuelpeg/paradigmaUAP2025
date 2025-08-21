import { Autor } from "./modelos/Autor";
import { biblioteca } from "./modelos/biblioteca";

const muchos = new Autor("Muchos", "muchos autores que escriben el libro", 578)
const tolkien = new Autor("JRR Tolkien", "el autor de el senor de los anillos", 1918)
const cervantes = new Autor("Cervantes", "ni idea quien es este", 1827)
const JamesClean = new Autor("James Clean", "ni idea quien es este", 1827)
const GeorgeOrwell = new Autor("George Orwell", "ek que escribio 1984", 1984)

biblioteca.agregarLibro("Biblia", muchos, "12ce3");
biblioteca.agregarLibro("El senor de los anillos", tolkien, "j34l5");
biblioteca.agregarLibro("Silmarillion", tolkien, "83jks");
biblioteca.agregarLibro("El quijote", cervantes, "jd923");
biblioteca.agregarLibro("Habitos atomicos", JamesClean, "osif2");
biblioteca.agregarLibro("1984", GeorgeOrwell, "m391j");

const yo = biblioteca.agregarSocio(36046, "Jared", "Peter");
const Lenny = biblioteca.agregarSocio(37909, "Lenny", "Martinez");
const Abiel = biblioteca.agregarSocio(21070, "Abiel", "Morenoo");
biblioteca.agregarSocio(45023, "Christian", "Montero");

biblioteca.retrarLibro(yo.id, biblioteca.libros[0].isbn);
biblioteca.retrarLibro(yo.id, biblioteca.libros[1].isbn);

biblioteca.retrarLibro(Lenny.id, biblioteca.libros[1].isbn);
biblioteca.retrarLibro(Abiel.id, biblioteca.libros[1].isbn);

// console.log(yo.librosPrestados);

// biblioteca.devolverLibro(yo.id, biblioteca.libros[1].isbn)

// console.log(yo.librosPrestados);
// console.log(Lenny.librosPrestados);

console.log(tolkien.listarLibros());