import { Autor } from "./clases/Autor";
import { biblioteca } from "./clases/Biblioteca";
import { EventoBiblioteca } from "./clases/EventoBiblioteca";
import { Recomendador } from "./clases/Recomendador";

// const libro1 = biblioteca.agregarLibro("El Quijote", "Miguel de Cervantes", "1234567890");
// const libro2 = biblioteca.agregarLibro("Hábitos Atómicos", "James Clear", "0987654321");
// const libro3 = biblioteca.agregarLibro("1984", "George Orwell", "1122334455");


// const socio1 = biblioteca.agregarSocio(31882, 'Lucciano', 'Curotto');
// const socio2 = biblioteca.agregarSocio(20321, "Lucca", "Giordana");
// const socio3 = biblioteca.agregarSocio(32451, "Samuel", "Olmos");

// socio1.retirarLibro(libro1, 13);
// //console.log(socio.tienePrestadoLibro(libro));
// const reserva1 = biblioteca.reservarLibro(socio1.id, libro1.isbn);
// const reserva2 = biblioteca.reservarLibro(socio2.id, libro1.isbn);
// const reserva3 = biblioteca.reservarLibro(socio3.id, libro1.isbn);

// for (const reserva of libro1.obtenerReservas) {
//     console.log(`El libro "${reserva.obtenerLibro.titulo}" está reservado por ${reserva.obtenerSocio.nombreCompleto}.`);
// }

//console.log(reserva1.obtenerLibro);

//console.log(libro.titulo, libro.autor, libro.isbn);

/*-----------------------------------------------------------------*/

// // Simular préstamo y devolución con atraso para mostrar el cálculo de multas
// const socioPrueba = biblioteca.agregarSocio(99999, "Juan", "Perez");
// const autorPrueba = biblioteca.agregarAutor("Autor", "De Prueba", "Biografía de prueba", new Date(1970, 0, 1));
// const libroPrueba = biblioteca.agregarLibro("Prueba de Multa", autorPrueba, "5555555555");


// biblioteca.retirarLibro(socioPrueba.id, libroPrueba.isbn);


// const prestamo = socioPrueba.tienePrestadoLibro(libroPrueba);

// biblioteca.vencimientoPrestamo(socioPrueba.id);

// socioPrueba.verNotificaciones();
// if (prestamo) {
//     //prestamo.obtenerVencimiento.setDate(prestamo.obtenerVencimiento.getDate());
//     console.log(prestamo.obtenerVencimiento.getTime() / (1000 * 60 * 60 * 24));
//     console.log(prestamo.obtenerVencimiento.getDate());
//     biblioteca.devolverLibro(socioPrueba.id, libroPrueba.isbn);
// }
// socioPrueba.verNotificaciones();

// // El socio devuelve el libro (debería generarse una multa)
// const multaPrueba = biblioteca.devolverLibro(socioPrueba.id, libroPrueba.isbn);


// // Mostramos la deuda de multa del socio
// console.log(`La deuda de ${socioPrueba.nombreCompleto} es: $${multaPrueba ? multaPrueba.getMonto : 0}`);

// // Intentamos que el socio retire otro libro (debería bloquearse por multa)
// try {
//     biblioteca.retirarLibro(socioPrueba.id, libroPrueba.isbn);
// } catch (e) {
//     console.log("No puede retirar libros hasta pagar la multa:", (e as Error).message);
// }

// // El socio paga la multa
// socioPrueba.quitarMulta(multaPrueba!);

// // Ahora sí puede retirar libros
// try {
//     biblioteca.retirarLibro(socioPrueba.id, libroPrueba.isbn);
//     console.log(`${socioPrueba.nombreCompleto} retiró el libro "${libroPrueba.titulo}" correctamente.`);
// } catch (e) {
//     console.log("Error inesperado:", (e as Error).message);
// }

// const autor1Prueba = biblioteca.agregarAutor("Miguel", "Cervantes", "Biografía de Miguel de Cervantes", new Date(1547, 9, 29));
// const autor2Prueba = biblioteca.agregarAutor("James", "Clear", "Biografía de James Clear", new Date(1986, 1, 22));

// const libro1Prueba = biblioteca.agregarLibro("El Quijote", autor1Prueba, "1234567890");
// const libro2Prueba = biblioteca.agregarLibro("Hábitos Atómicos", autor2Prueba, "0987654321");
// const libro3Prueba = biblioteca.agregarLibro("Prueba libro", autor1Prueba, "1122334455");

// for (const libro of biblioteca.obtenerLibrosPorAutor(autor1Prueba)) {
//     console.log(`El libro "${libro.titulo}" fue escrito por ${autor1Prueba.nombreCompleto}.`);
// }

//Implementar notificaciones
// const socio1 = biblioteca.agregarSocio(1, "Samuel", "Olmos");
// biblioteca.agregarEvento(new EventoBiblioteca(new Date(), "Evento de la biblioteca"));
// const notificaciones = socio1.obtenerNotificaciones
// for (const n of notificaciones)
// {
//     console.log(n.getMensaje);
// }

// // Recomendaciones e Historial
// const autor1 = biblioteca.agregarAutor("Tomás", "Caussa", "Es tomi", new Date());
// const autor2 = biblioteca.agregarAutor("Samuel", "Olmos", "Es samu", new Date());

// const libro1 = biblioteca.agregarLibro("El Hobbit", autor1, "11111");
// const libro2 = biblioteca.agregarLibro("El señor del los anillos", autor1, "22222");
// const libro3 = biblioteca.agregarLibro("Harry Potter y la Piedra Filosofal", autor1, "33333");
// const libro4 = biblioteca.agregarLibro("Harry Potter y la Cámara Secreta", autor2, "44444");

// const socio1 = biblioteca.agregarSocio(1, "Santiago", "Casali");
// socio1.agregarAlHistorial(libro1);

// const recomendador = new Recomendador(biblioteca);
// console.log("Recomendaciones:", recomendador.recomendarLibros(socio1));