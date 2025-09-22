import { Biblioteca } from "./clases/Biblioteca";
import { TipoSocio } from "./clases/Socio";

const biblioteca = new Biblioteca();

// Agregar libros
const libro1 = biblioteca.agregarLibro("El quijote", "Cervantes", "1234");
const libro2 = biblioteca.agregarLibro("Hábitos Atómicos", "James Clear", "2345");
const libro3 = biblioteca.agregarLibro("1984", "Orwell", "1984");

// Registrar socios
const socio1 = biblioteca.registrarSocio(1, "Lucciano", "Curotto", TipoSocio.REGULAR);
const socio2 = biblioteca.registrarSocio(2, "Luca", "Giordana", TipoSocio.VIP);
const socio3 = biblioteca.registrarSocio(3, "Samuel", "Olmos", TipoSocio.EMPLEADO);
const socio4 = biblioteca.registrarSocio(4, "Invitado", "Visitante", TipoSocio.VISITANTE);

// Préstamos polimórficos
biblioteca.retirarLibro(socio1.id, libro1.isbn, "regular");
biblioteca.retirarLibro(socio2.id, libro2.isbn, "corto");
biblioteca.retirarLibro(socio3.id, libro3.isbn, "digital");

// Devolución y cálculo de multa
const multa = biblioteca.devolverLibro(socio1.id, libro1.isbn, new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)); // 15 días después
console.log(`Multa por devolución tardía: $${multa}`);

console.log(libro1.titulo, libro1.autor, libro1.isbn);