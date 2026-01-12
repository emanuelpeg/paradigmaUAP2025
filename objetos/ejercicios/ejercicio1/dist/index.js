import { biblioteca } from "./clases/Biblioteca.js";
// 1. Crear autores
const cervantes = biblioteca.agragarAutor("Cervantes", "Autor de El Quijote", 1547);
const jamesClear = biblioteca.agragarAutor("James Clear", "Autor de Hábitos Atómicos", 1986);
const orwell = biblioteca.agragarAutor("Orwell", "Autor de 1984", 1903);
// 2. Crear libros usando los objetos Autor
biblioteca.agregarLibro("El quijote", cervantes, "1234");
biblioteca.agregarLibro("Hábitos Atómicos", jamesClear, "2345");
const libro = biblioteca.agregarLibro("1984", orwell, "1984");
// 3. Registrar socios
biblioteca.registrarSocio(31882, "Lucciano", "Curotto");
biblioteca.registrarSocio(20321, "Luca", "Giordana");
biblioteca.registrarSocio(32451, "Samuel", "Olmos");
// 4. Mostrar información de un libro
console.log(libro.titulo, libro.autor.nombre, libro.isbn);
// 5. Operaciones de préstamo y reserva
biblioteca.retirarLibro(31882, "1234");
biblioteca.devolverLibro(31882, "1234");
biblioteca.retirarLibro(31882, "1984");
biblioteca.devolverLibro(31882, "1984");
biblioteca.recervarLibro(20321, "1984");
const recomendaciones = biblioteca.recomendarLibros(31882);
console.log("Recomendaciones para Lucciano:");
recomendaciones.forEach(libro => {
    console.log(`- ${libro.titulo} de ${libro.autor.nombre}`);
});
// 6. Mostrar autores en la terminal
biblioteca.mostrarAutores();
const evento = biblioteca.crearEvento("Club de Lectura: 1984", "Debate sobre la novela 1984 de Orwell", new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) // dentro de 2 días
);
biblioteca.registrarSocioEnEvento(evento, 31882); // Lucciano
biblioteca.registrarSocioEnEvento(evento, 20321); // Luca
// 8. Notificar eventos próximos (aparecerá en la terminal)
biblioteca.notificarEventosProximos();
