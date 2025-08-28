
import { biblioteca } from "./clases/Biblioteca";
import { Autor } from "./clases/Autor";
import { EventoBiblioteca } from "./clases/EventoBiblioteca";




// Crear autores
const autorOrwell = new Autor("George Orwell", "Escritor británico", 1903);
const autorCervantes = new Autor("Miguel de Cervantes", "Autor español", 1547);

const libro1 = biblioteca.agregarLibro("1984", autorOrwell, "1984");
const libro2 = biblioteca.agregarLibro("Rebelión en la granja", autorOrwell, "1985");
const libro3 = biblioteca.agregarLibro("Homenaje a Cataluña", autorOrwell, "1986");

const libro4 = biblioteca.agregarLibro("El Quijote", autorCervantes, "1234");
const libro5 = biblioteca.agregarLibro("Novelas ejemplares", autorCervantes, "1235");
const libro6 = biblioteca.agregarLibro("La Galatea", autorCervantes, "1236");

//const libro3=biblioteca.agregarLibro("Hábitos Atómicos", "James Clear", "2345");


const socio1 = biblioteca.registrarSocio(31882, "Lucciano", "Curotto");
const socio2 =biblioteca.registrarSocio(20321, "Luca", "Giordana");
const socio3 = biblioteca.registrarSocio(32451, "Samuel", "Olmos");

// Crear y registrar un evento
const eventoClubLectura = new EventoBiblioteca(
  "Club de Lectura",
  "Reunión mensual para comentar libros",
  new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Fecha en una semana
  [socio1.id, socio2.id] // Socios inscriptos
);

biblioteca.agregarEvento(eventoClubLectura);


biblioteca.retirarLibro(socio1.id, libro1.isbn);
//biblioteca.retirarLibro(socio2.id, libro.isbn);
biblioteca.reservarLibro(socio2.id, libro1.isbn);



biblioteca.reservarLibro(socio3.id, libro1.isbn);


var prestamo = socio1.tienePrestadoLibro(libro1);
if (prestamo) {
  prestamo.vencimiento.setDate(prestamo.vencimiento.getDate() - 20);
}

biblioteca.devolverLibro1(socio1.id, libro1.isbn);

try {
  biblioteca.retirarLibro(socio1.id, libro2.isbn);
} catch (e) {
  if (e instanceof Error) {
    console.log(e.message); // Muestra el mensaje de deuda pendiente
  } else {
    console.log(e); // En caso de que no sea un Error estándar
  }
}

biblioteca.retirarLibro(socio2.id, libro1.isbn);

socio1.pagarDeuda(socio1.deudaPendiente);

biblioteca.retirarLibro(socio1.id, libro2.isbn);



biblioteca.devolverLibro1(socio2.id, libro1.isbn);

try {
  biblioteca.retirarLibro(socio1.id, libro2.isbn);
} catch (e) {
  if (e instanceof Error) {
    console.log(e.message); // Muestra el mensaje de deuda pendiente
  } else {
    console.log(e); // En caso de que no sea un Error estándar
  }
}

console.log(`Préstamo realizado correctamente ${socio1.deudaPendiente}` );
console.log(libro1.titulo, libro1.autor, libro1.isbn);

const librosDeOrwell = biblioteca.buscarLibrosPorAutor(autorOrwell);
console.log("Libros de Orwell:", librosDeOrwell.map(l => l.titulo));

console.log(socio1.notificaciones);

// Mostrar historial de notificaciones de socio1 y socio2

//ya funciona bien
console.log("Historial de notificaciones de socio1:");
socio1.notificaciones.forEach(n => console.log(`[${n.fecha.toLocaleString()}] ${n.mensaje}`));

console.log("Historial de notificaciones de socio2:");
socio2.notificaciones.forEach(n => console.log(`[${n.fecha.toLocaleString()}] ${n.mensaje}`));
console.log("Historial de notificaciones de socio3:");
socio3.notificaciones.forEach(n=> console.log(`[${n.fecha.toLocaleString()}] ${n.mensaje}`));

 // Simula que socio1 lee dos libros de Orwell
biblioteca.retirarLibro(socio1.id, libro3.isbn);
biblioteca.devolverLibro1(socio1.id, libro3.isbn);
biblioteca.retirarLibro(socio1.id, libro4.isbn);
biblioteca.devolverLibro1(socio1.id, libro4.isbn); 

// Mostrar historial de lectura
console.log("Historial de lectura de socio1:");
socio1.historialLectura.forEach(libro => console.log(libro.titulo));

// Mostrar recomendaciones para socio1
const recomendaciones = biblioteca.recomendarLibros(socio1.id);
console.log("Recomendaciones para socio1:");
recomendaciones.forEach(libro => console.log(libro.titulo));
