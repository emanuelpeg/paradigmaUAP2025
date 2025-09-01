import { biblioteca } from "./clases/Biblioteca";
import { TipoPrestamo } from "./clases/Prestamo";
import { Socio, SocioVIP, TipoSocio } from "./clases/Socio";

biblioteca.agregarLibro("El quijote", "Cervantes", "1234");
biblioteca.agregarLibro("Hábitos Atómicos", "James Clear", "2345");
const libro = biblioteca.agregarLibro("1984", "Orwell", "1984");

const socio1 = biblioteca.registrarSocio(TipoSocio.EMPLEADO, 31882, "Lucciano", "Curotto");
biblioteca.registrarSocio(TipoSocio.REGULAR, 20321, "Luca", "Giordana");
biblioteca.registrarSocio(TipoSocio.VIP, 32451, "Samuel", "Olmos");
console.log(libro.titulo, libro.autor, libro.isbn);


//control + A para seleccionar todo.
//control + k + f para formatear todo el documento


// Buscar un libro
const resultadoBusqueda = biblioteca.buscar("Orwell");
console.log("Resultado de búsqueda:", resultadoBusqueda);

// Mostrar información de un libro
console.log(libro.titulo, libro.autor, libro.isbn);

// Buscar un libro por autor
const encontrados = biblioteca.buscar("Orwell");
console.log("Libros encontrados:", encontrados.map(l => l.titulo));

// Procesar un préstamo y devolución
biblioteca.procesarPrestamo(socio1, libro, TipoPrestamo.REFERENCIA);
biblioteca.devolverLibro(socio1.id, libro.isbn);
