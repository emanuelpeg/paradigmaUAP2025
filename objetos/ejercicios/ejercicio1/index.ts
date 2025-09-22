import { Autor } from "./Autor";
import { Biblioteca } from "./Biblioteca";
import { Libro } from "./Libro";

// Crear una instancia de Biblioteca
const miBiblioteca = new Biblioteca();

// Crear autores
const cervantes = miBiblioteca.agregarAutor('Cervantes', 'Autor de El Quijote', 1547);
const jamesClear = miBiblioteca.agregarAutor('James Clear', 'Autor de Hábitos Atómicos', 1986);
const orwell = miBiblioteca.agregarAutor('Orwell', 'Autor de 1984', 1903);

// Agregar libros con autores
miBiblioteca.agregarLibro('El quijote', cervantes, '1234');
miBiblioteca.agregarLibro('Habitos atomicos', jamesClear, '5678');
miBiblioteca.agregarLibro('1984', orwell, '9101');

// Registrar socios
miBiblioteca.registrarSocio(38437, 'Leandro', 'Bender');
miBiblioteca.registrarSocio(38456, 'Brisa', 'Arizmendi');
miBiblioteca.registrarSocio(38301, 'Bruno', 'Capri');

// Ejemplo de reservas:
// Socio 38437 retira el libro 'El quijote'
miBiblioteca.retirar('1234', 38437);

// Socio 38456 intenta retirar el mismo libro, se agrega a la cola de reservas
miBiblioteca.retirar('1234', 38456);

// Socio 38301 también intenta retirar el mismo libro, se agrega a la cola de reservas
miBiblioteca.retirar('1234', 38301);

// Socio 38437 devuelve el libro
miBiblioteca.devolver('1234');

// Ahora el sistema notifica al siguiente socio en la cola de reservas

// Simular multa: modificar la fecha de préstamo para forzar retraso
(miBiblioteca as any).fechasPrestamo.set('1234', new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)); // 10 días atrás
miBiblioteca.devolver('1234'); // Esto genera multa

// Consultar multa del socio
console.log('Multa de Leandro:', miBiblioteca.consultarMulta(38437));

// Intentar retirar libro con multa pendiente
miBiblioteca.retirar('1234', 38437); // No debería permitir

// Saldar la multa
miBiblioteca.saldarMulta(38437);

// Ahora sí puede retirar
miBiblioteca.retirar('1234', 38437);

// Buscar libros por autor
miBiblioteca.buscarLibrosPorAutor('Cervantes');

// Crear un evento de biblioteca
const eventoClubLectura = miBiblioteca.agregarEvento('Club de Lectura', 'Reunión mensual para discutir libros', new Date('2025-09-10'));

// Registrar socios en el evento
miBiblioteca.registrarSocioEnEvento(38437, 'Club de Lectura');
miBiblioteca.registrarSocioEnEvento(38456, 'Club de Lectura');

// Mostrar notificaciones de un socio
console.log('Notificaciones de Leandro:', miBiblioteca.obtenerNotificaciones(38437));
console.log('Notificaciones de Brisa:', miBiblioteca.obtenerNotificaciones(38456));

// Mostrar historial de lectura de Leandro
console.log('Historial de lectura de Leandro:', miBiblioteca.obtenerHistorialLectura(38437));

// Mostrar recomendaciones para Leandro
console.log('Recomendaciones para Leandro:', miBiblioteca.recomendarLibros(38437));



