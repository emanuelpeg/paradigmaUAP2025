import { Autor } from "./clases/Autor";
import { Libro } from "./clases/Libro";
import { Biblioteca } from "./clases/Biblioteca";
import { EventoBiblioteca } from "./clases/EventoBiblioteca";
import { Recomendador } from "./clases/Recomendador";

// Crear autores
const autor1 = new Autor("Gabriel García Márquez", "Colombiano, Nobel", 1927);
const autor2 = new Autor("Julio Cortázar", "Argentino, surrealista", 1914);

// Crear libros
const libro1 = new Libro("Cien años de soledad", autor1, "ISBN001");
const libro2 = new Libro("Rayuela", autor2, "ISBN002");
const libro3 = new Libro("El otoño del patriarca", autor1, "ISBN003");

// Crear biblioteca y agregar libros/socios
const biblioteca = new Biblioteca();
const socio1 = biblioteca.registrarSocio(1, "Ana", "Perez");
const socio2 = biblioteca.registrarSocio(2, "Luis", "Gomez");
biblioteca.agregarLibro(libro1.titulo, libro1.autor.nombre, libro1.isbn);
biblioteca.agregarLibro(libro2.titulo, libro2.autor.nombre, libro2.isbn);
biblioteca.agregarLibro(libro3.titulo, libro3.autor.nombre, libro3.isbn);

// Préstamo y devolución
biblioteca.retirarLibro(socio1.id, "ISBN001"); // Ana toma prestado "Cien años de soledad"
biblioteca.devolverLibro(socio1.id, "ISBN001"); // Ana devuelve el libro

// Crear evento y registrar socio
const evento = new EventoBiblioteca("Club de Lectura", new Date(), "Lectura de autores latinoamericanos");
evento.registrarSocio(socio1);

// Recomendaciones
const recomendador = new Recomendador();
const sugerencias = recomendador.recomendar(socio1, biblioteca);
console.log("Sugerencias para Ana:", sugerencias.map(l => l.titulo));

// Mostrar notificaciones
console.log("Notificaciones Ana:", socio1.notificaciones);
console.log("Notificaciones Luis:", socio2.notificaciones);
