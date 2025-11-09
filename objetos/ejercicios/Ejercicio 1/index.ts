import {biblioteca} from "./clases/Biblioteca";

biblioteca.agregarLibro("El Quijote", "Cervantes", "1234");
biblioteca.agregarLibro("Habitos atomicos", "James Clear", "2345");
biblioteca.agregarLibro("1984", "George Orwell", "3456");

biblioteca.registrarSocio(38932, "Tobias", "Villarroel");
biblioteca.registrarSocio(38933, "Ana", "Gonzalez");
biblioteca.registrarSocio(38934, "Luis", "Martinez");

console.log(biblioteca.consultarEstadoLibro("1234"));

biblioteca.retirarLibro(38932, "1234");

console.log(biblioteca.consultarEstadoLibro("1234"));

console.log(biblioteca.consultarEstadoSocio(38932));
console.log( biblioteca.reservarLibro(38933, "1234") );
console.log( biblioteca.reservarLibro(38934, "1234") ); 

biblioteca.devolverLibro(38932, "1234"); 
console.log(biblioteca.consultarEstadoLibro("1234"));