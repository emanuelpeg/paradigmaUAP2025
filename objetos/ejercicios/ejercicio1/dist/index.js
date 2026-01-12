"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Biblioteca_1 = require("./clases/Biblioteca");
const EventoBiblioteca_1 = require("./clases/EventoBiblioteca");
const biblioteca = new Biblioteca_1.Biblioteca();
biblioteca.agregarLibro("El quijote", "Cervantes", "1234");
biblioteca.agregarLibro("Hábitos Atómicos", "James Clear", "2345");
biblioteca.agregarLibro("1984", "Orwell", "1984");
const libro = biblioteca.agregarLibro("1984", "Orwell", "1984");
biblioteca.registrarSocio(31882, "Lucciano", "Curotto");
biblioteca.registrarSocio(20321, "Luca", "Giordana");
biblioteca.registrarSocio(32451, "Samuel", "Olmos");
// Ejemplo de reserva de libro
biblioteca.reservarLibro(31882, "1234"); // Lucciano reserva El quijote
biblioteca.reservarLibro(20321, "1234"); // Luca reserva El quijote
// Ejemplo de devolución con multa y notificación
biblioteca.devolverLibro(31882, "1234");
// Ejemplo de búsqueda de libros por autor
const librosOrwell = biblioteca.buscarLibrosPorAutor("Orwell");
console.log("Libros de Orwell:", librosOrwell.map(l => l.titulo));
// Ejemplo de agregar evento y notificación
biblioteca.agregarEvento(new EventoBiblioteca_1.EventoBiblioteca("Club de Lectura", new Date(), "Reunión mensual"));
// Ejemplo de historial y recomendaciones
const historial = biblioteca.obtenerHistorialSocio(31882);
console.log("Historial de Lucciano:", historial.map(l => l.titulo));
const recomendaciones = biblioteca.obtenerRecomendacionesSocio(31882);
console.log("Recomendaciones para Lucciano:", recomendaciones);
// Mostrar notificaciones
console.log("Notificaciones:", biblioteca.obtenerNotificaciones());
console.log(libro.titulo, libro.autor, libro.isbn);
// --- Ejemplo completo de funcionalidades ---
// Agregar más libros y socios
biblioteca.agregarLibro("Cien años de soledad", "Gabriel García Márquez", "1001");
biblioteca.agregarLibro("Rayuela", "Julio Cortázar", "1002");
biblioteca.registrarSocio(40001, "Ana", "Pérez");
biblioteca.registrarSocio(40002, "Juan", "Gómez");
// Ana y Juan reservan el mismo libro
biblioteca.reservarLibro(40001, "1001");
biblioteca.reservarLibro(40002, "1001");
// Ana retira y devuelve el libro (simulando retraso para multa)
// Forzar atraso cambiando la fecha de vencimiento manualmente (solo para demo)
const socioAna = biblioteca.buscarSocio(40001);
const libroCien = biblioteca.buscarLibro("1001");
if (socioAna && libroCien) {
    socioAna.retirar(libroCien, -5); // Vencimiento hace 5 días
    biblioteca.devolverLibro(40001, "1001");
}
// Buscar libros por autor
const librosCortazar = biblioteca.buscarLibrosPorAutor("Julio Cortázar");
console.log("Libros de Cortázar:", librosCortazar.map(l => l.titulo));
// Agregar eventos y notificar socios
biblioteca.agregarEvento(new EventoBiblioteca_1.EventoBiblioteca("Charla de autores", new Date(), "Charla con escritores locales"));
biblioteca.agregarEvento(new EventoBiblioteca_1.EventoBiblioteca("Club de Lectura", new Date(), "Lectura de clásicos"));
// Consultar historial y recomendaciones de Ana
const historialAna = biblioteca.obtenerHistorialSocio(40001);
console.log("Historial de Ana:", historialAna.map(l => l.titulo));
const recomendacionesAna = biblioteca.obtenerRecomendacionesSocio(40001);
console.log("Recomendaciones para Ana:", recomendacionesAna);
// Mostrar todas las notificaciones
console.log("Notificaciones generales:", biblioteca.obtenerNotificaciones());
