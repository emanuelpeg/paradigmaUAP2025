import { biblioteca } from "./Biblioteca";
import { Autor } from "./Autor";
import { EventoBiblioteca } from "./EventoBiblioteca";

// ==================== AUTORES ====================
const cervantes = new Autor("Miguel de Cervantes", "Autor de Don Quijote", 1547);
const exupery = new Autor("Antoine de Saint-Exupéry", "Autor de El Principito", 1900);
const clear = new Autor("James Clear", "Autor de Hábitos Atómicos", 1986);

// ==================== LIBROS ====================
biblioteca.agregarLibro("El Quijote", cervantes, "1234");
biblioteca.agregarLibro("Novelas Ejemplares", cervantes, "5678");
biblioteca.agregarLibro("El Principito", exupery, "2345");
biblioteca.agregarLibro("Hábitos Atómicos", clear, "3456");
biblioteca.agregarLibro("El Quijote Moderno", cervantes, "6789"); // para probar títulos similares

// ==================== SOCIOS ====================
const male = biblioteca.registrarSocio(1, "Malena", "Klein");
const gianna = biblioteca.registrarSocio(2, "Gianna", "Cavallo");
const tobias = biblioteca.registrarSocio(3, "Tobias", "Villarroel");

// ==================== TAREA 1: RESERVAS ====================
console.log("\n=== TAREA 1: Reservas ===");
biblioteca.retirarLibro(male.id, "1234");    // Male retira El Quijote
biblioteca.retirarLibro(gianna.id, "1234");  // Gianna lo reserva porque ya está prestado
biblioteca.devolverLibro(male.id, "1234");   // Male devuelve, pasa a Gianna automáticamente

// ==================== TAREA 2: MULTAS ====================
console.log("\n=== TAREA 2: Multas ===");
// Para simular atraso, cambiamos la fecha de vencimiento del préstamo de Gianna
const prestamo = gianna["tienePrestadoLibro"](biblioteca.buscarLibro("1234")!);
if (prestamo) prestamo.vencimiento.setDate(prestamo.vencimiento.getDate() - 5); // atrasamos 5 días
biblioteca.devolverLibro(gianna.id, "1234"); // Gianna devuelve tarde → multa
biblioteca.retirarLibro(gianna.id, "2345");  // No puede porque tiene multas
gianna.pagarMulta(250);                      // Paga la multa

// ==================== TAREA 3: AUTORES ====================
console.log("\n=== TAREA 3: Autores ===");
const librosCervantes = biblioteca.buscarLibrosPorAutor(cervantes);
console.log("Libros de Cervantes:", librosCervantes.map(l => l.titulo));

// ==================== TAREA 4: EVENTOS Y NOTIFICACIONES ===
console.log("\n=== TAREA 4: Eventos y Notificaciones ===");
const evento = new EventoBiblioteca("Club de Lectura", "Debate sobre El Principito", new Date("2025-08-30"));
male.registrarEvento(evento);
console.log("Notificaciones Male:", male.verNotificaciones()); // muestra las notificaciones (registrarEvento(), notificar(), verNotificaciones())

// ==================== TAREA 5: HISTORIAL Y RECOMENDACIONES ===
console.log("\n=== TAREA 5: Historial y Recomendaciones ===");
biblioteca.retirarLibro(male.id, "1234");    // Male retira El Quijote
biblioteca.devolverLibro(male.id, "1234");   // Lo devuelve → entra en historial
const sugerencias = biblioteca.recomendarLibros(male.id);
console.log("Recomendaciones para Male:", sugerencias.map(l => l.titulo)); //el .map es para mostrar solo los títulos
