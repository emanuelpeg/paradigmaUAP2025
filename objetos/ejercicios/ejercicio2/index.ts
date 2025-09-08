import { biblioteca } from "./clases/Biblioteca";
import { TipoSocio } from "./clases/Socio";
import { SocioRegular } from "./clases/Socio";
import { Libro } from "./clases/Libro";
import { Prestamo } from "./clases/Prestamo";

biblioteca.agregarLibro("El quijote", "Cervantes", "1234");
biblioteca.agregarLibro("Hábitos Atómicos", "James Clear", "2345");
const libro = biblioteca.agregarLibro("1984", "Orwell", "1984");

biblioteca.registrarSocio(TipoSocio.EMPLEADO, 31882, "Luciano", "Curotto");
biblioteca.registrarSocio(TipoSocio.EMPLEADO, 20321, "Lucca", "Giordana");
biblioteca.registrarSocio(TipoSocio.EMPLEADO, 32451, "Samuel", "Olmos");

console.log(libro.titulo, libro.autor, libro.isbn);



//Registrar socios de distintos tipos
const socioRegular = biblioteca.registrarSocio(TipoSocio.REGULAR, 1003, "María", "López");
const socioVip = biblioteca.registrarSocio(TipoSocio.VIP, 1004, "Pedro", "Gómez");
const socioEmpleado = biblioteca.registrarSocio(TipoSocio.EMPLEADO, 1005, "Laura", "Martínez");
const socioVisitante = biblioteca.registrarSocio(TipoSocio.VISITANTE, 1006, "Sofía", "Ruiz");

//Préstamos y devoluciones
const libroPrestamo = biblioteca.buscarLibro("1234");
if (libroPrestamo && socioRegular) {
  biblioteca.prestarLibro(socioRegular, libroPrestamo);
  biblioteca.devolverLibro(socioRegular.id, libroPrestamo.isbn);
}

const resultadosBusqueda = biblioteca.buscarUniversalPor((item: any) => item.titulo?.includes("1984"));
console.log("Resultados de búsqueda universal por título:", resultadosBusqueda);

const recursoOnline = { url: "https://ejemplo.com/ebook.pdf", titulo: "Ebook de Ejemplo" };
const documentoAntiguo = { titulo: "Manuscrito Antiguo", año: 1850 };
const articuloAcademico = { titulo: "Investigación en IA", autor: "Dra. García", revista: "Revista de Tecnología", año: 2023 };
