
import { Biblioteca } from "./Biblioteca";
import { Libro } from "./Libro";
import { Socio } from "./Socio";
import { Autor } from "./autor";
//biblioteca.agregarLibro("El quijote", "Cervantes", "1234");
//biblioteca.agregarLibro("Habitos Atomicos", "James Clear", "1235");
//biblioteca.agregarLibro("El principito", "Antoine de Saint-Exupéry", "1236");

const biblioteca = new Biblioteca();

const autor = new Autor("J.K. Rowling", "Autora de Harry Potter", 1965);
const libro1 = new Libro("Harry Potter y la Piedra Filosofal", autor, "ISBN123");

const socio1 = new Socio("Jeremías");
const socio2 = new Socio("Jordan");

biblioteca.agregarLibro(libro1);
biblioteca.registrarSocio(socio1);
biblioteca.registrarSocio(socio2);

// Socio1 pide el libro
biblioteca.prestarLibro(libro1, socio1);

// Socio2 intenta pedirlo (queda en reserva)
biblioteca.prestarLibro(libro1, socio2);

// Socio1 lo devuelve
biblioteca.devolverLibro(libro1, socio1);

// Ahora socio2 recibe una notificación de que el libro está disponible
console.log("notificaciones de jordan:",socio2.notificaciones);