import { biblioteca } from './Biblioteca';

 // socios
const socio1 = biblioteca.registrarSocio(1, 'Ana', 'García');
const socio2 = biblioteca.registrarSocio(2, 'Luis', 'Pérez');

// libro
const libro = biblioteca.agregarLibro('\nCien años de soledad', 'Gabriel García Márquez', '123');

// Socio retira libro
biblioteca.retirarLibro(1, '123');

// Otro socio intenta retirar el mismo libro (para la notificación)
try {
  biblioteca.retirarLibro(2, '123');
} catch (e) {
  console.log(e.message);
}

// Socio 1 devuelve el libro (Socio 2 debería recibir notificación)
biblioteca.devolverLibro(1, '123');