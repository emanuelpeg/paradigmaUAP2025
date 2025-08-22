import { biblioteca } from "./clases/Biblioteca";

//agregamos libros
const libro= biblioteca.agregarLibro("El quijote", "Cervantes", "1234");
biblioteca.agregarLibro("Hábitos Atómicos", "James Clear", "2345");
biblioteca.agregarLibro("1984", "Orwell", "1984");

//añadir socios
biblioteca.registrarSocio(31882, "Lucciano", "Curotto");
biblioteca.registrarSocio(20321, "Luca", "Giordana");
biblioteca.registrarSocio(32451, "Samuel", "Olmos");

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

console.log("==============")
//libro actual
console.log("Libro actual: ",libro.titulo, libro.autor, libro.isbn);
