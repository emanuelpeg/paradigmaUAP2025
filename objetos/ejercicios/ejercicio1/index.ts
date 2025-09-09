import { biblioteca } from "./clases/Bibiblioteca";
//import { Autor } from "./clases/Autor";

//crear autores


//agregar un libro
biblioteca.agregarLibro("El Quijote", biblioteca.agregarAutor("Cervantes", "agsajfl",new Date), "1234567890");
biblioteca.agregarLibro("Cien años de soledad",biblioteca.agregarAutor("Gabriel García Márquez", "agsajfl",new Date) , "0987654321");
const libro = biblioteca.agregarLibro("1984", biblioteca.agregarAutor("George Orwell", "agsajfl",new Date), "1122334455");

//agregar un socio
biblioteca.agregarSocio(1, "Juan", "Pérez");
biblioteca.agregarSocio(2, "Ana", "Gómez");
biblioteca.agregarSocio(3, "Luis", "Martínez");

console.log(libro.titulo + " de " + libro.autor + " (ISBN: " + libro.isbn + ")");

