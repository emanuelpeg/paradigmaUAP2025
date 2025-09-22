import { biblioteca } from "./clases/Biblioteca";

// Agregar libros
biblioteca.agregarLibro("El quijote", "Cervantes", "1234");
biblioteca.agregarLibro("Hábitos Atómicos", "James Clear", "2345");
const libro = biblioteca.agregarLibro("1984", "Orwell", "1984");

// Registrar socios de distintos tipos
biblioteca.registrarSocio(31882, "Lucciano", "Curotto", "regular");
biblioteca.registrarSocio(20321, "Luca", "Giordana", "vip");
biblioteca.registrarSocio(32451, "Samuel", "Olmos", "empleado");
biblioteca.registrarSocio(40000, "Invitado", "Visitante", "visitante");

console.log(libro.titulo, libro.autor, libro.isbn);