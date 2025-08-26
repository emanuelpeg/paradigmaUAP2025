import {Libro} from "./clases/Libro";
import { biblioteca } from "./clases/Biblioteca";
import { Autor } from "./clases/Autor";

// Crear autores
const autorOrwell = new Autor("George Orwell", "Escritor británico", 1903);
const autorCervantes = new Autor("Miguel de Cervantes", "Autor español", 1547);

const libro = biblioteca.agregarLibro("1984", autorOrwell, "1984");
const libro2 = biblioteca.agregarLibro("El Quijote", autorCervantes, "1234");

//const libro3=biblioteca.agregarLibro("Hábitos Atómicos", "James Clear", "2345");


const socio1 = biblioteca.registrarSocio(31882, "Lucciano", "Curotto");
const socio2 =biblioteca.registrarSocio(20321, "Luca", "Giordana");
const socio3 = biblioteca.registrarSocio(32451, "Samuel", "Olmos");

biblioteca.retirarLibro(socio1.id, libro.isbn);
biblioteca.reservarLibro(socio2.id, libro.isbn);


const prestamo = socio1.tienePrestadoLibro(libro);
if (prestamo) {
  prestamo.vencimiento.setDate(prestamo.vencimiento.getDate() - 20);
}

biblioteca.devolverLibro1(socio1.id, libro.isbn);

try {
  biblioteca.retirarLibro(socio1.id, libro2.isbn);
} catch (e) {
  if (e instanceof Error) {
    console.log(e.message); // Muestra el mensaje de deuda pendiente
  } else {
    console.log(e); // En caso de que no sea un Error estándar
  }
}

biblioteca.retirarLibro(socio2.id, libro.isbn);

socio1.pagarDeuda(socio1.deudaPendiente);

biblioteca.retirarLibro(socio1.id, libro2.isbn);

console.log(`Préstamo realizado correctamente ${socio1.deudaPendiente}` );
console.log(libro.titulo, libro.autor, libro.isbn);

const librosDeOrwell = biblioteca.buscarLibrosPorAutor(autorOrwell);
console.log("Libros de Orwell:", librosDeOrwell.map(l => l.titulo));