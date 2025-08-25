import { Autor } from "./modelos/Autor";
import { biblioteca } from "./modelos/biblioteca";
import { EventoBiblioteca } from "./modelos/EventoBiblioteca";

const muchos = new Autor("Muchos", "muchos autores que escriben el libro", 578)
const tolkien = new Autor("JRR Tolkien", "el autor de el senor de los anillos", 1918)
const cervantes = new Autor("Cervantes", "ni idea quien es este", 1827)
const JamesClean = new Autor("James Clean", "ni idea quien es este", 1827)
const GeorgeOrwell = new Autor("George Orwell", "ek que escribio 1984", 1984)

biblioteca.agregarLibro("Biblia", muchos, "12ce3", '*');
biblioteca.agregarLibro("El senor de los anillos", tolkien, "j34l5", "fantasia");
biblioteca.agregarLibro("Silmarillion", tolkien, "83jks", "fantasia");
biblioteca.agregarLibro("The hobbit", tolkien, "12345", "fantasia");
biblioteca.agregarLibro("El quijote", cervantes, "jd923", "novela");
biblioteca.agregarLibro("Habitos atomicos", JamesClean, "osif2", "lifestyle");
biblioteca.agregarLibro("1984", GeorgeOrwell, "m391j", "novela");
biblioteca.agregarLibro("no se, novela", JamesClean, "m391s", "novela");

const yo = biblioteca.agregarSocio(36046, "Jared", "Peter");
const Lenny = biblioteca.agregarSocio(37909, "Lenny", "Martinez");
const Abiel = biblioteca.agregarSocio(21070, "Abiel", "Morenoo");
biblioteca.agregarSocio(45023, "Christian", "Montero");

biblioteca.retrarLibro(yo.id, biblioteca.libros[1].isbn);
biblioteca.retrarLibro(yo.id, biblioteca.libros[2].isbn);
biblioteca.retrarLibro(yo.id, biblioteca.libros[7].isbn);

biblioteca.retrarLibro(Lenny.id, biblioteca.libros[1].isbn);
biblioteca.retrarLibro(Abiel.id, biblioteca.libros[1].isbn);

const evento = new EventoBiblioteca('lectura');

yo.subscribirseEvento(evento);

const ahora = new Date();
ahora.setHours(ahora.getHours() + 10)
evento.agregarNotificacion('lectura de tolkien en 5', ahora);

yo.recomendar();

// yo.salirEvento(evento);
// yo.listarNotificaciones();