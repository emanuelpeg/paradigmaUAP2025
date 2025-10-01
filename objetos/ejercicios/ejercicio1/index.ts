import { biblioteca } from "./clases/Biblioteca";

//autores
const cervantes = biblioteca.agregarAutor(
    "Miguel de Cervantes", 
    "Novelista, poeta y dramaturgo español, autor de Don Quijote de la Mancha.", 
    1547
);
const clear = biblioteca.agregarAutor( 
    "James Clear", 
    "Autor estadounidense, especialista en hábitos, toma de decisiones y mejora continua.", 
    1986
);
const orwell = biblioteca.agregarAutor(
    "George Orwell", 
    "Escritor británico, autor de 1984 y Rebelión en la granja.", 
    1903
);

//libros
biblioteca.agregarLibro("El Quijote", cervantes, "1234");
biblioteca.agregarLibro("Hábitos Atómicos", clear, "2345");
const libro1984 = biblioteca.agregarLibro("1984", orwell, "1984");
biblioteca.agregarLibro("Rebelión en la granja", orwell, "5678");

//socios
biblioteca.registrarSocio(31882, "Lucciano", "Curotto");
biblioteca.registrarSocio(20321, "Luca", "Giordana");
biblioteca.registrarSocio(32451, "Samuel", "Olmos");

//prestamos
biblioteca.retirarLibro(31882, "1234");
biblioteca.devolverLibro(31882, "1234");

biblioteca.retirarLibro(31882, "1984");
biblioteca.devolverLibro(31882, "1984");

//mostrar info
console.log(libro1984.titulo, libro1984.autor.nombre, libro1984.isbn);
console.log(biblioteca.consultarEstadoSocio(31882));
console.log(biblioteca.consultarEstadoLibro("1234"));

//recomendaciones
const recomendaciones = biblioteca.recomendarLibros(31882);
console.log("Recomendaciones para Lucciano:");
recomendaciones.forEach(libro => {console.log(`- ${libro.titulo} (${libro.autor.nombre})`);});
