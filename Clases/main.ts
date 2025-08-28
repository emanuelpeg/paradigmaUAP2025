// main.ts
import { Biblioteca } from "./Biblioteca";
import { EventoBiblioteca } from "./EventoBiblioteca";

const biblioteca = new Biblioteca();

// Agregar libros
const libro1 = biblioteca.agregarLibro("Cien Años de Soledad", "Gabriel García Márquez", "978-0060883287");
const libro2 = biblioteca.agregarLibro("1984", "George Orwell", "978-0451524935");

// Agregar socios
const socio1 = biblioteca.agregarSocio(1, "Ana Pérez");
const socio2 = biblioteca.agregarSocio(2, "Luis Gómez");

// Préstamo
biblioteca.prestarLibro("978-0060883287", 1);

// Reserva
biblioteca.prestarLibro("978-0060883287", 2);

// Evento
const evento = new EventoBiblioteca("Charla de García Márquez", new Date(Date.now() + 2 * 24 * 60 * 60 * 1000));
biblioteca.agregarEvento(evento);
biblioteca.registrarSocioAEvento(1, "Charla de García Márquez");

// Notificar eventos próximos
biblioteca.notificarEventosProximos();

// Mostrar notificaciones
console.log("\nNotificaciones de Ana:");
socio1.verNotificaciones().forEach(n => console.log(` - ${n}`));