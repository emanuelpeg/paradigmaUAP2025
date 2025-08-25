import { biblioteca } from "./clases/Biblioteca";

//agregamos libros
 biblioteca.agregarLibro("El quijote", "Cervantes", "1234");
const libro =biblioteca.agregarLibro("Hábitos Atómicos", "James Clear", "2345");
biblioteca.agregarLibro("1984", "Orwell", "1984");
biblioteca.agregarLibro("Libro C", "Cervantes", "25345");
biblioteca.agregarLibro("Libro C 2", "Orwell", "4355");
const libro2 = biblioteca.agregarLibro("El Señor de los anillos", "Orwell", "33333");

//añadir socios
biblioteca.registrarSocio(31882, "Lucciano", "Curotto");
biblioteca.registrarSocio(20321, "Luca", "Giordana");
biblioteca.registrarSocio(32451, "Samuel", "Olmos");
biblioteca.registrarSocio(37023, "Felipe", "Correa");


console.log("==============")
biblioteca.retirarLibro(31882, libro.isbn); // socio 31882 lo toma
console.log("==============")
biblioteca.reservarLibro(20321, libro.isbn); // socio 20321 reserva
biblioteca.reservarLibro(32451, libro.isbn); // socio 32451 reserva
console.log("==============")


biblioteca.devolverLibro(31882, libro.isbn); // notifica al socio 20321
console.log("==============")
biblioteca.retirarLibro(20321, libro.isbn); // socio 20321 lo toma 
console.log("==============")
biblioteca.devolverLibro(20321, libro.isbn); // notifica al socio 32451
console.log("==============")
biblioteca.retirarLibro(32451, libro.isbn); // socio 32451 lo toma
console.log("==============")

biblioteca.calculoMulta(32451, libro.isbn); //simule aumentarle los dias en la Clase socio para mostrar que la funcion anda correctamente
console.log("==============")
biblioteca.devolverLibro(32451, libro.isbn); // notifica al socio 32451
biblioteca.retirarLibro(32451, libro.isbn); // socio 32451 lo toma

biblioteca.retirarLibro(37023, libro2.isbn); // socio 37023 lo toma tambien simule que tenga un retraso de 15 dias para el prestamo

console.log("==============")

biblioteca.getLibrosPorAutor("James Clear"); //buscamos un
//libro actual
console.log("==============")
biblioteca.agregarEvento("Presentación de 'El quijote'", "Evento de presentación del libro 'El quijote'", new Date(), "Presentación", [libro], [31882, 20321]);
biblioteca.agregarEvento("Presentación de 'James Clear'", "Evento de presentación del libro 'Atomicos 2'", new Date(), "Presentación", [libro], [32451, 20321]);

biblioteca.listarEventos();

biblioteca.notificarSocios();
console.log("==============")

console.log("Libro actual: ",libro.titulo, libro.autor.nombre, libro.isbn);
