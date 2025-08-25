import { biblioteca } from "./Biblioteca";
import { Autor } from "./Autor";
import { EventoBiblioteca } from "./EventoBiblioteca";

// ==================== AUTORES ====================
const garciaMarquez = new Autor("Gabriel García Márquez", "Autor de Cien años de soledad", 1927);
const rowling = new Autor("J. K. Rowling", "Autora de Harry Potter", 1965);
const sapiens = new Autor("Yuval Noah Harari", "Autor de Sapiens: De animales a dioses", 1976);

// ==================== LIBROS ====================
biblioteca.agregarLibro("Cien años de soledad", garciaMarquez, "1111");
biblioteca.agregarLibro("El amor en los tiempos del cólera", garciaMarquez, "2222");
biblioteca.agregarLibro("Harry Potter y la piedra filosofal", rowling, "3333");
biblioteca.agregarLibro("Harry Potter y la cámara secreta", rowling, "4444");
biblioteca.agregarLibro("Sapiens", sapiens, "5555");

// ==================== SOCIOS ====================
const leo = biblioteca.registrarSocio(1, "Leopoldina", "Egge");
const poli = biblioteca.registrarSocio(2, "Poli", "Martínez");
const mile = biblioteca.registrarSocio(3, "Milena", "Ríos");

// ==================== TAREA 1: RESERVAS ====================
console.log("\n=== TAREA 1: Reservas ===");
biblioteca.retirarLibro(leo.id, "1111");     // Leo retira Cien años de soledad
biblioteca.retirarLibro(poli.id, "1111");    // Poli lo reserva
biblioteca.devolverLibro(leo.id, "1111");    // Leo devuelve, pasa a Poli automáticamente

// ==================== TAREA 2: MULTAS ====================
console.log("\n=== TAREA 2: Multas ===");
// Simulamos atraso del préstamo de Poli
const prestamoPoli = poli["tienePrestadoLibro"](biblioteca.buscarLibro("1111")!);
if (prestamoPoli) prestamoPoli.vencimiento.setDate(prestamoPoli.vencimiento.getDate() - 3);
biblioteca.devolverLibro(poli.id, "1111");   // Poli devuelve tarde → multa
biblioteca.retirarLibro(poli.id, "3333");    // No puede porque tiene multas
poli.pagarMulta(200);                        // Paga la multa

// ==================== TAREA 3: AUTORES ====================
console.log("\n=== TAREA 3: Autores ===");
const librosRowling = biblioteca.buscarLibrosPorAutor(rowling);
console.log("Libros de Rowling:", librosRowling.map(l => l.titulo));

// ==================== TAREA 4: EVENTOS Y NOTIFICACIONES ===
console.log("\n=== TAREA 4: Eventos y Notificaciones ===");
const evento = new EventoBiblioteca("Taller de Escritura", "Cómo escribir fantasía juvenil", new Date("2025-09-15"));
mile.registrarEvento(evento);
console.log("Notificaciones Mile:", mile.verNotificaciones());

// ==================== TAREA 5: HISTORIAL Y RECOMENDACIONES ===
console.log("\n=== TAREA 5: Historial y Recomendaciones ===");
biblioteca.retirarLibro(leo.id, "2222");     // Leo retira El amor en los tiempos del cólera
biblioteca.devolverLibro(leo.id, "2222");    // Lo devuelve → entra en historial
const sugerenciasLeo = biblioteca.recomendarLibros(leo.id);
console.log("Recomendaciones para Leo:", sugerenciasLeo.map(l => l.titulo));
