import { biblioteca } from "./clases/Biblioteca";

// Crear autores
const cervantes = biblioteca.crearAutor("Miguel de Cervantes", "Gran escritor español", 1547);
const orwell = biblioteca.crearAutor("George Orwell", "Escritor británico", 1903);
const clear = biblioteca.crearAutor("James Clear", "Experto en hábitos", 1986);

// Agregar libros con autores
biblioteca.agregarLibro("El Quijote", cervantes, "1234");
biblioteca.agregarLibro("1984", orwell, "1237");
biblioteca.agregarLibro("Hábitos Atómicos", clear, "1235");

// Registrar socios
biblioteca.registrarSocio("Juan", "Pérez", 1);
biblioteca.registrarSocio("Ana", "Gómez", 2);
biblioteca.registrarSocio("Luis", "Martínez", 3);

// Ejemplo de uso del sistema
console.log("=== SISTEMA BIBLIOTECA INICIADO ===");
console.log("Autores y libros registrados correctamente");
console.log("Socios registrados: Juan, Ana, Luis");

// Buscar libros por autor
const librosCervantes = biblioteca.buscarLibrosPorAutor("Miguel de Cervantes");
console.log(`Libros de Cervantes: ${librosCervantes.length}`);

// Realizar préstamo
biblioteca.RetirarLibro(1, "1234");
console.log("Préstamo realizado correctamente");

biblioteca.agregarEvento("Club de lectura: 1984", new Date("2024-12-15"));
biblioteca.agregarEvento("Charla con escritores", new Date("2024-12-20"), "charla");

// Ver información del autor de un libro
const libro = biblioteca.buscarLibro("1234");
if (libro) {
    console.log(`Autor del libro: ${libro.autor.nombre}`);
}


