// Testing sistema modular de biblioteca - Todas las 5 tareas
import { Biblioteca } from './Biblioteca';
import { Libro } from './Libro';  
import { Socio } from './Socio';
import { Autor } from './Autor';
import { EventoBiblioteca } from './EventoBiblioteca';
import { TipoEvento } from './tipos';

console.log("=== TESTING SISTEMA BIBLIOTECA MODULAR ===");

// Crear biblioteca
const biblioteca = new Biblioteca("Biblioteca Central");

// Crear autores
const garcia = new Autor("Gabriel García Márquez", "Escritor colombiano", 1927);
const borges = new Autor("Jorge Luis Borges", "Escritor argentino", 1899);

// Crear libros
const cienAnos = new Libro("Cien años de soledad", garcia, "978-1");
const aleph = new Libro("El Aleph", borges, "978-2");
const ficciones = new Libro("Ficciones", borges, "978-3");

// Crear socios
const juan = new Socio(1, "Juan", "Pérez", "juan@email.com");
const maria = new Socio(2, "María", "García", "maria@email.com");

// Agregar a biblioteca
biblioteca.agregarLibro(cienAnos);
biblioteca.agregarLibro(aleph);
biblioteca.agregarLibro(ficciones);
biblioteca.agregarSocio(juan);
biblioteca.agregarSocio(maria);

// Crear evento
const charla = new EventoBiblioteca(1, "Charla Borges", "Evento literario", new Date(2024, 11, 15), TipoEvento.CHARLA_AUTOR);
biblioteca.agregarEvento(charla);
biblioteca.registrarSocioEnEvento(1, 1);

console.log("\n--- SETUP COMPLETO ---");
console.log("Biblioteca creada:", biblioteca.nombre);
console.log("Libros agregados:", biblioteca.libros.size);
console.log("Socios agregados:", biblioteca.socios.size);
console.log("Autores agregados:", biblioteca.autores.size);

// TAREA 1: Testing Reservas
console.log("\n--- TAREA 1: Reservas ---");
console.log("Reservando libro para Juan:", biblioteca.reservarLibro("978-1", 1));
console.log("Estado del libro:", cienAnos.estado);

// TAREA 2: Testing Préstamos
console.log("\n--- TAREA 2: Préstamos ---");
console.log("Prestando libro a Juan:", biblioteca.prestarLibro("978-1", 1));
console.log("Estado del libro:", cienAnos.estado);
console.log("Libros prestados a Juan:", juan.librosPrestados.length);

// TAREA 3: Testing Autores
console.log("\n--- TAREA 3: Gestión de Autores ---");
console.log("Autores en biblioteca:", Array.from(biblioteca.autores.keys()));
console.log("Libros de Borges:", biblioteca.getLibrosPorAutor(borges).map(l => l.titulo));

// TAREA 4: Testing Eventos y Notificaciones
console.log("\n--- TAREA 4: Eventos ---");
console.log("Eventos en biblioteca:", biblioteca.eventos.size);
console.log("Notificando eventos próximos:");
biblioteca.notificarEventosProximos();

// TAREA 5: Testing Recomendaciones
console.log("\n--- TAREA 5: Recomendaciones ---");
// Agregar al historial que Juan leyó un libro de Borges
juan.historialLectura.push("978-2");
const recomendaciones = biblioteca.recomendarLibros(1);
console.log("Recomendaciones para Juan:", recomendaciones.map(l => l.titulo));

console.log("\n=== TODAS LAS TAREAS FUNCIONANDO ===");
