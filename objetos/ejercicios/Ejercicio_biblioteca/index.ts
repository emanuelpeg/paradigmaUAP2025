import { biblioteca } from './Biblioteca';

// Este archivo es el punto de entrada de la aplicación. Como el program.

biblioteca.agregarLibro("1984", "George Orwell", "1234567890");
biblioteca.agregarLibro("El Principito", "Antoine de Saint-Exupéry", "0987654321");
biblioteca.agregarLibro("Cien años de soledad", "Gabriel García Márquez", "1122334455");
const libro = biblioteca.agregarLibro("Don Quijote de la Mancha", "Miguel de Cervantes", "6677889900");

biblioteca.registrarSocio(1, "Juan", "Pérez");
biblioteca.registrarSocio(2, "Ana", "Gómez");
biblioteca.registrarSocio(3, "Luis", "Martínez");

console.log(libro.titulo, libro.autor, libro.isbn); // Accedemos a las propiedades del libro a través de los getters.