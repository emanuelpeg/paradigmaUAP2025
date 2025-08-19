import { biblioteca } from "./modelos/biblioteca";

biblioteca.agregarLibro("Biblia", "Muchos", "12ce3");
biblioteca.agregarLibro("El senor de los anillos", "JRR Tolkien", "j34l5");
biblioteca.agregarLibro("Silmarillion", "JRR Tolkien", "83jks");
biblioteca.agregarLibro("El quijote", "Cervantes", "jd923");
biblioteca.agregarLibro("Habitos atomicos", "James Clean", "osif2");
biblioteca.agregarLibro("1984", "George Orwell", "m391j");

const yo = biblioteca.agregarSocio(36046, "Jared", "Peter");
const Lenny = biblioteca.agregarSocio(37909, "Lenny", "Martinez");
const Abiel = biblioteca.agregarSocio(21070, "Abiel", "Morenoo");
biblioteca.agregarSocio(45023, "Christian", "Montero");

biblioteca.retrarLibro(yo.id, biblioteca.libros[0].isbn);
biblioteca.retrarLibro(yo.id, biblioteca.libros[1].isbn);

biblioteca.retrarLibro(Lenny.id, biblioteca.libros[1].isbn);
biblioteca.retrarLibro(Abiel.id, biblioteca.libros[1].isbn);

console.log(yo.librosPrestados);

biblioteca.devolverLibro(yo.id, biblioteca.libros[1].isbn)

console.log(yo.librosPrestados);
console.log(Lenny.librosPrestados);
