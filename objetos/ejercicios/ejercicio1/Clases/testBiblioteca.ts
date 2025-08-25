import { Autor } from './Autor';
import { biblioteca } from './Biblioteca';

 // socios
const socio1 = biblioteca.registrarSocio(1, 'Ana', 'García');
const socio2 = biblioteca.registrarSocio(2, 'Luis', 'Pérez');

// libro
//const libro = biblioteca.agregarLibro('\nCien años de soledad', 'Gabriel García Márquez', '123');
const autor = new Autor('Gabriel García Márquez', 'Escritor colombiano, ganador del Premio Nobel de Literatura en 1982.', new Date('1927-03-06'));
const libro = biblioteca.agregarLibro('Cien años de soledad', autor, '123');

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