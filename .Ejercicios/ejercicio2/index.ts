import { biblioteca } from "./clases/Biblioteca";
import { TipoSocio } from "./clases/Socio";
import { TipoPrestamo } from "./clases/PrestamoBase";
import { PoliticaDocente, PoliticaEstricta, PoliticaEstudiante, PoliticaFlexible} from "./clases/Politicas";
import { BuscadorUniversal } from "./clases/BuscadorUniversal";

const libro1 = biblioteca.agregarLibroCatalogo("1984", "Orwell", "1984");
const libro2 = biblioteca.agregarLibroCatalogo("El quijote", "Cervantes", "1234");
const libro3 = biblioteca.agregarLibroCatalogo("Hábitos Atómicos", "James Clear", "2345");
const libro4 = biblioteca.agregarLibroCatalogo("Yo solito", "María Ester Gotía de Berasategui", "4321");

const socio1 = biblioteca.registrarSocio(TipoSocio.REGULAR, 31882, "Lucciano", "Curotto");
const socio2 = biblioteca.registrarSocio(TipoSocio.VIP, 20321, "Luca", "Giordana");
biblioteca.registrarSocio(TipoSocio.VIP, 32451, "Samuel", "Olmos");
biblioteca.registrarSocio(TipoSocio.VISITANTE, 38446, "Tomás", "Caussa");


// biblioteca.retirarLibro(socio1.id, libro1.isbn, TipoPrestamo.REGULAR);
// biblioteca.retirarLibro(socio1.id, libro2.isbn, TipoPrestamo.CORTO);
// biblioteca.retirarLibro(socio1.id, libro3.isbn, TipoPrestamo.REFERENCIA);
// //biblioteca.retirarLibro(socio1.id, libro4.isbn, TipoPrestamo.DIGITAL); // Max 3 libros para el usuario regular

// for (const prestamo of socio1.getPrestamos)
// {
//     console.log(`Prestamo del libro: ${prestamo.getLibro.titulo}`);
//     console.log('Fecha inicio:');
//     console.log(prestamo.getFechaInicio());
//     console.log('Fecha Limite:');
//     console.log(prestamo.getFechaVencimiento()); 
// }

// biblioteca.devolverLibro(socio1.id, libro1.isbn);
// biblioteca.devolverLibro(socio1.id, libro2.isbn);
// biblioteca.devolverLibro(socio1.id, libro3.isbn);

// biblioteca.setPoliticaPrestamo(new PoliticaFlexible());

// // Socio VIP
// biblioteca.retirarLibro(socio2.id, libro1.isbn);
// biblioteca.retirarLibro(socio2.id, libro2.isbn);
// biblioteca.retirarLibro(socio2.id, libro3.isbn);
// biblioteca.retirarLibro(socio2.id, libro4.isbn);

// for (const prestamo of socio2.getPrestamos)
// {
//     console.log(`Prestamo del libro: ${prestamo.getLibro.titulo}`);
//     console.log('Fecha inicio:');
//     console.log(prestamo.getFechaInicio());
//     console.log('Fecha Limite:');
//     console.log(prestamo.getFechaVencimiento()); 
// }

const libroDigital1 = biblioteca.agregarLibroDigital("http://librosdigitales.com/1984");
const libroDigital2 = biblioteca.agregarLibroDigital("http://librosdigitales.com/elquijote");

const documentoHistorico1 = biblioteca.agregarDocumentoHistorico("Constitución Nacional", 1853, "Texto completo de la Constitución Nacional Argentina");
const documentoHistorico2 = biblioteca.agregarDocumentoHistorico("Declaración de Independencia", 1816, "Acta de la Declaración de Independencia Argentina");

const articulo1 = biblioteca.agregarArticuloBase("Paradigmas de Programación", "Dr. Juan Pérez", "Un artículo sobre los diferentes paradigmas de programación.");
const articulo2 = biblioteca.agregarArticuloBase("Inteligencia Artificial", "Dra. Ana Gómez", "Explorando los avances en inteligencia artificial.");

console.log("=== Búsqueda en Catálogo de Libros ===");
let resultados = BuscadorUniversal.buscar(biblioteca.libros, "1984");
resultados.forEach(libro => console.log(`Encontrado: ${libro.titulo} por ${libro.autor}`));

console.log("\n=== Filtrado en Catálogo de Libros (Autor: Cervantes) ===");
resultados = BuscadorUniversal.filtrar(biblioteca.libros, libro => libro.autor === "Cervantes");
resultados.forEach(libro => console.log(`Encontrado: ${libro.titulo} por ${libro.autor}`));

console.log("\n=== Búsqueda en Base de Conocimiento ===");
let resultados2 = BuscadorUniversal.buscar(biblioteca.baseDeConocimiento, "Inteligencia");
resultados2.forEach(articulo => console.log(`Encontrado: ${articulo.titulo} por ${articulo.autor}`));