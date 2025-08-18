import { biblioteca } from "./clases/Bibiblioteca";

//agregar un libro
biblioteca.agregarLibro("El Quijote", "Cervantes", "1234567890");
biblioteca.agregarLibro("Cien años de soledad", "Gabriel García Márquez", "0987654321");
const libro = biblioteca.agregarLibro("1984", "George Orwell", "1122334455");

//agregar un socio
biblioteca.agregarSocio(1, "Juan", "Pérez");
biblioteca.agregarSocio(2, "Ana", "Gómez");
biblioteca.agregarSocio(3, "Luis", "Martínez");

console.log(libro.titulo + " de " + libro.autor + " (ISBN: " + libro.isbn + ")");