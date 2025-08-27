import { Autor } from './Autor';
import { biblioteca } from './Biblioteca';
import { EventoBiblioteca } from './EventoBiblioteca';

// Tarea 3: Gestión de Autores
const autor1 = new Autor('Gabriel García Márquez', 'Escritor colombiano.', new Date('1927-03-06'));
const autor2 = new Autor('Julio Cortázar', 'Escritor argentino.', new Date('1914-08-26'));
biblioteca.registrarAutor(autor1);
biblioteca.registrarAutor(autor2);

// Tarea 1: Sistema de Reservas
const socio1 = biblioteca.registrarSocio(1, 'Ana', 'García');
const socio2 = biblioteca.registrarSocio(2, 'Luis', 'Pérez');
const libro1 = biblioteca.agregarLibro('Cien años de soledad', autor1, '123');
const libro2 = biblioteca.agregarLibro('Rayuela', autor2, '456');

// Socio 1 retira libro1
biblioteca.retirarLibro(1, '123');

// Socio 2 intenta retirar el mismo libro (debería reservar y recibir notificación)
try {
  biblioteca.retirarLibro(2, '123');
} catch (e) {
  console.log(e.message);
}

// Socio 1 devuelve libro1 (Socio 2 debería recibir notificación de disponibilidad)
biblioteca.devolverLibro(1, '123');

// Tarea 2: Cálculo de Multas
// Simular préstamo vencido para socio1
socio1.retirar(libro2, -3); // Préstamo vencido hace 3 días
const multa = socio1.calcularMulta(new Date());
console.log(`Multa de ${socio1.nombreCompleto}: $${multa}`);

// Tarea 3: Buscar libros por autor
const librosDeCortazar = biblioteca.buscarLibrosPorAutor(autor2);
console.log(`Libros de Julio Cortázar: ${librosDeCortazar.map(l => l.titulo).join(', ')}`);

// Tarea 4: Eventos y Notificaciones
const eventoBiblioteca = new EventoBiblioteca(
  "Charla de autores",
  new Date("2025-09-15"),
  "Charla y debate sobre literatura latinoamericana."
);
eventoBiblioteca.socios.push(socio1, socio2);
eventoBiblioteca.socios.forEach(socio => {
  EventoBiblioteca.notificarEventoProximo(
    socio.nombreCompleto,
    eventoBiblioteca.nombreEvento,
    eventoBiblioteca.fecha
  );
});

